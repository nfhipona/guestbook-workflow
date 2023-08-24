// https://docs.github.com/en/graphql/guides/forming-calls-with-graphql
// https://docs.github.com/en/graphql/overview/explorer

export const LATEST_ENTRIES = "LATEST_ENTRIES";
export const PAGE_INFO = "PAGE_INFO";
export const NEXT_ENTRIES = "NEXT_ENTRIES";
export const CLOSE_ENTRY = "CLOSE_ENTRY";

export function cleanedLabels(labelStr) {
    const trimExp = new RegExp(/^\s+|\s+$/, 'gm');
    return labelStr.split(',')
        .filter(label => label.length > 0) // remove empty or blank label
        .map(label => { // trim white spaces
            const cleaned = label.replaceAll(trimExp, '');
            return cleaned;
        });
}

export function queryString(forType, hasLabel = false, bodyFormat = 'body') {
    switch (forType) {
        case LATEST_ENTRIES:
            return hasLabel ? `
                query getLatestEntries(
                    $owner: String!, 
                    $repo: String!, 
                    $num: Int, 
                    $labels: [String!]
                ) {
                    repository(owner: $owner, name: $repo) {
                        issues(
                            first: $num, 
                            orderBy: {field: CREATED_AT, direction: DESC}, 
                            filterBy: {states: [OPEN], labels: $labels}
                        ) {
                            edges {
                                node {
                                    id
                                    title
                                    url
                                    ${bodyFormat}
                                    createdAt
                                    author {
                                        login
                                        avatarUrl
                                    }
                                    labels(first: 5) {
                                        edges {
                                            node {
                                                id
                                                name
                                                description
                                                createdAt
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            ` : `
                query getLatestEntries(
                    $owner: String!, 
                    $repo: String!, 
                    $num: Int
                ) {
                    repository(owner: $owner, name: $repo) {
                        issues(
                            first: $num, 
                            orderBy: {field: CREATED_AT, direction: DESC}, 
                            filterBy: {states: [OPEN]}
                        ) {
                            edges {
                                node {
                                    id
                                    title
                                    url
                                    ${bodyFormat}
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

        case PAGE_INFO:
            return hasLabel ? `
                query getPageInfo(
                    $owner: String!, 
                    $repo: String!, 
                    $num: Int,
                    $labels: [String!]
                ) {
                    repository(owner: $owner, name: $repo) {
                        issues(
                            first: $num, 
                            orderBy: {field: CREATED_AT, direction: DESC}, 
                            filterBy: {states: [OPEN], labels: $labels}
                        ) {
                            pageInfo {
                                hasNextPage
                                endCursor
                            }
                        }
                    }
                }
            ` : `
                query getPageInfo(
                    $owner: String!, 
                    $repo: String!, 
                    $num: Int
                ) {
                    repository(owner: $owner, name: $repo) {
                        issues(
                            first: $num, 
                            orderBy: {field: CREATED_AT, direction: DESC}, 
                            filterBy: {states: [OPEN]}
                        ) {
                            pageInfo {
                                hasNextPage
                                endCursor
                            }
                        }
                    }
                }
            `;

        case NEXT_ENTRIES:
            return hasLabel ? `
                query getNextEntries(
                    $owner: String!, 
                    $repo: String!, 
                    $num: Int, 
                    $labels: [String!],
                    $cursur: String!
                ) {
                    repository(owner: $owner, name: $repo) {
                        issues(
                            first: $num, 
                            orderBy: {field: CREATED_AT, direction: DESC}, 
                            filterBy: {states: [OPEN], labels: $labels},
                            after: $cursur
                        ) {
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
            ` : `
                query getNextEntries(
                    $owner: String!, 
                    $repo: String!, 
                    $num: Int, 
                    $cursur: String!
                ) {
                    repository(owner: $owner, name: $repo) {
                        issues(
                            first: $num, 
                            orderBy: {field: CREATED_AT, direction: DESC}, 
                            filterBy: {states: [OPEN]}, 
                            after: $cursur
                        ) {
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

        case CLOSE_ENTRY:
            return `
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
    }
}