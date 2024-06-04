import Component from "./Component.js";

class Wire extends Component {
	constructor() {
		super(null);

		this.lines = []; // Arrego que contiene todas las lineas del cable
	}

	// Actualiza el valor segun las entradas de señal a la que esta conectado
	updateValue() {
		this.setValue(
			this.inputs.reduce((prevValue, comp) => {
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
			}, "D")
		);
	}

	// Verifica si un punto hace parte del cable
	isConnectedTo(point) {
		return this.lines.some((ln) => {
			let [pA, pB] = ln.getPoints();

			if (
				((pA.x <= point.x && point.x <= pB.x) ||
					(pB.x <= point.x && point.x <= pA.x)) &&
				((pA.y <= point.y && point.y <= pB.y) ||
					(pB.y <= point.y && point.y <= pA.y))
			) {
				return true;
			}
		})
			? this
			: undefined;
	}

	// Agrega una nueva linea a la coleccion de lineas
	addLine(line) {
		if (!this.existLine(line)) {
			this.lines.push(line);
		} else {
			console.error("Linea ya existe");
		}
	}

	// Elimina una linea de la coleccion de lineas
	removeLine(line) {
		if (this.existLine(line)) {
			this.lines = this.lines.filter((ln) => !ln.isEqualTo(line));
		} else {
			console.log("Linea no existe");
		}
	}

	// Verifica si una linea existe dentro de la coleccion de lineas
	existLine(line) {
		return this.lines.some((ln) => ln.isEqualTo(line));
	}
}

export default Wire;
