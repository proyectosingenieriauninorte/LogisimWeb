const Component = require('./Component.js');
const Point = require('./Point.js');
const Pin = require('./Pin.js');

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
		this.markDirty(); 
    }

	setValue(value) {
        console.log(`Setting value of gate: ${value}`);
        
        if (this.value !== value) {
            this.value = value;
            this.dirty = false;  // Mark as clean since we've just set the value

            // Propagate the value to all connected output pins
            this.outputs.forEach(output => {
                output.setValue(value);
                console.log(`Output pin set to value: ${value}`);
            });
        }
    }

    markDirty() {
        this.dirty = true;
        this.updateValue();
    }

    updateValue() {
        // This method should be implemented by subclasses
        throw new Error('updateValue must be implemented by subclasses');
    }

    addInput(comp) {
        super.addInput(comp);
        this.markDirty();
    }

    removeInput(comp) {
        super.removeInput(comp);
        this.markDirty();
    }
}

module.exports = Gate;