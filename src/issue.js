class Issue {
    constructor(title, bodyText, createdAt, author, avatarUrl) {
        this.title = title;
        this.bodyText = bodyText;
        this.createdAt = new Date(createdAt).toLocaleDateString('en-US');
        this.author = author;
        this.avatarUrl = avatarUrl;
        this.profile = `https://github.com/${author}`;
    }

    toEntryString(template = `* **[$username]($profile) *wrote on $date*:** $content`) {
        return template
            .replace('$username', this.author)
            .replace('$profile', this.profile)
            .replace('$date', this.createdAt)
            .replace('$content', this.bodyText);
    }

    avatarString() {
        return `<a href="${this.avatarUrl}"><img src="${this.profile}" height="30"/></a>`;
    }

    isGuestEntry(identifier) {
        return this.title.indexOf(identifier) === 0;
    }
}

module.exports = Issue;