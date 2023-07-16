const { ReadmeBox } = require('readme-box')
const runQuery = require('./components/graphql_query');

const { 
    GITHUB_TOKEN,
    TARGET_BRANCH, 
    ENABLE_KEEP_ALIVE,
    MAX_DISPLAY_COUNT,
    ENTRY_IDENTIFIER,
    ENTRY_IDENTIFIER_DELIMITER,
    SECTION_IDENTIFIER,
    COMMENT_TEMPLATE,
    COMMENT_LINK_TEMPLATE,
    EMPTY_TEMPLATE,
    owner, 
    repo
} = require("./constants");
const { MAX_CHARACTER_COUNT } = require('./components/constants');

async function updateReadme(content) {
    return await ReadmeBox.updateSection(content, {
        owner,
        repo,
        token: GITHUB_TOKEN,
        branch: TARGET_BRANCH,
        section: SECTION_IDENTIFIER,
        emptyCommits: false // set to `true` to allow empty commits when there are no changes
    });
}

function constructGuestbook(issues) {
    if (issues.length === 0) {
        return EMPTY_TEMPLATE
            .replace('$username', owner)
            .replace('$repo', repo)
            .replace('$identifier', ENTRY_IDENTIFIER);
    }

    const guestComments = issues.slice(0, Math.min(MAX_DISPLAY_COUNT, issues.length));
    const guestbookAvatars = guestComments
        .map(item => item.avatarString())
        .join(' ');

    const guestbookComments = guestComments
        .map(item => item.toEntryString(
                ENTRY_IDENTIFIER, ENTRY_IDENTIFIER_DELIMITER, COMMENT_TEMPLATE, MAX_CHARACTER_COUNT
            ))
        .join(' ');

    const newEntryLink = COMMENT_LINK_TEMPLATE
        .replace('$username', owner)
        .replace('$repo', repo)
        .replace('$identifier', ENTRY_IDENTIFIER);

    return `
        ${guestbookAvatars}\n\n
        ${guestbookComments}\n\n
        ${newEntryLink}
    `;
}

async function runWorkflow() {
    const issues = runQuery();
    const guestbookContents = constructGuestbook(issues);
    await updateReadme(guestbookContents);
};

runWorkflow();