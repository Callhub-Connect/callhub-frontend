export default class DocumentFile {
    constructor({id, name, content}) {
      this.id = id;
      this.name = name;
      this.content = content;
    }
    // Getter for the document's ID
    getId() {
        return this.id;
    }

    // Getter for the document's name
    getName() {
        return this.name;
    }

    // Getter for the document's content
    getContent() {
        return this.content;
    }
}
