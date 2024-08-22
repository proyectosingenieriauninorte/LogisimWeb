class Line {
	constructor(pointA,pointB) {
		this.lineWidth = 4; // Grosor de la linea

		// Puntos extremos de la linea
		this.pointA = pointA;
		this.pointB = pointB;
	}

	// Compara si una linea es igual a el mismo
	isEqualTo(line) {
		if (!line instanceof Line) return false;

		let [pA, pB] = line.getPoints();

		if (
			(pA.isEqualTo(this.pointA) && pB.isEqualTo(this.pointB)) ||
			(pB.isEqualTo(this.pointA) && pA.isEqualTo(this.pointB))
		) {
			return true;
		} else {
			return false;
		}
	}

	setColor(color) {
		this.color = color;
	}

	// Retorna los puntos extremos de la linea
	getPoints() {
		return [this.pointA, this.pointB];
	}
}

export default Line;