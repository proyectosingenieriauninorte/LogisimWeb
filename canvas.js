// Obtener el canvas y el contexto 2D
var canvas = document.getElementById("gridCanvas");
var ctx = canvas.getContext("2d");


// Obtener el botón de limpiar
var clearButton = document.getElementById('clearButton');

// Importar la clase Node desde el archivo node.js
import { Node } from './node.js';
// Importar la clase Line desde el archivo line.js
import { Line } from './line.js';

// Variable global para el nodo seleccionado
var selectedNode = null;

// Función para ajustar el tamaño del canvas al tamaño de la pantalla
function resizeCanvas() {
    var canvasContainer = document.getElementById('canvasContainer');
    var containerWidth = canvasContainer.clientWidth; // Resta el margen del ancho del contenedor
    var containerHeight = canvasContainer.clientHeight; // Resta el margen del alto del contenedor
    canvas.width = containerWidth * 2;
    canvas.height = containerHeight * 2;
    drawGridPoints(); // Redibujar el grid cuando se cambie el tamaño del canvas
}

// Llamar a la función para ajustar el tamaño del canvas cuando la ventana se redimensione
window.addEventListener("resize", resizeCanvas);

// Agregar evento de clic al canvas para manejar la creación de líneas
canvas.addEventListener('click', handleCanvasClick);

// Agregar evento de clic al botón de limpiar
clearButton.addEventListener('click', clearCanvas);


// Tamaño del grid y tamaño del punto
var gridSize = 20;
var defaultPointSize = 0.5;

var nodes = []; // Arreglo para almacenar los nodos
var lines = []; // Arreglo para almacenar las líneas

var selectedNode = null; // Nodo seleccionado

// Función para crear los nodos del canvas
function createNodes() {
    nodes = []; // Limpiar el arreglo de nodos
    for (var x = 0; x <= canvas.width; x += gridSize) {
        for (var y = 0; y <= canvas.height; y += gridSize) {
            var node = new Node(x, y, defaultPointSize);
            nodes.push(node);
        }
    }
}

// Dibujar los puntos en los vértices del grid
function drawGridPoints() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas antes de redibujar
    lines.forEach(line => drawLine(line)); // Dibujar cada línea
    nodes.forEach(node => node.draw(ctx)); // Dibujar cada nodo
}

// Función para manejar el clic del mouse en el canvas
function handleCanvasClick(event) {
    var rect = canvas.getBoundingClientRect();
    var mouseX = event.clientX - rect.left;
    var mouseY = event.clientY - rect.top;
    var clickedNode = findNodeAtPosition(mouseX, mouseY);

    if (clickedNode) {
        if (!selectedNode) {
            selectedNode = clickedNode;
            highlightNode(clickedNode);
        } else {
            if (selectedNode !== clickedNode) {
                createLine(selectedNode, clickedNode);
            }
            selectedNode = null;
        }
    }
}

// Función para encontrar el nodo en la posición dada
function findNodeAtPosition(x, y) {
    for (let node of nodes) {
        if (node.isPointInside(x, y)) {
            return node;
        }
    }
    return null;
}

// Función para crear una línea entre dos nodos
function createLine(startNode, endNode) {
    // Verificar si los nodos están en múltiplos de 20
    if (startNode.x % gridSize === 0 && startNode.y % gridSize === 0 &&
        endNode.x % gridSize === 0 && endNode.y % gridSize === 0) {
        // Verificar si la línea es horizontal o vertical
        if (startNode.x === endNode.x || startNode.y === endNode.y) {
            // Crear la línea
            var line = new Line(startNode, endNode);
            lines.push(line); // Agregar la línea al arreglo de líneas
            highlightEndNodes(line); // Resaltar los nodos extremos de la línea
            drawLine(line);
        }else{
            unhighlightNodeIfNotEnd(startNode);
            drawGridPoints();
            console.log('Los nodos no están alineados horizontal o verticalmente');
        }
    }
}
// Función para resaltar un nodo
function highlightNode(node) {
    node.highlight("blue");
    drawGridPoints();
}

// Función para resaltar los nodos extremos de una línea
function highlightEndNodes(line) {
    line.startNode.unhighlight();
    line.startNode.highlight();
    line.endNode.highlight();
    drawGridPoints();
}


// Función para dibujar una línea en el canvas
function drawLine(line) {
    ctx.beginPath();
    ctx.strokeStyle = 'blue'; // Color de la línea
    ctx.lineWidth = 4; // Grosor de la línea
    ctx.moveTo(line.startNode.x, line.startNode.y);
    for (let node of line.nodes) {
        ctx.lineTo(node.x, node.y);
    }
    ctx.stroke();
}

function unhighlightNodeIfNotEnd(node) {
    for (var i = 0; i < lines.length; i++) {
        if (lines[i].startNode === node || lines[i].endNode === node) {
            return; // Si el nodo es un extremo de alguna línea, no se unhighlight
        }
    }
    node.unhighlight(); // Si no es un extremo, se unhighlight
}


// Función para limpiar el canvas
function clearCanvas() {
    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Limpiar la lista de nodos y líneas
    nodes = [];
    lines = [];

    // Llamar a la función para crear los nodos del canvas al cargar la página
    createNodes();
    // Llamar a la función para dibujar los puntos del grid
    drawGridPoints();
}

// Variables para almacenar las coordenadas de inicio del arrastre
var dragStartX = 0;
var dragStartY = 0;
var isDragging = false;

// Agregar eventos de ratón al contenedor del canvas
canvasContainer.addEventListener('mousedown', startDragging);
canvasContainer.addEventListener('mouseup', endDragging);
canvasContainer.addEventListener('mousemove', dragCanvas);

// Función para iniciar el arrastre
function startDragging(event) {
    isDragging = true;
    dragStartX = event.clientX;
    dragStartY = event.clientY;
    canvasContainer.classList.add('dragging'); // Agregar clase 'dragging'
}

// Función para finalizar el arrastre
function endDragging() {
    isDragging = false;
    canvasContainer.classList.remove('dragging'); // Quitar clase 'dragging'
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




// Llamar a la función para ajustar el tamaño del canvas al cargar la página
resizeCanvas();
// Llamar a la función para crear los nodos del canvas al cargar la página
createNodes();
// Llamar a la función para dibujar los puntos del grid
drawGridPoints();

