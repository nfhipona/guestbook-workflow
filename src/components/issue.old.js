export class OldIssue {
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