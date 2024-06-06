class Component {
	constructor(point, width = 0, height = 0) {
		this.width = width;
		this.height = height;
		this.point = point;
		this.value = "D"; // Variable de estado del clable.

		this.inputs = []; // Entradas a las que esta conectado el cable
		this.outputs = []; // Salidas a las que esta conectado el cable
	}

	// Define un valor especifico
	setValue(value) {
		this.value = value;
		this.outputs.forEach((output) => output.updateValue());
	}

	// Actualiza el valor segun las entradas de señal a la que esta conectado
	updateValue() {
		console.error("updateValue not define.")
	}

	// Devuelve el valor en el cable
	getValue() {
		return this.value;
	}

	// Agrega una entrada de señal
	addInput(comp) {
		this.inputs.push(comp);
		this.updateValue();
	}

	// Elimina una entrada de señal
	removeInput(comp) {
		this.inputs = this.inputs.filter((input) => input != comp);
		this.updateValue();
	}

	// Agrega una salida de señal
	addOutput(comp) {
		this.outputs.push(comp);
	}

	// Elimina una salida de señal
	removeOutput(comp) {
		this.outputs = this.outputs.filter((output) => output != comp);
	}

	// Elimina una conexion
	removeConnection(comp) {
		this.inputs = this.inputs.filter((input) => input != comp);
		this.outputs = this.outputs.filter((output) => output != comp);
		this.updateValue();
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

export default Component;

