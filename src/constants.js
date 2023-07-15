const core = require('@actions/core');

const GITHUB_TOKEN = core.getInput('gh_token');
const README_PATH = core.getInput('readme_path');
const MAX_DISPLAY_COUNT = core.getInput('max_display_count');
const COMMITTER_USERNAME = core.getInput('committer_username');
const COMMITTER_EMAIL = core.getInput('committer_email');
const COMMITTER_MESSAGE = core.getInput('commit_message');
const ENABLE_KEEP_ALIVE = core.getInput('enable_keepalive');
const MAX_RETRY_COUNT = core.getInput('max_retry_count');
const RETRY_WAIT_TIME = core.getInput('retry_wait_time');
const COMMENT_TEMPLATE = core.getInput('comment_template');
const ENTRY_IDENTIFIER = core.getInput('entry_identifier');
const EMPTY_TEMPLATE = core.getInput('empty_template');

module.exports = {
    GITHUB_TOKEN,
    README_PATH,
    MAX_DISPLAY_COUNT,
    COMMITTER_USERNAME,
    COMMITTER_EMAIL,
    COMMITTER_MESSAGE,
    ENABLE_KEEP_ALIVE,
    MAX_RETRY_COUNT,
    RETRY_WAIT_TIME,
    COMMENT_TEMPLATE,
    ENTRY_IDENTIFIER,
    EMPTY_TEMPLATE
};