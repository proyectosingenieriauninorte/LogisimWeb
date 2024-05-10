// Importar la clase Node desde el archivo node.js
import { Node } from './node.js';
// Importar la clase Line desde el archivo line.js
import { Line, areEndsConnectedToOtherLine } from './line.js';

/* Base del canvas */

// Obtener el canvas y el contexto 2D
var canvasContainer = document.getElementById('canvasContainer');
var canvas = document.getElementById("gridCanvas");
var ctx = canvas.getContext("2d");

// Tamaño del grid y tamaño del punto
var gridSize = 20;
var defaultPointSize = 0.5;

// Función para crear los nodos base del canvas
function initCanvas() {
    for (var x = 0; x <= canvas.width; x += gridSize) {
        for (var y = 0; y <= canvas.height; y += gridSize) {
            ctx.beginPath();
            ctx.arc(x, y, defaultPointSize, 0, 2 * Math.PI);
            ctx.fillStyle = 'black'; // Color del nodo según su estado
            ctx.fill();
            ctx.closePath();
        }
    }
}


/* Redimensionamiento del canvas */

// Llamar a la función para ajustar el tamaño del canvas cuando la ventana se redimensione
window.addEventListener("resize", resizeCanvas);

// Función para ajustar el tamaño del canvas al tamaño de la pantalla
function resizeCanvas() {
    var containerWidth = canvasContainer.clientWidth; // Resta el margen del ancho del contenedor
    var containerHeight = canvasContainer.clientHeight; // Resta el margen del alto del contenedor
    canvas.width = containerWidth * 2;
    canvas.height = containerHeight * 2;
    initCanvas();
}


/* Limpieza del canvas */

// Obtener el botón de limpiar
var clearButton = document.getElementById('clearButton');

// Agregar evento de clic al botón de limpiar
clearButton.addEventListener('click', clearCanvas);

// Función para limpiar el canvas
function clearCanvas() {
    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Llamar a la función para crear los nodos del canvas al cargar la página
    initCanvas();
}

/* Utilidad para arrastrar el canvas */

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

/*Calculo de posición del mouse en el canvas*/

// Función para obtener la posición del mouse en el canvas
// Esta función te va a devolver un indice X y Y del punto mas cercano al mouse en el canvas cuando haces click, para convertirlo en
// cordenadas de el punto en el grid solo multiplica por 20 la cordenada que te devuelva la función y en ese pixel se encontrara el punto
// te dejo un ejemplo de como usar los indices que te devuelve la función en drawPoint(x, y) para dibujar un punto en el grid
function getMousePos(event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: Math.round((event.clientX - rect.left)/20),
        y: Math.round((event.clientY - rect.top)/20)
    };
}

// Obtener la posición del mouse dentro del canvas on click
canvas.addEventListener('click', function(event) {
    var pos = getMousePos(event);
    // drawPoint(pos.x, pos.y); //DESCOMENTAR ESTA LINEA PARA VER EL PUNTO EN EL GRID
});

// Ejemplo de localización de un punto en el grid
function drawPoint(x, y) {
    ctx.beginPath();
    ctx.arc(x*20, y*20, defaultPointSize*4, 0, 2 * Math.PI);
    ctx.fillStyle = 'red'; // Color del nodo según su estado
    ctx.fill();
    ctx.closePath();
}

// Cambio de modo de click

// Obtener botones y darles sus respectivos eventos
const btn_wire = document.getElementById('btn_wire')
btn_wire.addEventListener('click', () => changeMode('wire'))

const btn_hand = document.getElementById('btn_hand')
btn_hand.addEventListener('click', () => changeMode('hand'))

// Funcion que cambia el modo de click
function changeMode(mode) {
    document.getElementById('btn_wire').classList.remove('select')
    document.getElementById('btn_hand').classList.remove('select')

    switch (mode) {
        case 'wire':
            document.getElementById('btn_wire').classList.add('select')
            canvasContainer.style.cursor = 'crosshair'
            canvasContainer.removeEventListener('mousedown', startDragging);
            canvasContainer.removeEventListener('mouseup', endDragging);
            canvasContainer.removeEventListener('mousemove', dragCanvas);
            break;
        case 'hand':
            document.getElementById('btn_hand').classList.add('select')
            canvasContainer.style.cursor = 'grab'
            canvasContainer.addEventListener('mousedown', startDragging);
            canvasContainer.addEventListener('mouseup', endDragging);
            canvasContainer.addEventListener('mousemove', dragCanvas);
            break;
    }
}

/* Inicialización */
resizeCanvas();
changeMode('wire')




///////////////////////////////////////////////Refactor Canvas.js///////////////////////////////////////////////

// var selectedNode = null; // Nodo seleccionado

// // Agregar evento de clic al canvas para manejar la creación de líneas
// canvas.addEventListener('click', handleCanvasClick);



// // Dibujar los puntos en los vértices del grid
// function drawGridPoints() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas antes de redibujar
//     lines.forEach(line => drawLine(line)); // Dibujar cada línea
//     nodes.forEach(node => node.draw(ctx)); // Dibujar cada nodo
// }

// // Función para manejar el clic del mouse en el canvas
// function handleCanvasClick(event) {
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







