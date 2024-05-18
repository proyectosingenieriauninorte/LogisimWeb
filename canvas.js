import Point from "./components/Point.js";
import Line from "./components/Line.js";
import Wire from "./components/Wire.js";
import Pin from "./components/Pin.js";
import And from "./components/And.js";

/* Base del canvas */

// Obtener el canvas, el contenedor y el contexto 2D
var canvasContainer = document.getElementById("canvasContainer");
var canvas = document.getElementById("gridCanvas");
var ctx = canvas.getContext("2d");

// Tamaño del grid y tamaño del punto
var gridSize = 20;
var defaultPointSize = 0.5;

// Función para crear los nodos base del canvas
function initCanvas() {
	canvas.width = 2000;
	canvas.height = 2000;
	for (var x = 0; x <= canvas.width; x += gridSize) {
		for (var y = 0; y <= canvas.height; y += gridSize) {
			ctx.beginPath();
			ctx.arc(x, y, defaultPointSize, 0, 2 * Math.PI);
			ctx.fillStyle = "black"; // Color del nodo según su estado
			ctx.fill();
			ctx.closePath();
		}
	}
}

// Funcion para resetear todo
function clearAll() {
	clearComponents();
	repaintCanvas();
}
// Obtener el botón de limpiar
var clearButton = document.getElementById("btn_clear");
clearButton.addEventListener("click", clearAll);

// Funcion para repintar los componentes del canvas
function repaintCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas
	initCanvas(); // Repinta la grilla
	console.log("Wires:", Wires);
	console.log("Components:", Components);
	Wires.forEach((wire) => draw(wire)); // Pinta todos los cables
	Components.forEach((comp) => draw(comp)); // Pinta todos los componentes
}

/* Manejo de componentes */

// Coleccion de componentes y cables
var Wires = [];
var Components = [];
var temp_const = "1"; // Variable temporal para probar las diferentes constantes
var gate_type = "";

function addWire(pointA, pointB) {
	// Crea la nueva linea
	let line = new Line(pointA, pointB);

	// Obtiene los componentes, si es que existen, a los que estan conectados
	// los puntos
	let compA = getConnectedComponent(pointA);
	let compB = getConnectedComponent(pointB);

	// Cable al que se le va a agregar la linea
	let wire = null;

	// Verifica los dos puntos seleccionados
	if (compA instanceof Wire && compB instanceof Wire) {
		// Crea un nuevo cable que sera la union de los dos
		wire = new Wire();
		wire.lines = Array.from(compA.lines).concat(Array.from(compB.lines));
		wire.inputs = Array.from(compA.inputs).concat(Array.from(compB.inputs));
		wire.outputs = Array.from(compA.outputs).concat(
			Array.from(compB.outputs)
		);
		wire.updateValue();

		// Elimina las conexiones de los antiguos cables
		compA.deleteAllConnections();
		compB.deleteAllConnections();

		// Actuliza las conexiones de los componentes conectados a
		// los anteriores cables
		wire.inputs.forEach((input) => input.addConnection(wire));
		wire.outputs.forEach((output) => output.addConnection(wire));

		// Elimina los antiguos cables
		Wires = Wires.filter((comp) => comp != compA && comp != compB);
		// Agrega el nuevo cable
		Wires.push(wire);
	} else if (compA instanceof Wire) {
		wire = compA;
	} else if (compB instanceof Wire) {
		wire = compB;
	} else {
		// Si no existe crea un nuevo cable
		wire = new Wire();
		Wires.push(wire);
	}

	wire.addLine(line); // Agrega la linea

	// Agrega las entradas y/o salidas a las que esta conectada esta linea
	if (compA instanceof Pin) {
		switch (compA.type) {
			case "out":
				wire.addInput(compA);
				break;
			case "in":
				wire.addOutput(compA);
				break;
		}
		compA.addConnection(wire);
	}
	if (compB instanceof Pin) {
		switch (compB.type) {
			case "out":
				wire.addInput(compB);
				break;
			case "in":
				wire.addOutput(compB);
				break;
		}
		compB.addConnection(wire);
	}
}

// Obtiene el componente o cable al que esta conectado el punto
function getConnectedComponent(point) {
	let comp = null;
	for (let cp of Components) {
		comp = cp.isConnectedTo(point);
		if (comp) break;
	}

	if (comp) return comp;

	for (let cp of Wires) {
		comp = cp.isConnectedTo(point);
		if (comp) break;
	}

	return comp;
}

// Funcion para actualizar el estado de los cables
function reloadWires() {
	Wires.forEach((wire) => wire.updateValue());
	repaintCanvas();
}
const btn_reload = document.getElementById("btn_reload");
btn_reload.addEventListener("click", reloadWires);

// Funcion para eliminar todos los componentes
function clearComponents() {
	Wires = [];
	Components = [];
}

/* Modo para crear cables */

var selectedPoint = null; // Nodo seleccionado

function handleClickWire(event) {
	var rect = canvas.getBoundingClientRect();
	var mouseX = event.clientX - rect.left;
	var mouseY = event.clientY - rect.top;
	var clickedPoint = getPointGrid(mouseX, mouseY);

	// Verifica si existe un punto ya seleccionado
	if (!selectedPoint) {
		selectedPoint = clickedPoint; // Guarda el primer punto seleccionado
		drawPoint(clickedPoint.x, clickedPoint.y);
	} else if (!selectedPoint.isEqualTo(clickedPoint)) {
		addWire(selectedPoint, clickedPoint); // Crea un nuevo cable
		selectedPoint = null; // Resetea el punto seleccionado
		repaintCanvas(); // Repinta el canvas
	}
}

/* Modo para arrastrar el canvas */

// Variables para almacenar las coordenadas de inicio del arrastre
var dragStartX = 0;
var dragStartY = 0;
var isDragging = false;

// Función para iniciar el arrastre
function startDragging(event) {
	isDragging = true;
	dragStartX = event.clientX;
	dragStartY = event.clientY;
}

// Función para finalizar el arrastre
function endDragging() {
	isDragging = false;
}

// Función para arrastrar el canvas
function dragCanvas(event) {
	if (isDragging) {
		var offsetX = event.clientX - dragStartX;
		var offsetY = event.clientY - dragStartY;
		canvasContainer.scrollLeft -= offsetX;
		canvasContainer.scrollTop -= offsetY;
		dragStartX = event.clientX;
		dragStartY = event.clientY;
	}
}

/* Modo para eliminar componentes */
function handleClickDelete(event) {
	var rect = canvas.getBoundingClientRect();
	var mouseX = event.clientX - rect.left;
	var mouseY = event.clientY - rect.top;
	var clickedPoint = getPointGrid(mouseX, mouseY);

	let comp = getConnectedComponent(clickedPoint);
	if (comp) {
		if (comp instanceof Wire) {
			Wires = Wires.filter((wire) => wire != comp);
		} else {
			Components = Components.filter((wire) => wire != comp);
		}

		comp.deleteAllConnections();
		repaintCanvas();
	}
}

/* Modo para agregar pines */
function handleClickPin(event) {
	var rect = canvas.getBoundingClientRect();
	var mouseX = event.clientX - rect.left;
	var mouseY = event.clientY - rect.top;
	var clickedPoint = getPointGrid(mouseX, mouseY);

	let pin = null;
	if (temp_const == -1) {
		pin = new Pin(clickedPoint, "in");
	} else {
		pin = new Pin(clickedPoint, "out", temp_const);
	}
	let wire = getConnectedComponent(pin.point);
	if (wire) {
		if (pin.type == "in") {
			wire.addOutput(pin);
		} else if (pin.type == "out") {
			wire.addInput(pin);
		}

		pin.addConnection(wire);
	}

	Components.push(pin);
	repaintCanvas();
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

/* Cambio de modo de click */

// Obtener botones y darles sus respectivos eventos
const btn_wire = document.getElementById("btn_wire");
btn_wire.addEventListener("click", () => changeMode("wire"));

const btn_hand = document.getElementById("btn_hand");
btn_hand.addEventListener("click", () => changeMode("hand"));

const btn_delete = document.getElementById("btn_delete");
btn_delete.addEventListener("click", () => changeMode("delete"));

const btn_const0 = document.getElementById("btn_const0");
btn_const0.addEventListener("click", () => changeMode("const0"));

const btn_const1 = document.getElementById("btn_const1");
btn_const1.addEventListener("click", () => changeMode("const1"));

const btn_probe = document.getElementById("btn_probe");
btn_probe.addEventListener("click", () => changeMode("probe"));

const btn_and = document.getElementById("btn_and");
btn_and.addEventListener("click", () => changeMode("and"));

// Funcion para cambiar el modo de click
function changeMode(mode) {
	// Remueve todos los eventos para el modo cable
	btn_wire.classList.remove("select");
	canvas.removeEventListener("click", handleClickWire);

	// Remueve todos los eventos para el modo arrastre
	btn_hand.classList.remove("select");
	canvasContainer.removeEventListener("mousedown", startDragging);
	canvasContainer.removeEventListener("mouseup", endDragging);
	canvasContainer.removeEventListener("mousemove", dragCanvas);

	// Remueve todos los eventos para el modo eliminar
	btn_delete.classList.remove("select");
	canvas.removeEventListener("click", handleClickDelete);

	/* 
	// ¡¡NO BORRAR!! Se usara cuando se defina la forma de cambiar la constante y no sean
	// botones separados. Mientras se usaran los botones separados (btn_const0, btn_const1)

	// Remueve todos los eventos para el modo constante
	btn_const.classList.remove("select");
	canvas.removeEventListener("click", handleClickConst);
	 */
	btn_const0.classList.remove("select");
	btn_const1.classList.remove("select");
	canvas.removeEventListener("click", handleClickPin);

	// Remueve todos los eventos para el modo sonda
	btn_probe.classList.remove("select");
	canvas.removeEventListener("click", handleClickPin);

	btn_and.classList.remove("select");
	canvas.removeEventListener("click", handleClickGate);

	switch (mode) {
		case "wire":
			btn_wire.classList.add("select");
			canvasContainer.style.cursor = "crosshair"; // Cambia el cursor

			// Eventos del click para el modo cable
			canvas.addEventListener("click", handleClickWire);
			break;
		case "hand":
			btn_hand.classList.add("select");
			canvasContainer.style.cursor = "grab"; // Cambia el cursor

			// Eventos del click para el modo arrastre
			canvasContainer.addEventListener("mousedown", startDragging);
			canvasContainer.addEventListener("mouseup", endDragging);
			canvasContainer.addEventListener("mousemove", dragCanvas);
			break;

		case "delete":
			btn_delete.classList.add("select");
			canvasContainer.style.cursor = "crosshair"; // Cambia el cursor

			// Eventos del click para el modo eliminar
			canvas.addEventListener("click", handleClickDelete);
			break;
		// ¡¡TAMPOCO BORRAR!! esto tambien hace parte de lo mismo que se habla arriba
		// case "const":
		// 	btn_const.classList.add("select");
		// 	canvasContainer.style.cursor = "crosshair"; // Cambia el cursor

		// 	// Eventos del click para el modo constante
		// 	canvas.addEventListener("click", handleClickPin);
		// 	break;
		case "const0":
			btn_const0.classList.add("select");
			canvasContainer.style.cursor = "crosshair"; // Cambia el cursor
			temp_const = "0";

			// Eventos del click para el modo constante
			canvas.addEventListener("click", handleClickPin);
			break;
		case "const1":
			btn_const1.classList.add("select");
			canvasContainer.style.cursor = "crosshair"; // Cambia el cursor
			temp_const = "1";

			// Eventos del click para el modo constante
			canvas.addEventListener("click", handleClickPin);
			break;
		case "probe":
			btn_probe.classList.add("select");
			canvasContainer.style.cursor = "crosshair"; // Cambia el cursor
			temp_const = "-1";

			// Eventos del click para el modo constante
			canvas.addEventListener("click", handleClickPin);
			break;
		case "and":
			btn_and.classList.add("select");
			canvasContainer.style.cursor = "crosshair"; // Cambia el cursor
			gate_type = "and";

			canvas.addEventListener("click", handleClickGate);
			break;
	}
}

/* Utilidades */

// Función para obtener la posición del mouse en el canvas
// Devuelve un indice X y Y del punto mas cercano al mouse en el canvas al pasar el evento de click.
function getMousePos(event) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: Math.round((event.clientX - rect.left) / gridSize),
		y: Math.round((event.clientY - rect.top) / gridSize),
	};
}

// Funcion para traducir un punto del mouse en uno del grid del canvas
function getPointGrid(mouseX, mouseY) {
	return new Point(
		Math.round(mouseX / gridSize),
		Math.round(mouseY / gridSize)
	);
}

/* Dibujar en el canvas */

// Dibuja un punto en el canvas dado una posicion X y Y
function drawPoint(x, y, color = "black") {
	ctx.beginPath();
	ctx.arc(x * gridSize, y * gridSize, defaultPointSize * 8, 0, 2 * Math.PI);
	ctx.fillStyle = color; // Color del nodo según su estado
	ctx.fill();
	ctx.closePath();
}

// Dibuja una linea en el canvas
function drawLine(line, color = "black") {
	ctx.beginPath();
	ctx.strokeStyle = color;
	ctx.lineWidth = line.lineWidth;
	ctx.moveTo(line.pointA.x * gridSize, line.pointA.y * gridSize);
	ctx.lineTo(line.pointB.x * gridSize, line.pointB.y * gridSize);
	ctx.stroke();
	ctx.closePath();
}

// Dibuja un pin
function drawPin(pin) {
	let color = "";
	let value = pin.value;
	let x = pin.point.x;
	let y = pin.point.y;
	let wd = ctx.measureText(value).width;
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
			x * gridSize,
			y * gridSize,
			defaultPointSize * 8,
			0,
			2 * Math.PI
		);
		ctx.fillStyle = color; // Color del nodo según su estado
		ctx.fill();
		ctx.closePath();

		x = x * gridSize - defaultPointSize * 8 - wd - 3;
		y = y * gridSize + hg / 2 - 3;
	}

	ctx.beginPath();
	ctx.fillStyle = color;
	ctx.font = "bold " + hg + "px Arial";
	ctx.fillText(value, x, y);
	ctx.closePath();
}

// Dibuja un objeto cualquiera
function draw(obj) {
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

/* Inicialización */
initCanvas();
changeMode("wire");

///////////////////////////////////////////////Refactor Canvas.js///////////////////////////////////

// var selectedNode = null; // Nodo seleccionado

// // Función para ajustar el tamaño del canvas al tamaño de la pantalla
// function resizeCanvas() {
// 	var containerWidth = canvasContainer.clientWidth; // Resta el margen del ancho del contenedor
// 	var containerHeight = canvasContainer.clientHeight; // Resta el margen del alto del contenedor
// 	canvas.width = containerWidth * 2;
// 	canvas.height = containerHeight * 2;
// 	initCanvas();
// }
// // Llamar a la función para ajustar el tamaño del canvas cuando la ventana se redimensione
// window.addEventListener("resize", resizeCanvas);

// // Agregar evento de clic al canvas para manejar la creación de líneas
// canvas.addEventListener('click', handleClickWire);

// // Dibujar los puntos en los vértices del grid
// function drawGridPoints() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas antes de redibujar
//     lines.forEach(line => drawLine(line)); // Dibujar cada línea
//     nodes.forEach(node => node.draw(ctx)); // Dibujar cada nodo
// }

// Pinta el punto en el canvas en el que se haga click
// canvas.addEventListener('click', function(event) {
//     var pos = getMousePos(event);
//     drawPoint(pos.x, pos.y);
// });

// // Función para manejar el clic del mouse en el canvas
// function handleClickWire(event) {
//     var rect = canvas.getBoundingClientRect();
//     var mouseX = event.clientX - rect.left;
//     var mouseY = event.clientY - rect.top;
//     var clickedNode = findNodeAtPosition(mouseX, mouseY);

//     if (clickedNode) {
//         if (!selectedNode) {
//             selectedNode = clickedNode;
//             highlightNode(clickedNode);
//         } else {
//             if (selectedNode !== clickedNode) {
//                 console.log(selectedNode, clickedNode);
//                 createLine(selectedNode, clickedNode);
//             }
//             selectedNode = null;
//         }
//     }
// }

// // Función para encontrar el nodo en la posición dada
// function findNodeAtPosition(x, y) {
//     for (let node of nodes) {
//         if (node.isPointInside(x, y)) {
//             return node;
//         }
//     }
//     return null;
// }

// // Función para crear una línea entre dos nodos
// function createLine(startNode, endNode) {
//     // Verificar si los nodos están en múltiplos de 20
//     if (startNode.x % gridSize === 0 && startNode.y % gridSize === 0 &&
//         endNode.x % gridSize === 0 && endNode.y % gridSize === 0) {

//         // Crear la línea
//         var line = new Line(startNode, endNode);
//         lines.push(line); // Agregar la línea al arreglo de líneas
//         console.log(lines);
//         highlightEndNodes(line); // Resaltar los nodos extremos de la línea
//         drawLine(line);
//     }
// }

// // Función para resaltar un nodo
// function highlightNode(node) {
//     node.highlight("blue");
//     drawGridPoints();
// }

// // Función para resaltar los nodos extremos de una línea
// function highlightEndNodes(line) {
//     line.startNode.unhighlight();
//     line.startNode.highlight();
//     line.endNode.highlight();
//     drawGridPoints();
// }

// // Función para dibujar una línea en el canvas
// function drawLine(line) {
//     ctx.beginPath();
//     ctx.strokeStyle = 'blue'; // Color de la línea
//     ctx.lineWidth = 8; // Grosor de la línea
//     ctx.moveTo(line.startNode.x, line.startNode.y); // Mover el cursor al nodo de inicio
//     for (let node of line.nodes) {
//         ctx.lineTo(node.x, node.y);
//     }
//     ctx.stroke();
// }

// function unhighlightNodeIfNotEnd(node) {
//     for (var i = 0; i < lines.length; i++) {
//         if (lines[i].startNode === node || lines[i].endNode === node) {
//             return; // Si el nodo es un extremo de alguna línea, no se unhighlight
//         }
//     }
//     node.unhighlight(); // Si no es un extremo, se unhighlight
// }
