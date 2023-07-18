// Octokit.js
// https://github.com/octokit/core.js#readme
// https://docs.github.com/en/rest/issues/issues?apiVersion=2022-11-28#list-repository-issues

const { octokit, owner, repo } = require("./constants");
const Issue = require('./issue');

async function runFetchQuery() {
    const results = await octokit.request('GET /repos/{owner}/{repo}/issues', {
        owner,
        repo,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    });

    const filtered = results
        .filter(result => result.state === 'open' && result.body.legth > 0);
    const issues = filtered
        .map(item => {
            const { title, body, user, created_at } = item;
            const { login, avatar_url } = user;
            return new Issue(
                title, body, created_at, login, avatar_url
            );
        });

    return issues;
}

module.exports = { runFetchQuery };