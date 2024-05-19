class Line {
	constructor(pointA, pointB) {
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

// Función para verificar si los extremos de una línea están conectados a otra línea
// export function areEndsConnectedToOtherLine(line, lines) {
// 	// Arreglo para almacenar las líneas conectadas
// 	var connectedLines = [];

// 	// Verificar si el inicio de la línea está conectado a otra línea
// 	for (var i = 0; i < lines.length; i++) {
// 		if (
// 			lines[i] !== line &&
// 			(lines[i].startNode === line.startNode ||
// 				lines[i].startNode === line.endNode)
// 		) {
// 			connectedLines.push(lines[i]);
// 		}
// 	}

// 	// Verificar si el final de la línea está conectado a otra línea
// 	for (var i = 0; i < lines.length; i++) {
// 		if (
// 			lines[i] !== line &&
// 			(lines[i].endNode === line.startNode ||
// 				lines[i].endNode === line.endNode)
// 		) {
// 			connectedLines.push(lines[i]);
// 		}
// 	}

// 	// Si hay líneas conectadas, devolver el arreglo
// 	if (connectedLines.length > 0) {
// 		return connectedLines;
// 	} else {
// 		return null; // Si no hay líneas conectadas, devolver null
// 	}
// }

export default Line;
