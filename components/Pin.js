import Connectable from './Connectable.js';
import Point from './Point.js';

class Pin extends Connectable {
    constructor(point, type, value = "D", parent = null) {
        super();
        this.point = point;
        this.type = type;
        this.value = value;
        this.parent = parent;
    }

    updateValue() {
        if (this.type === "in") {
            this.value = this.connections.reduce((prevValue, comp) => {
                let currentValue = comp.getValue();
                if (prevValue === currentValue) return prevValue;
                if (prevValue === "D") return currentValue;
                if (currentValue === "D") return prevValue;
                return "E";
            }, "D");

            if (this.parent) this.parent.updateValue();
        }
    }

    getValue() {
        return this.value;
    }

    isConnectedTo(point) {
        return this.point.isEqualTo(point) ? this : null;
    }
}

export default Pin;
