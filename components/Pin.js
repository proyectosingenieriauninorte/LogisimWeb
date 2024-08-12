class Pin {
	constructor(point, type, value = "D", parent = null) {
		this.parent = parent;
		this.point = point;
		this.value = value;
		this.type = type;

		this.connections = []; // Salidas o Entradas a las que esta conectado el cable
	}

	setValue(value) {
		this.value = value;
		this.connections.forEach((connection) => connection.updateValue());
	}

	// Actualiza el valor del pin
	updateValue() {
		if (this.type == "in") {
			this.value = this.connections.reduce((prevValue, comp) => {
				let currentValue = comp.getValue();
				let valueR = "";
				if (prevValue == currentValue) {
					valueR = prevValue;
				} else if (prevValue == "D") {
					valueR = currentValue;
				} else if (currentValue == "D") {
					valueR = prevValue;
				} else if (prevValue != currentValue) {
					valueR = "E";
				}

				return valueR;
			}, "D");

			if (this.parent) this.parent.updateValue();
		}
	}

	// Devuelve el valor del pin
	getValue() {
		return this.value;
	}

	// Agrega una entrada de señal
	addConnection(comp) {
		this.connections.push(comp);
		this.updateValue();
	}

	// Elimina una entrada de señal
	removeConnection(comp) {
		this.connections = this.connections.filter(
			(connection) => connection != comp
		);
		this.updateValue();
	}

	// Elimina todas las conexiones
	deleteAllConnections() {
		this.connections.forEach((connection) =>
			connection.removeConnection(this)
		);
		this.connections = [];
		this.updateValue();
	}

	isConnectedTo(point) {
		return this.point.isEqualTo(point) ? this : null;
	}
}

export default Pin;
