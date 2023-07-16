class Issue {
    constructor(title, bodyText, createdAt, author, avatarUrl) {
        this.title = title;
        this.bodyText = bodyText;
        this.createdAt = new Date(createdAt).toLocaleDateString('en-US');
        this.author = author;
        this.avatarUrl = avatarUrl;
        this.profile = `https://github.com/${author}`;
    }
    
    toEntryString(identifier, delimiter, template, max_character_count = 0) {
        const charCount = max_character_count === 0 ? this.bodyText.length : Math.min(max_character_count, this.bodyText.length);
        const contents = this.bodyText.slice(0, charCount);

        return template
            .replaceAll('$username', this.author)
            .replaceAll('$profile', this.profile)
            .replaceAll('$date', this.createdAt)
            .replaceAll('$title', this.getTitle(identifier, delimiter))
            .replaceAll('$content', contents);
    }

    avatarString() {
        return `<a href="${this.avatarUrl}"><img src="${this.profile}" height="30"/></a>`;
    }

    isGuestEntry(identifier) {
        return this.title.indexOf(identifier) === 0;
    }

    getTitle(identifier, delimiter) {
        const titleExp = new RegExp(`^([${identifier}]+.+[${delimiter}])`, 'g');
        const trimExp = new RegExp(`^\s+|\s+$`, 'g');
        const titleContent = this.title.replace(titleExp, '');
        return titleContent.replace(trimExp, '');
    }
}

module.exports = Issue;