class Connectable {
    constructor() {
        this.connections = [];
    }

    addConnection(comp) {
        this.connections.push(comp);
        this.updateValue();
    }

    removeConnection(comp) {
        this.connections = this.connections.filter(connection => connection != comp);
        this.updateValue();
    }

    deleteAllConnections() {
        this.connections.forEach(connection => connection.removeConnection(this));
        this.connections = [];
        this.updateValue();
    }

    updateValue() {
        // To be overridden by subclasses
    }
}

export default Connectable;
