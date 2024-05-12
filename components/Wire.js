class Wire {
	constructor() {
		this.lines = []; // Arrego que contiene todas las lineas del cable
		this.state = "D"; // Variable de estado del clable. 'D' es desconectado
	}

	// Cambia el estado del cable
	setState(state) {
		this.state = state;
	}

	// Devuelve el estado del cable
	getState() {
		return this.state;
	}

	// Agrega una nueva linea a la coleccion de lineas
	addLine(line) {
		if (!this.existLine(line)) {
			this.lines.push(line);
		} else {
			console.log("Linea ya existe");
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
		});
	}
}

export default Wire;
