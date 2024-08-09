import Component from './Component.js';
import Point from './Point.js';
import Pin from './Pin.js';

class Gate extends Component {
    constructor(point) {
        super(point, 40, 40);
        this.inputs = [];
        this.outputs = [];
    }

    initializePins(point, entries) {
        let x = point.x;
        let y = point.y;

        // Initialize input pins
        for (let i = 0; i < entries; i++) {
            let pt = new Point(x - 20, y + i * 40 - 20);
            this.inputs.push(new Pin(pt, 'in', 'D', this));
        }

        // Initialize output pin
        let pt = new Point(x + 20, y);
        this.outputs.push(new Pin(pt, 'out', 'D', this));
        this.updateValue();
    }

    updateValue() {
        // To be overridden by subclasses
    }

    isConnectedTo(point) {
        let pin = [...this.inputs, ...this.outputs].find(input => input.isConnectedTo(point));
        return pin ? pin : null;
    }

    deleteAllConnections() {
        this.inputs.forEach(input => input.deleteAllConnections(this));
        this.outputs.forEach(output => output.deleteAllConnections(this));
        this.updateValue();
    }
}

export default Gate;
