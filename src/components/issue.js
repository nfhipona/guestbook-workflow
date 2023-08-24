export class Issue {
    constructor(id, title, content, createdAt, author, avatarUrl, labels = []) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.createdAt = new Date(createdAt).toLocaleDateString('en-US');
        this.author = author;
        this.avatarUrl = avatarUrl;
        this.profile = `https://github.com/${author}`;
        this.labels = labels;
    }

    toEntryString(identifier, delimiter, template, no_title_template, max_character_count = 0) {
        const charCount = max_character_count === 0 ? this.content.length : Math.min(max_character_count, this.content.length);
        const contentTitle = this.getTitle(identifier, delimiter);
        const contentBody = this.content.slice(0, charCount);

        if (contentTitle.length === 0) {
            return no_title_template
                .replaceAll('$username', this.author)
                .replaceAll('$profile', this.profile)
                .replaceAll('$date', this.createdAt)
                .replaceAll('$content', contentBody);
        }

        return template
            .replaceAll('$username', this.author)
            .replaceAll('$profile', this.profile)
            .replaceAll('$date', this.createdAt)
            .replaceAll('$title', this.getTitle(identifier, delimiter))
            .replaceAll('$content', contentBody);
    }

    avatarString() {
        return `<a href="${this.profile}"><img src="${this.avatarUrl}" height="30"/></a>`;
    }

    isGuestEntry(identifier) {
        return this.title.indexOf(identifier) === 0;
    }

    getTitle(identifier, delimiter) {
        const titleExp = new RegExp(`^([${identifier}]+.+[${delimiter}])`, 'g');
        const trimExp = new RegExp(`^\s+|\s+$`, 'gm');
        const titleContent = this.title.replace(titleExp, '');
        const cleaned = titleContent.replaceAll(trimExp, '');
        return cleaned === identifier ? '' : cleaned;
    }
}

export class CloseIssue {
    constructor(id, title, createdAt) {
        this.id = id;
        this.title = title;
        this.createdAt = new Date(createdAt).toLocaleDateString('en-US');
    }

    isGuestEntry(identifier) {
        return this.title.indexOf(identifier) === 0;
    }

    getTitle(identifier, delimiter) {
        const titleExp = new RegExp(`^([${identifier}]+.+[${delimiter}])`, 'g');
        const trimExp = new RegExp(`^\s+|\s+$`, 'gm');
        const titleContent = this.title.replace(titleExp, '');
        const cleaned = titleContent.replaceAll(trimExp, '');
        return cleaned === identifier ? '' : cleaned;
    }
}