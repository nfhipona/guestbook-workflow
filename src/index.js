const { ReadmeBox } = require('readme-box')
const { runFetchQuery, runCloseAllOutdatedIssues } = require('./components/graphql_query');

const {
    GITHUB_TOKEN,
    TARGET_BRANCH,
    MAX_CHARACTER_COUNT,
    ENTRY_IDENTIFIER,
    ENTRY_IDENTIFIER_DELIMITER,
    SECTION_IDENTIFIER,
    COMMENT_TEMPLATE,
    COMMENT_EMPTY_TITLE_TEMPLATE,
    COMMENT_LINK_TEMPLATE,
    EMPTY_TEMPLATE,
    CLOSE_OUDATED_ISSUES,
    owner,
    repo
} = require('./components/constants');

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

function constructGuestbook(issues = []) {
    const comments = issues.filter(issue => issue.isGuestEntry(ENTRY_IDENTIFIER));
    if (comments.length === 0) {
        return EMPTY_TEMPLATE
            .replaceAll('$username', owner)
            .replaceAll('$repo', repo)
            .replaceAll('$identifier', ENTRY_IDENTIFIER);
    }

    const guestbookAvatars = comments
        .map(item => item.avatarString())
        .join(' ');

    const guestbookComments = comments
        .map(item => item.toEntryString(
            ENTRY_IDENTIFIER, ENTRY_IDENTIFIER_DELIMITER, COMMENT_TEMPLATE, COMMENT_EMPTY_TITLE_TEMPLATE, Number(MAX_CHARACTER_COUNT) || 0
        ))
        .join('\n');

    const newEntryLink = COMMENT_LINK_TEMPLATE
        .replaceAll('$username', owner)
        .replaceAll('$repo', repo)
        .replaceAll('$identifier', ENTRY_IDENTIFIER);

    return `${guestbookAvatars}\n\n${guestbookComments}\n\n${newEntryLink}`;
}

async function runWorkflow() {
    const issues = await runFetchQuery();
    const guestbookContents = constructGuestbook(issues);
    await updateReadme(guestbookContents);

    if (CLOSE_OUDATED_ISSUES === true) {
        await runCloseAllOutdatedIssues(ENTRY_IDENTIFIER, ENTRY_IDENTIFIER_DELIMITER);
    }
};

runWorkflow();