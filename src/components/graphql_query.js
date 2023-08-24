// https://docs.github.com/en/graphql/guides/forming-calls-with-graphql
// https://docs.github.com/en/graphql/overview/explorer

const {
    MAX_DISPLAY_COUNT,
    INCLUDE_BODY_FORMATTING,
    RETRY_ENABLED,
    MAX_RETRY_COUNT,
    RETRY_WAIT_TIME,
    octokit,
    owner,
    repo
} = require("./constants");
const { Issue, CloseIssue } = require('./issue');

async function runFetchQuery() {
    const format = INCLUDE_BODY_FORMATTING ? 'body' : 'bodyText';
    const queryStr = `
        query getLatestEntries($owner: String!, $repo: String!, $num: Int) {
            repository(owner: $owner, name: $repo) {
                issues(first: $num, orderBy: {field: CREATED_AT, direction: DESC}, filterBy: {states: [OPEN]}) {
                    edges {
                        node {
                            title
                            url
                            ${format}
                            createdAt
                            author {
                                login
                                avatarUrl
                            }
                        }
                    }
                }
            }
        }
    `;

    const params = {
        owner: owner,
        repo: repo,
        num: Number(MAX_DISPLAY_COUNT) || 0
    };

    let issues = [];
    if (RETRY_ENABLED) {
        let retryCount = 0;
        while (retryCount < MAX_RETRY_COUNT) {
            try {
                issues = await performFetchQuery(queryStr, params);
                break;
            } catch (error) {
                retryCount++;
                await sleep(Number(RETRY_WAIT_TIME) * 1000);
            }
        }
    } else {
        issues = await performFetchQuery(queryStr, params);
    }

    return issues;
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function performFetchQuery(queryStr, params) {
    const { repository } = await octokit.graphql(queryStr, params);
    const issues = repository.issues.edges
        .map(issue => {
            const { title, body, bodyText, createdAt, author } = issue.node;
            const { login, avatarUrl } = author;
            const bodyContent = INCLUDE_BODY_FORMATTING ? body : bodyText;
            return new Issue(
                title, bodyContent, createdAt, login, avatarUrl
            );
        })
        .filter(item => !!item.content);

    return issues;
}

async function runPageInfoQuery() {
    const queryStr = `
        query getPageInfo($owner: String!, $repo: String!, $num: Int) {
            repository(owner: $owner, name: $repo) {
                issues(first: $num, orderBy: {field: CREATED_AT, direction: DESC}, filterBy: {states: [OPEN]}) {
                    pageInfo {
                        hasNextPage
                        endCursor
                    }
                }
            }
        }
    `;

    const params = {
        owner: owner,
        repo: repo,
        num: Number(MAX_DISPLAY_COUNT) || 0
    };

    const { repository } = await octokit.graphql(queryStr, params);
    return repository.issues.pageInfo;
}

async function runNextCloseFetchQuery(identifier, delimiter, fetchCursor) {
    const queryStr = `
        query getNextEntries($owner: String!, $repo: String!, $num: Int, $cursur: String!) {
            repository(owner: $owner, name: $repo) {
                issues(first: $num, orderBy: {field: CREATED_AT, direction: DESC}, filterBy: {states: [OPEN]}, after: $cursur) {
                    edges {
                        node {
                            id
                            title
                            createdAt
                        }
                    }
                    pageInfo {
                        hasNextPage
                        endCursor
                    }
                }
            }
        }
    `;

    const params = {
        owner: owner,
        repo: repo,
        num: Number(MAX_DISPLAY_COUNT) || 0,
        cursur: fetchCursor
    };

    const { repository } = await octokit.graphql(queryStr, params);
    const { edges, pageInfo } = repository.issues;

    const issues = edges
        .map(issue => {
            const { id, title, createdAt } = issue.node;
            return new CloseIssue(
                id, title, createdAt
            );
        })
    const comments = issues.filter(issue => issue.isGuestEntry(ENTRY_IDENTIFIER));

    for (const comment of comments) {
        const result = await closeEntry(comment.id);
        const { state, stateReason } = result;
        console.log(`id: ${comment.id}\ntitle: ${comment.title}\ncreatedAt: ${comment.createdAt}\nstate: ${state}\nstateReason: ${stateReason}`);
    }

    const { hasNextPage, endCursor } = pageInfo;
    if (hasNextPage === true) {
        await runNextCloseFetchQuery(identifier, delimiter, endCursor);
    }
}

async function closeEntry(entryId) {
    const queryStr = `
        mutation closeEntry($entryId: ID!) {
            closeIssue(input: {stateReason: COMPLETED, issueId: $issueId}) {
                issue {
                    id
                    state
                    stateReason
                }
            }
        }
    `;

    return await octokit.graphql(queryStr, { entryId });
}

async function runCloseAllOutdatedIssues(identifier, delimiter) {
    const pageInfo = await runPageInfoQuery();
    const { hasNextPage, endCursor } = pageInfo;
    if (hasNextPage === true) {
        await runNextCloseFetchQuery(identifier, delimiter, endCursor);
    }
}

module.exports = {
    runFetchQuery,
    runPageInfoQuery,
    runNextCloseFetchQuery,
    closeEntry,
    runCloseAllOutdatedIssues
};