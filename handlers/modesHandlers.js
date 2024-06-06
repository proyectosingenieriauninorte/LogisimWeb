import Pin from "../components/Pin.js";
import Point from "../components/Point.js";
import Wire from "../components/Wire.js";
import And from "../components/And.js";
import { getMousePos } from "../utils/util.js";
import Circuit from "../canvas.js";
import { approximateCoordinates} from "../utils/drawer.js";
import { gridSize } from "../config/config.js";

/* Modo para eliminar componentes */
export function handleClickDelete(event) {
	// var rect = canvas.getBoundingClientRect();
	// var mouseX = event.clientX - rect.left;
	// var mouseY = event.clientY - rect.top;
	// clickedPoint = approximateCoordinates(mouseX, mouseY);
	var coordinates = approximateCoordinates(gridSize, getMousePos(event));
	var clickedPoint = new Point(coordinates.x,coordinates.y);
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

var sw  = true

/* Modo para agregar pines */
export function handleNotClickPin(event, temp_const){
	var coordinatesvol = approximateCoordinates(gridSize, getMousePos(event))
	var posmouse = new Point(coordinatesvol.x,coordinatesvol.y)
	let pinvol = null;
	if (temp_const == -1) {
		pinvol = new Pin(posmouse, "in");
	} else {
		pinvol = new Pin(posmouse, "out", temp_const);
	}

	var put = false
	Circuit.draw(pinvol,put);
}

export function handleClickPin(event,temp_const) {

	//var rect = canvasContainer.getBoundingClientRect();
	//var mouseX = event.clientX - rect.left;
	//var mouseY = event.clientY - rect.top;
	//var temp_const = "1"
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
	var put = true
	Circuit.repaintCircuit(put)
}

/* Modo para agregar puertas */
export function handleClickGate(event,gate_type) {
	// var rect = canvas.getBoundingClientRect();
	// var mouseX = event.clientX - rect.left;
	// var mouseY = event.clientY - rect.top;
	// var clickedPoint = getPointGrid(mouseX, mouseY);
	var coordinates = approximateCoordinates(gridSize, getMousePos(event));
	var clickedPoint = new Point(coordinates.x,coordinates.y);

	let gate = null;
	switch (gate_type) {
		case "and":
			gate = new And(clickedPoint);
			break;
	}

	gate.inputs.forEach((pin) => {
		let wire = Circuit.getConnectedComponent(pin.point);
		if (wire) {
			wire.addOutput(pin);
			pin.addConnection(wire);
		}
	});
	gate.outputs.forEach((pin) => {
		let wire = Circuit.getConnectedComponent(pin.point);
		if (wire) {
			wire.addInput(pin);
			pin.addConnection(wire);
		}
	});

	Circuit.Components.push(gate);
	var put = true
	Circuit.repaintCircuit(put);
}