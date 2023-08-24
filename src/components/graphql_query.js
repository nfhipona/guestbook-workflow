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
    source_repo
} = require("./constants");
const {
    LATEST_ENTRIES,
    PAGE_INFO,
    NEXT_ENTRIES,
    CLOSE_ENTRY,

    cleanedLabels,
    queryString
} = require('./queries');
const {
    Issue,
    CloseIssue
} = require('./issue');
const { IssueLabel } = require('./issue.label');

async function runFetchQuery() {
    const labels = cleanedLabels();
    const queryStr = queryString(LATEST_ENTRIES);
    const params = {
        owner,
        repo: source_repo,
        num: Number(MAX_DISPLAY_COUNT) || 0,
        labels
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
            const { id, title, body, bodyText, createdAt, author, labels = {} } = issue.node;
            const { login, avatarUrl } = author;
            const bodyContent = INCLUDE_BODY_FORMATTING ? body : bodyText;
            const labelNodes = labels.edges || [];
            const entryLabels = labelNodes.map(node => {
                const { id, name, description, createdAt } = node;
                return new IssueLabel(
                    id, name, description, createdAt
                );
            });

            return new Issue(
                id, title, bodyContent, createdAt, login, avatarUrl, entryLabels
            );
        })
        .filter(item => !!item.content);

    return issues;
}

async function runPageInfoQuery() {
    const labels = cleanedLabels();
    const queryStr = queryString(PAGE_INFO);
    const params = {
        owner,
        repo: source_repo,
        num: Number(MAX_DISPLAY_COUNT) || 0,
        labels
    };

    const { repository } = await octokit.graphql(queryStr, params);
    return repository.issues.pageInfo;
}

async function runNextCloseFetchQuery(identifier, delimiter, fetchCursor) {
    const labels = cleanedLabels();
    const queryStr = queryString(NEXT_ENTRIES);
    const params = {
        owner,
        repo: source_repo,
        num: Number(MAX_DISPLAY_COUNT) || 0,
        labels,
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
    const queryStr = queryString(CLOSE_ENTRY);
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