// https://docs.github.com/en/graphql/guides/forming-calls-with-graphql
// https://docs.github.com/en/graphql/overview/explorer

const {
    MAX_DISPLAY_COUNT,
    INCLUDE_BODY_FORMATTING,
    octokit,
    owner,
    repo
} = require("./constants");
const Issue = require('./issue');

async function runFetchQuery() {
    const format = INCLUDE_BODY_FORMATTING ? 'body' : 'bodyText';
    const queryStr = `
        query latestIssues($owner: String!, $repo: String!, $num: Int) {
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

    const { repository } = await octokit.graphql(queryStr, params);
    const issues = repository.issues.edges
        .map(issue => {
            const { title, bodyText, createdAt, author } = issue.node;
            const { login, avatarUrl } = author;
            return new Issue(
                title, bodyText, createdAt, login, avatarUrl
            );
        })
        .filter(item => !!item.bodyText);

    return issues;
}

async function closeIssues() {

}

module.exports = { runFetchQuery, closeIssues };