import Point from "./components/Point.js";
import Line from "./components/Line.js";
import Wire from "./components/wire.js";
import Constant from "./components/Constant.js";

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
var clearButton = document.getElementById("clearButton");
clearButton.addEventListener("click", clearAll);

// Funcion para repintar los componentes del canvas
function repaintCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas
	initCanvas(); // Repinta la grilla
	// console.log(Wires);
	// console.log(Components);
	Wires.forEach((wire) => draw(wire)); // Pinta todos los cables
	Components.forEach((comp) => draw(comp)); // Pinta todos los componentes
}

/* Manejo de componentes */

// Coleccion de componentes y cables
var Wires = [];
var Components = [];
var temp_const = "1"; // Variable temporal para probar las diferentes constantes

function addWire(pointA, pointB) {
	// Crea la nueva linea
	let line = new Line(pointA, pointB);

	// Obtiene los componentes, si es que existen, a los que estan conectados
	// los puntos
	let compA = getConnectedComponent(pointA);
	let compB = getConnectedComponent(pointB);

	// Calculamos el estado que va a contener el cable
	let stateA = compA ? compA.getState() : "D";
	let stateB = compB ? compB.getState() : "D";
	let stateR = "";
	if (stateA == stateB) {
		stateR = stateA;
	} else if (stateA == "D") {
		stateR = stateB;
	} else if (stateB == "D") {
		stateR = stateA;
	} else if (stateA != stateB) {
		stateR = "E";
	}

	// Verifica los dos puntos seleccionados
	if (compA instanceof Wire && compB instanceof Wire) {
		// Crea el nuevo cable
		let nwWire = new Wire();
		// Une todas las lineas dentro del nuevo cable
		nwWire.lines = Array.from(compA.lines).concat(Array.from(compB.lines));
		nwWire.addLine(line);
		nwWire.setState(stateR);

		// Elimina los antiguos cables
		Wires = Wires.filter((comp) => comp != compA && comp != compB);
		// Agrega el nuevo cable
		Wires.push(nwWire);
	} else if (compA instanceof Wire) {
		compA.addLine(line);
		compA.setState(stateR);
	} else if (compB instanceof Wire) {
		compB.addLine(line);
		compB.setState(stateR);
	} else {
		// Si no existe crea un nuevo cable
		let nwWire = new Wire();
		nwWire.addLine(line);
		nwWire.setState(stateR);
		Wires.push(nwWire);
	}
}

// Obtiene el componente o cable al que esta conectado el punto
function getConnectedComponent(point) {
	let comp = Components.find((comp) => {
		if (comp.isConnectedTo(point)) return true;
	});

	if (comp) return comp;

	comp = Wires.find((wire) => {
		if (wire.isConnectedTo(point)) return true;
	});

	return comp;
}

// Funcion para eliminar todos los componentes
function clearComponents() {
	Wires = [];
	Components = [];
}

/* Modo para crear cables */

var selectedPoint = null; // Nodo seleccionado

// Función para manejar el clic del mouse en el canvas
function handleClickWire(event) {
	var rect = canvas.getBoundingClientRect();
	var mouseX = event.clientX - rect.left;
	var mouseY = event.clientY - rect.top;
	var clickedPoint = getPointGrid(mouseX, mouseY);

	// Verifica si existe un punto ya seleccionado
	if (!selectedPoint) {
		selectedPoint = clickedPoint;
		drawPoint(clickedPoint.x, clickedPoint.y);
	} else if (!selectedPoint.isEqualTo(clickedPoint)) {
		// Crea un nuevo cable
		addWire(selectedPoint, clickedPoint);

		// Resetea el punto seleccionado
		selectedPoint = null;
		repaintCanvas();
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

/* Modo para agregar constantes */
function handleClickConst(event) {
	var rect = canvas.getBoundingClientRect();
	var mouseX = event.clientX - rect.left;
	var mouseY = event.clientY - rect.top;
	var clickedPoint = getPointGrid(mouseX, mouseY);

	let constant = new Constant(clickedPoint, temp_const);
	let wire = getConnectedComponent(constant.point);
	if (wire) {
		if (wire.getState() == "D") {
			wire.setState(constant.getState());
		} else if (wire.getState() != constant.getState()) {
			wire.setState("E");
		}
	}

	Components.push(constant);
	repaintCanvas();
}

/* Cambio de modo de click */

// Obtener botones y darles sus respectivos eventos
const btn_wire = document.getElementById("btn_wire");
btn_wire.addEventListener("click", () => changeMode("wire"));

const btn_hand = document.getElementById("btn_hand");
btn_hand.addEventListener("click", () => changeMode("hand"));

const btn_const0 = document.getElementById("btn_const0");
btn_const0.addEventListener("click", () => changeMode("const0"));

const btn_const1 = document.getElementById("btn_const1");
btn_const1.addEventListener("click", () => changeMode("const1"));

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

	/* 
	// ¡¡NO BORRAR!! Se usara cuando se defina la forma de cambiar la constante y no sean
	// botones separados. Mientras se usaran los botones separados (btn_const0, btn_const1)

	// Remueve todos los eventos para el modo constante
	btn_const.classList.remove("select");
	canvas.removeEventListener("click", handleClickConst);
	 */
	btn_const0.classList.remove("select");
	btn_const1.classList.remove("select");
	canvas.removeEventListener("click", handleClickConst);

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
		// ¡¡TAMPOCO BORRAR!! esto tambien hace parte de lo mismo que se habla arriba
		// case "const":
		// 	btn_const.classList.add("select");
		// 	canvasContainer.style.cursor = "crosshair"; // Cambia el cursor

		// 	// Eventos del click para el modo constante
		// 	canvas.addEventListener("click", handleClickConst);
		// 	break;
		case "const0":
			btn_const0.classList.add("select");
			canvasContainer.style.cursor = "crosshair"; // Cambia el cursor
			temp_const = "0";

			// Eventos del click para el modo constante
			canvas.addEventListener("click", handleClickConst);
			break;
		case "const1":
			btn_const1.classList.add("select");
			canvasContainer.style.cursor = "crosshair"; // Cambia el cursor
			temp_const = "1";

			// Eventos del click para el modo constante
			canvas.addEventListener("click", handleClickConst);
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

// Pinta un punto en el canvas dado una posicion X y Y
function drawPoint(x, y, color = "black") {
	ctx.beginPath();
	ctx.arc(x * gridSize, y * gridSize, defaultPointSize * 8, 0, 2 * Math.PI);
	ctx.fillStyle = color; // Color del nodo según su estado
	ctx.fill();
	ctx.closePath();
}

// Borra un punto en el canvas dado una posicion X y Y
function erasePoint(x, y) {
	ctx.beginPath();
	ctx.arc(x * gridSize, y * gridSize, defaultPointSize * 4, 0, 2 * Math.PI);
	ctx.fillStyle = "white"; // Color del nodo según su estado
	ctx.fill();
	ctx.closePath();

	ctx.beginPath();
	ctx.arc(x * gridSize, y * gridSize, defaultPointSize, 0, 2 * Math.PI);
	ctx.fillStyle = "black"; // Color del nodo según su estado
	ctx.fill();
	ctx.closePath();
}

// Pinta una linea en el canvas
function drawLine(line, color = "black") {
	ctx.beginPath();
	ctx.strokeStyle = color;
	ctx.lineWidth = line.lineWidth;
	ctx.moveTo(line.pointA.x * gridSize, line.pointA.y * gridSize);
	ctx.lineTo(line.pointB.x * gridSize, line.pointB.y * gridSize);
	ctx.stroke();
	ctx.closePath();
}

// Borra una linea en el canvas
function eraseLine(line) {
	// ...
}

function drawConstant(constant) {
	drawPoint(constant.point.x, constant.point.y);
	let wd = ctx.measureText(constant.state).width;
	let hg = 15;
	let x = constant.point.x * gridSize - wd - 8;
	let y = constant.point.y * gridSize + hg / 2 - 3;

	ctx.beginPath();
	ctx.fillStyle = constant.color;
	ctx.font = "bold " + hg + "px Arial";
	ctx.fillText(constant.state, x, y);
	ctx.closePath();
}

// Borra un objeto cualquiera
function draw(obj) {
	if (obj instanceof Point) {
		drawPoint(obj.x, obj.y);
	} else if (obj instanceof Line) {
		drawLine(obj);
	} else if (obj instanceof Wire) {
		let color = "";
		let state = obj.getState();

		switch (state) {
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
	} else if (obj instanceof Constant) {
		drawConstant(obj);
	} else {
		console.error("No se pudo pintar el objeto");
		console.error(obj);
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
