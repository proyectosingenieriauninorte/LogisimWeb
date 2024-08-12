class Component {
	constructor(point, width = 0, height = 0) {
		this.width = width;
		this.height = height;
		this.point = point;
		this.value = "D"; // Variable de estado del cable.

		this.inputs = []; // Entradas a las que está conectado el cable
		this.outputs = []; // Salidas a las que está conectado el cable
		this.delay = 5; // Retraso en la propagación en milisegundos
	}

	// Define un valor específico
	setValue(value) {
		this.value = value;
		setTimeout(() => {
			this.outputs.forEach((output) => output.updateValue());
		}, this.delay);
	}

	// Actualiza el valor según las entradas de señal a las que está conectado
	updateValue() {
		console.error("updateValue not defined.");
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
		this.inputs = this.inputs.filter((input) => input !== comp);
		this.updateValue();
	}

	// Agrega una salida de señal
	addOutput(comp) {
		this.outputs.push(comp);
	}

	// Elimina una salida de señal
	removeOutput(comp) {
		this.outputs = this.outputs.filter((output) => output !== comp);
	}

	// Elimina una conexión
	removeConnection(comp) {
		this.inputs = this.inputs.filter((input) => input !== comp);
		this.outputs = this.outputs.filter((output) => output !== comp);
		this.updateValue();
	}

	// Elimina todas las conexiones
	deleteAllConnections() {
		// Desconecta todas las entradas y salidas asociadas a este componente
		this.inputs.forEach((input) => input.removeConnection(this));
		this.outputs.forEach((output) => output.removeConnection(this));
		this.inputs = [];
		this.outputs = [];
	}

	isConnectedTo(point) {
		// Este método debe ser implementado por las subclases para determinar si están conectadas a un punto específico
		console.error("isConnectedTo not defined.");
	}

	reconnectComponent(Circuit) {
		// Reconectar entradas y salidas después de un cambio en el circuito
		for (let pin of this.inputs) {
			let wire = Circuit.getConnectedComponentWithNotParent(pin.point, pin.parent);
			if (wire) {
				if (pin.type === 'in') {
					wire.addOutput(pin);
				} else if (pin.type === 'out') {
					wire.addInput(pin);
				}

				pin.addConnection(wire);
				pin.updateValue();
			}
		}

		for (let pin of this.outputs) {
			let wire = Circuit.getConnectedComponentWithNotParent(pin.point, pin.parent);
			if (wire) {
				if (pin.type === 'in') {
					wire.addOutput(pin);
				} else if (pin.type === 'out') {
					wire.addInput(pin);
				}

				pin.addConnection(wire);
				pin.updateValue();
			}
		}
	}
}

export default Component;
