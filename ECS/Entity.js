export class Entity {
    static nextId = 0;
    constructor(name) {
        this.id = Entity.nextId++;
        this.name = name || 'Entity ID: ' + this.id;
    }

    getID () { return this.id; }
}
