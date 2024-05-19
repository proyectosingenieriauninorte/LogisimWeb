import Pin from "../components/Pin.js";
import Point from "../components/Point.js";
import Wire from "../components/Wire.js";
import { getPointGrid, getMousePos } from "../utils/util.js";
import Circuit from "../canvas.js";
import { approximateCoordinates} from "../utils/drawer.js";
import { gridSize } from "../config/config.js";

/* Modo para eliminar componentes */
export function handleClickDelete(event) {
	// var rect = canvas.getBoundingClientRect();
	// var mouseX = event.clientX - rect.left;
	// var mouseY = event.clientY - rect.top;
	// clickedPoint = approximateCoordinates(mouseX, mouseY);
	var coordinates = approximateCoordinates(gridSize, getMousePos(event))
	var clickedPoint = new Point(coordinates.x,coordinates.y)
	let comp = Circuit.getConnectedComponent(clickedPoint);
	if (comp) {
		if (comp instanceof Wire) {
			Circuit.Wires = Circuit.Wires.filter((wire) => wire != comp);
		} else {
			Circuit.Components = Circuit.Components.filter((wire) => wire != comp);
		}

		comp.deleteAllConnections();
		Circuit.repaintCircuit()
	}
}

/* Modo para agregar pines */
var temp_const = "1";
export function handleClickPin(event) {
	//var rect = canvasContainer.getBoundingClientRect();
	//var mouseX = event.clientX - rect.left;
	//var mouseY = event.clientY - rect.top;
	var coordinates = approximateCoordinates(gridSize, getMousePos(event))
	var clickedPoint = new Point(coordinates.x,coordinates.y)
	let pin = null;
	if (temp_const == -1) {
		pin = new Pin(clickedPoint, "in");
	} else {
		pin = new Pin(clickedPoint, "out", temp_const);
	}

	let wire = Circuit.getConnectedComponent(pin.point);

	if (wire) {
		if (pin.type == "in") {
			wire.addOutput(pin);
		} else if (pin.type == "out") {
			wire.addInput(pin);
		}

		pin.addConnection(wire);
	}

	Circuit.Components.push(pin);
	Circuit.repaintCircuit()
}

/* Modo para agregar puertas */
function handleClickGate(event) {
	var rect = canvas.getBoundingClientRect();
	var mouseX = event.clientX - rect.left;
	var mouseY = event.clientY - rect.top;
	var clickedPoint = getPointGrid(mouseX, mouseY);

	let gate = null;
	switch (gate_type) {
		case "and":
			gate = new And(clickedPoint);
			break;
	}

	gate.inputs.forEach((pin) => {
		let wire = getConnectedComponent(pin.point);
		if (wire) {
			wire.addOutput(pin);
			pin.addConnection(wire);
		}
	});
	gate.outputs.forEach((pin) => {
		let wire = getConnectedComponent(pin.point);
		if (wire) {
			wire.addInput(pin);
			pin.addConnection(wire);
		}
	});

	Components.push(gate);
	repaintCanvas();
}