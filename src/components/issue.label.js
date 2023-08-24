export class IssueLabel {
    constructor(id, name, description, createdAt) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.createdAt = new Date(createdAt).toLocaleDateString('en-US');
    }
}