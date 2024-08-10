const Connectable = require('./Connectable');

class Pin extends Connectable {
    constructor(point, type, value = "D", parent = null) {
        super();
        this.point = point;
        this.type = type;
        this.value = value;
        this.parent = parent;
    }

    setValue(value) {
        console.log(`Setting pin value: ${value}`);
        if (this.value !== value) {
            this.value = value;
            this.updateConnections(); // Notify connected components of the update
            if (this.parent) {
                this.parent.markDirty(); // Mark the parent gate as dirty
            }
        }
    }

    updateConnections() {
        this.connections.forEach(connection => connection.updateValue());
    }

    updateValue() {
        if (this.type === "in") {
            this.value = this.connections.reduce((prevValue, comp) => {
                let currentValue = comp.getValue();
                console.log(`Updating value: prevValue=${prevValue}, currentValue=${currentValue}`);

                if (prevValue === currentValue) return prevValue;
                if (prevValue === "D") return currentValue;
                if (currentValue === "D") return prevValue;
                return "E";
            }, "D");

            if (this.parent) {
                console.log(`Notifying parent to update value`);
                this.parent.updateValue(); // Notify parent gate of the update
            }
        }
    }

    getValue() {
        console.log(`Getting pin value: ${this.value}`);
        return this.value;
    }

    isConnectedTo(point) {
        return this.point.isEqualTo(point) ? this : null;
    }
}

module.exports = Pin;
