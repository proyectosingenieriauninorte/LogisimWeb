import Component from "./Component.js";

class Wire extends Component {
	constructor() {
		super(null);
		this.lines = []; // Contiene todas las líneas del cable
		this.delay = 1; // 1ms de retraso para la transmisión de la señal
	}

	updateValue() {
		// Utiliza un temporizador para simular el retraso de propagación de la señal
		setTimeout(() => {
			this.setValue(
				this.inputs.reduce((prevValue, comp) => {
					let currentValue = comp.getValue();
					if (prevValue === currentValue) return prevValue;
					if (prevValue === "D") return currentValue;
					if (currentValue === "D") return prevValue;
					return "E";
				}, "D")
			);
		}, this.delay);
	}

	isConnectedTo(point) {
		// Comprueba si alguna línea del cable está conectada al punto dado
		return this.lines.some((ln) => {
			let [pA, pB] = ln.getPoints();
			return ((pA.x <= point.x && point.x <= pB.x) || (pB.x <= point.x && point.x <= pA.x)) &&
				   ((pA.y <= point.y && point.y <= pB.y) || (pB.y <= point.y && point.y <= pA.y)) ? this : undefined;
		});
	}

	addLine(line) {
		if (!this.existLine(line)) {
			this.lines.push(line);
		} else {
			console.error("Line already exists");
		}
	}

	removeLine(line) {
		if (this.existLine(line)) {
			this.lines = this.lines.filter((ln) => !ln.isEqualTo(line));
		} else {
			console.log("Line does not exist");
		}
	}

	existLine(line) {
		return this.lines.some((ln) => ln.isEqualTo(line));
	}

	deleteAllConnections() {
		// Elimina todas las conexiones asociadas a este cable
		this.inputs.forEach((input) => input.removeConnection(this));
		this.outputs.forEach((output) => output.removeConnection(this));
		this.inputs = [];
		this.outputs = [];
	}
}

export default Wire;
