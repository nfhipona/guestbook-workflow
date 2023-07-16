const core = require('@actions/core');
const github = require('@actions/github');

const GITHUB_TOKEN = core.getInput('gh_token');
const MAX_DISPLAY_COUNT = core.getInput('max_display_count');
const MAX_CHARACTER_COUNT = core.getInput('max_character_count');
const COMMITTER_USERNAME = core.getInput('committer_username');
const COMMITTER_EMAIL = core.getInput('committer_email');
const COMMITTER_MESSAGE = core.getInput('commit_message');
const ENABLE_KEEP_ALIVE = core.getInput('enable_keepalive');
const MAX_RETRY_COUNT = core.getInput('max_retry_count');
const RETRY_WAIT_TIME = core.getInput('retry_wait_time');
const ENTRY_IDENTIFIER = core.getInput('entry_identifier');
const ENTRY_IDENTIFIER_DELIMITER = core.getInput('entry_identifier_delimiter');
const COMMENT_TEMPLATE = core.getInput('comment_template');
const COMMENT_EMPTY_TITLE_TEMPLATE = core.getInput('comment_empty_title_template');
const COMMENT_LINK_TEMPLATE = core.getInput('comment_link_template');
const EMPTY_TEMPLATE = core.getInput('empty_template');
const TARGET_BRANCH = core.getInput('target_branch');
const SECTION_IDENTIFIER = core.getInput('section_identifier');

const octokit = github.getOctokit(GITHUB_TOKEN);
const { owner, repo } = github.context.repo;

module.exports = {
    GITHUB_TOKEN,
    MAX_DISPLAY_COUNT,
    MAX_CHARACTER_COUNT,
    COMMITTER_USERNAME,
    COMMITTER_EMAIL,
    COMMITTER_MESSAGE,
    ENABLE_KEEP_ALIVE,
    MAX_RETRY_COUNT,
    RETRY_WAIT_TIME,
    ENTRY_IDENTIFIER,
    ENTRY_IDENTIFIER_DELIMITER,
    COMMENT_TEMPLATE,
    COMMENT_EMPTY_TITLE_TEMPLATE,
    COMMENT_LINK_TEMPLATE,
    EMPTY_TEMPLATE,
    TARGET_BRANCH,
    SECTION_IDENTIFIER,
    octokit,
    owner, 
    repo
};