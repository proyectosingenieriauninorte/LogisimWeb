class Component {
	constructor(point, width = 0, height = 0) {
		this.width = width;
		this.height = height;
		this.point = point;
		this.value = "D"; // Variable de estado del cable.

		this.inputs = []; // Entradas a las que esta conectado el cable
		this.outputs = []; // Salidas a las que esta conectado el cable
		this.dirty = true; // Start as dirty
	}

	// Define un valor especifico
    setValue(value) {
        if (this.value !== value) {
            this.value = value;
            this.markOutputsDirty();
        }
    }

	getValue() {
		return this.value;
	}

	markDirty() {
        this.dirty = true;
        this.updateValue(); // Trigger update if marked dirty
    }

    markOutputsDirty() {
        this.outputs.forEach(output => output.markDirty());
    }

    updateValue() {
        // To be overridden by subclasses
        if (this.dirty) {
            // Recalculate the value here in subclasses
            this.dirty = false; // Mark as clean after recalculating
        }
    }

    addInput(comp) {
        this.inputs.push(comp);
        this.markDirty(); // Mark as dirty when new input is added
    }

    removeInput(comp) {
        this.inputs = this.inputs.filter(input => input !== comp);
        this.markDirty(); // Mark as dirty when input is removed
    }

    addOutput(comp) {
        this.outputs.push(comp);
    }

    removeOutput(comp) {
        this.outputs = this.outputs.filter(output => output !== comp);
    }

	// Elimina todas las conexiones
	deleteAllConnections() {
		this.inputs.forEach((input) => input.removeConnection(this));
		this.outputs.forEach((output) => output.removeConnection(this));
		this.inputs = [];
		this.outputs = [];
	}

	isConnectedTo(point) {
		console.error("isConnectedTo not define.")
	}


	reconnectComponent(Circuit) {
		

		for (let pin of this.inputs) {
			let wire = Circuit.getConnectedComponentWithNotParent(pin.point, pin.parent);
			if (wire) {
				if (pin.type == 'in') {
					wire.addOutput(pin);
				} else if (pin.type == 'out') {
					wire.addInput(pin);
				}

				pin.addConnection(wire);
				pin.updateValue();
			}
		}

		for (let pin of this.outputs) {
			let wire = Circuit.getConnectedComponentWithNotParent(pin.point, pin.parent);
			if (wire) {
				if (pin.type == 'in') {
					wire.addOutput(pin);
				} else if (pin.type == 'out') {
					wire.addInput(pin);
				}

				pin.addConnection(wire);
				pin.updateValue();
			}
		}

	}
}

module.exports = Component;

