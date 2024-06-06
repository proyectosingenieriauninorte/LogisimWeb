import Component from './Component.js';

class Gate extends Component {
	constructor(point) {	
		super(point, 40, 40);
	}

	setValue(value) {
		this.value = value;
		this.outputs.forEach((output) => output.setValue(value));
	}

	// Devuelve el componente al que esta conectado un punto
	isConnectedTo(point) {
		let pin = this.inputs.find((input) => input.isConnectedTo(point));
		if (pin) return pin;

		pin = this.outputs.find((output) => output.isConnectedTo(point));
		if (pin) return pin;

		return this.point.x - 20 <= point.x &&
			point.x <= this.point.x + 20 &&
			this.point.y - 20 <= point.y &&
			point.y <= this.point.y + 20
			? this
			: null;
	}

	// Elimina todas las conexciones
	deleteAllConnections() {
		this.inputs.forEach((input) => input.deleteAllConnections(this));
        this.outputs.forEach((output) => output.deleteAllConnections(this));
        this.updateValue();
	}
}

export default Gate;
