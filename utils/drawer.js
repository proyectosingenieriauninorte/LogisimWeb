import { gridSize, defaultPointSize } from "../config/config.js";

export function drawPoint(x, y,ctx, color = "black") {
	ctx.beginPath();
	ctx.arc(x * gridSize, y * gridSize, defaultPointSize * 8, 0, 2 * Math.PI);
	ctx.fillStyle = color; // Color del nodo según su estado
	ctx.fill();
	ctx.closePath();
}


export function drawPin(pin,ctx) {
	let color = "black";
	let value = pin.value;
	let x = pin.point.x;
	let y = pin.point.y;
	let wd = 10 //ctx.measureText(value).width;
	let hg = 15;

	switch (value) {
		case "E":
			color = "red";
			break;
		case "D":
			color = "blue";
			break;
		case "0":
			color = "#006400";
			break;
		case "1":
			color = "#00d200";
			break;
		default:
			color = "black";
			break;
	}

	if (pin.type == "in") {
		ctx.beginPath();
		ctx.arc(
			x * gridSize,
			y * gridSize,
			defaultPointSize * 8,
			0,
			2 * Math.PI
		);
		ctx.strokeStyle = color; // color del borde
		ctx.lineWidth = 2;
		ctx.stroke();
		ctx.closePath();

		x = x * gridSize + defaultPointSize * 8 + 3;
		y = y * gridSize + hg / 2 - 3;
	} else if (pin.type == "out") {
		ctx.beginPath();
		ctx.arc(
			x,
			y,
			defaultPointSize * 8,
			0,
			2 * Math.PI
		);
		ctx.fillStyle = color; // Color del nodo según su estado
		ctx.fill();
		ctx.closePath();

		x = x-15
		y = y+3
	}

	ctx.beginPath();
	ctx.fillStyle = color;
	ctx.font = "bold " + hg + "px Arial";
	ctx.fillText(value, x, y);
	//ctx.closePath();
}

// Dibuja un objeto cualquiera
export function draw(obj) {
	if (obj instanceof Point) {
		drawPoint(obj.x, obj.y);
	} else if (obj instanceof Line) {
		drawLine(obj);
	} else if (obj instanceof Wire) {
		let color = "";
		let value = obj.getValue();

		switch (value) {
			case "E":
				color = "red";
				break;
			case "D":
				color = "blue";
				break;
			case "0":
				color = "#006400";
				break;
			case "1":
				color = "#00d200";
				break;
			default:
				color = "black";
				break;
		}

		obj.lines.forEach((ln) => drawLine(ln, color));
	} else if (obj instanceof Pin) {
		drawPin(obj);
	} else if (obj instanceof And) {
		obj.inputs.forEach((pin) => draw(pin));
		obj.outputs.forEach((pin) => draw(pin));
	} else {
		console.error("No se pudo pintar el objeto");
		console.error("Objeto: ", obj);
	}
}

export function drawLine(ctx, edges, color='black') {
    // Set the line color and width
	ctx.strokeStyle = color
    ctx.lineWidth = 2

    // Start drawing the line
    ctx.beginPath()

    // Move to the first edge
    ctx.moveTo(edges[0].x, edges[0].y)

    // Draw the remaining edges
    for (let i = 1; i < edges.length; i++) {
        ctx.lineTo(edges[i].x, edges[i].y)
    }

    // Finish drawing the line
    ctx.stroke()
}

export function approximateCoordinates(number, coord) {

    const approximatedX = Math.round(coord.x / number) * number
    const approximatedY = Math.round(coord.y / number) * number

    return { x: approximatedX, y: approximatedY }
}

export function calculateMovementType(coord1, coord2) {
    const diffX = coord1.x - coord2.x
    const diffY = coord1.y - coord2.y

    return {
        x: diffX,
        y: diffY
    }
}

export function compareCoordinates(coord1, coord2) {
    return coord1.x === coord2.x && coord1.y === coord2.y
}

export function addIntermediatePoint(point1, point2, variation = false) {
    const point = !variation
        ? { x: point1.x, y: point2.y }
        : { x: point2.x, y: point1.y }
    return [point1, point, point2]
}