import Component from './Component.js';
import Point from './Point.js';
import Pin from './Pin.js';

class Gate extends Component {
	constructor(point, pinFactory) {
        super(point, 40, 40);
        this.pinFactory = pinFactory;
    }

	isConnectedTo(point) {
        // Check if any input or output pin is connected to the given point
        let pin = [...this.inputs, ...this.outputs].find(input => input.isConnectedTo(point));
        return pin ? true : false;
    }


    initializePins(point, entries) {
        let x = point.x;
        let y = point.y;

        // Initialize input pins
        for (let i = 0; i < entries; i++) {
            let pt = this.pinFactory.createPoint(x - 20, y + i * 40 - 20);
            this.inputs.push(this.pinFactory.createPin(pt, 'in', 'D', this));
        }

        // Initialize output pin
        let pt = this.pinFactory.createPoint(x + 20, y);
        this.outputs.push(this.pinFactory.createPin(pt, 'out', 'D', this));
        this.updateValue();
    }

    setValue(value) {
        if (this.cachedValue !== value) {
            this.cachedValue = value;
            this.dirty = false;
            this.outputs.forEach(output => output.updateValue());
        }
    }

    markDirty() {
        this.dirty = true;
        this.updateValue();
    }

    updateValue() {
        if (this.dirty) {
            // Subclasses will implement actual logic here
            this.dirty = false;
        }
    }

    addInput(comp) {
        super.addInput(comp);
        this.markDirty();
    }

    removeInput(comp) {
        super.removeInput(comp);
        this.markDirty();
    }
}export default Gate;