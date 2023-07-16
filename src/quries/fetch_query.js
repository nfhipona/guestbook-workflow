// Octokit.js
// https://github.com/octokit/core.js#readme

const github = require('@actions/github');
const { GITHUB_TOKEN } = require("../constants");
const Issue = require('../issue');

async function runQuery() {
    const octokit = github.getOctokit(GITHUB_TOKEN);
    const { owner, repo } = github.context.repo;
    
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

module.exports = runQuery;