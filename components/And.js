import Point from "./Point.js";
import Component from "./Component.js";
import Pin from "./Pin.js";

class And extends Component {
	constructor(point, entries = 2) {
		super(point);
		let x = point.x;
		let y = point.y;

		// Inicializa las entradas
		let pt = null;
		for (let i = 0; i < entries; i++) {
			pt = new Point(x - 20, y + i * 40-20);
			this.inputs.push(new Pin(pt, "in"));
		}

		// Inicializa la salida
		pt = new Point(x + 17, y);
		this.outputs.push(new Pin(pt, "out", "D"));
	}

	setValue(value) {
		this.value = value;
		this.outputs.forEach((output) => output.setValue(value))
	}

	// Se reescribe el metodo de actualizacion del valor
	updateValue() {
		this.setValue(
			this.inputs.reduce((prevValue, current) => {
				if (current == "D") return prevValue;
				return prevValue & current;
			}, "D")
		);
	}

	// Devuelve el componente al que esta conectado un punto
	isConnectedTo(point) {
		let pin = this.inputs.find((input) => input.isConnectedTo(point));;
		if (pin) return pin;

		pin = this.outputs.find((output) => output.isConnectedTo(point));
		return pin;
	}
}

export default And;
