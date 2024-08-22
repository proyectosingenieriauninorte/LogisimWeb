import And from '../components/And.js';
import Or from '../components/Or.js';
import Not from '../components/Not.js';
import { gridSize, defaultPointSize } from '../config/config.js';

export function drawPoint(x, y, ctx, color = 'black') {
	ctx.beginPath();
	ctx.arc(x * gridSize, y * gridSize, defaultPointSize * 8, 0, 2 * Math.PI);
	ctx.fillStyle = color; // Color del nodo según su estado
	ctx.fill();
	ctx.closePath();
}

export function drawLine(ctx, edges, color = 'black') {
	// Set the line color and width
	ctx.strokeStyle = color;
	ctx.lineWidth = 2;

	// Start drawing the line
	ctx.beginPath();

	// Move to the first edge
	ctx.moveTo(edges[0].x, edges[0].y);

	// Draw the remaining edges
	for (let i = 1; i < edges.length; i++) {
		ctx.lineTo(edges[i].x, edges[i].y);
	}

	// Finish drawing the line
	ctx.stroke();
}

export function drawPin(pin, ctx, etq = true) {
	let color = 'black';
	let value = pin.value;
	let x = pin.point.x;
	let y = pin.point.y;
	let wd = value.length*9;
	let hg = 15;

	switch (value) {
		case 'E':
			color = 'red';
			break;
		case 'D':
			color = 'blue';
			break;
		case '0':
			color = '#006400';
			break;
		case '1':
			color = '#00d200';
			break;
		default:
			color = 'black';
			break;
	}

	if (pin.type == 'in') {
		ctx.beginPath();
		ctx.arc(x, y, defaultPointSize * 8, 0, 2 * Math.PI);
		ctx.strokeStyle = color; // color del borde
		ctx.lineWidth = 2;
		ctx.stroke();
		ctx.closePath();

		if (etq) {
			ctx.beginPath();
			ctx.fillStyle = color;
			ctx.font = 'bold ' + hg + 'px Arial';
			ctx.fillText(value, x + 8, y + 5);
			ctx.closePath();
		}
	} else if (pin.type == 'out') {
		ctx.beginPath();
		ctx.arc(x, y, defaultPointSize * 8, 0, 2 * Math.PI);
		ctx.fillStyle = color; // Color del nodo según su estado
		ctx.fill();
		ctx.closePath();

		if (etq) {
			ctx.beginPath();
			ctx.fillStyle = color;
			ctx.font = 'bold ' + hg + 'px Arial';
			ctx.fillText(value, x - wd - 5, y + 5);
			ctx.closePath();
		}
	}
}

export function drawGate(gate, ctx) {
	let x = gate.point.x;
	let y = gate.point.y;
	let name = 'NONE';
	if (gate instanceof And) {
		name = 'AND';
	} else if (gate instanceof Or) {
		name = 'OR';
	} else if (gate instanceof Not) {
		name = 'NOT';
	}

	let hg = 13;
	let wd = ctx.measureText(name).width;

	ctx.beginPath();
	ctx.strokeStyle = 'black';
	ctx.strokeRect(x - 20, y - 20, 40, 40);
	ctx.closePath();

	ctx.beginPath();
	ctx.fillStyle = 'black';
	ctx.font = 'bold ' + hg + 'px Arial';
	ctx.fillText(name, x - wd/2, y + hg/3);
	ctx.closePath();

	gate.inputs.forEach((pin) => drawPin(pin, ctx, false));
	gate.outputs.forEach((pin) => drawPin(pin, ctx, false));
}

// Dibuja un objeto cualquiera
// export function draw(obj) {
// 	if (obj instanceof Point) {
// 		drawPoint(obj.x, obj.y);
// 	} else if (obj instanceof Line) {
// 		drawLine(obj);
// 	} else if (obj instanceof Wire) {
// 		let color = "";
// 		let value = obj.getValue();

// 		switch (value) {
// 			case "E":
// 				color = "red";
// 				break;
// 			case "D":
// 				color = "blue";
// 				break;
// 			case "0":
// 				color = "#006400";
// 				break;
// 			case "1":
// 				color = "#00d200";
// 				break;
// 			default:
// 				color = "black";
// 				break;
// 		}

// 		obj.lines.forEach((ln) => drawLine(ln, color));
// 	} else if (obj instanceof Pin) {
// 		drawPin(obj);
// 	} else if (obj instanceof And) {
// 		obj.inputs.forEach((pin) => draw(pin));
// 		obj.outputs.forEach((pin) => draw(pin));
// 	} else {
// 		console.error("No se pudo pintar el objeto");
// 		console.error("Objeto: ", obj);
// 	}
// }

export function approximateCoordinates(number, coord) {
	const approximatedX = Math.round(coord.x / number) * number;
	const approximatedY = Math.round(coord.y / number) * number;

	return { x: approximatedX, y: approximatedY };
}

export function calculateMovementType(coord1, coord2) {
	const diffX = coord1.x - coord2.x;
	const diffY = coord1.y - coord2.y;

	return {
		x: diffX,
		y: diffY,
	};
}

export function compareCoordinates(coord1, coord2) {
	return coord1.x === coord2.x && coord1.y === coord2.y;
}

export function addIntermediatePoint(point1, point2, variation = false) {
	const point = !variation
		? { x: point1.x, y: point2.y }
		: { x: point2.x, y: point1.y };
	return [point1, point, point2];
}
