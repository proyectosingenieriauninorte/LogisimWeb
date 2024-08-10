class Connectable {
    constructor() {
        this.connections = [];
        this.dirty = true;
    }

    addConnection(comp) {
        this.connections.push(comp);
        this.markDirty();
    }

    removeConnection(comp) {
        this.connections = this.connections.filter(connection => connection != comp);
        this.markDirty();
    }

    deleteAllConnections() {
        this.connections.forEach(connection => connection.removeConnection(this));
        this.connections = [];
        this.markDirty();
    }

    markDirty() {
        this.dirty = true;
        this.connections.forEach(connection => connection.markDirty());
    }
}

module.exports = Connectable;
