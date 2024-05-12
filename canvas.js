// Importar la clase Node desde el archivo node.js
import { Node } from './node.js'
// Importar la clase Line desde el archivo line.js
import { Line, areEndsConnectedToOtherLine } from './line.js'
import {
    addIntermediatePoint,
    approximateCoordinates,
    drawLine    
} from './drawer.js'

/* Base del canvas */

function $(selector) {
    return document.querySelector(selector)
}

// Obtener el canvas y el contexto 2D
var canvas = document.getElementById('gridCanvas')
var ctx = canvas.getContext('2d')

// Tamaño del grid y tamaño del punto
var gridSize = 20
var defaultPointSize = 0.5

// Función para crear los nodos base del canvas
function initCanvas() {
    for (var x = 0; x <= canvas.width; x += gridSize) {
        for (var y = 0; y <= canvas.height; y += gridSize) {
            ctx.beginPath()
            ctx.arc(x, y, defaultPointSize, 0, 2 * Math.PI)
            ctx.fillStyle = 'black' // Color del nodo según su estado
            ctx.fill()
            ctx.closePath()
        }
    }    
}

/* Redimensionamiento del canvas */

// Llamar a la función para ajustar el tamaño del canvas cuando la ventana se redimensione
window.addEventListener('resize', resizeCanvas)

// Función para ajustar el tamaño del canvas al tamaño de la pantalla
function resizeCanvas() {
    var canvasContainer = document.getElementById('canvasContainer')
    var containerWidth = canvasContainer.clientWidth // Resta el margen del ancho del contenedor
    var containerHeight = canvasContainer.clientHeight // Resta el margen del alto del contenedor
    canvas.width = containerWidth * 2
    canvas.height = containerHeight * 2
    initCanvas()
}

/* Limpieza del canvas */

// Obtener el botón de limpiar
var clearButton = document.getElementById('clearButton')

// Agregar evento de clic al botón de limpiar
clearButton.addEventListener('click', clearCanvas)

// Función para limpiar el canvas
function clearCanvas() {
    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Limpiar la lista de líneas
    lines = []

    // Llamar a la función para crear los nodos del canvas al cargar la página
    initCanvas()
}

// /* Utilidad para arrastrar el canvas */

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

/* Utilidad para dibujar en el canvas */

// Estado del dibujo
var isDrawing = false

// variables para dibujar el cable
let initialPosition = { x: 0, y: 0 }
let finalPosition = { x: 0, y: 0 }
let lines = []

// Función para iniciar el dibujo
function startDrawing(event) {
    //dragStartX = event.clientX
    //dragStartY = event.clientY
    canvasContainer.classList.add('dragging') // Agregar clase 'dragging'
    
    const coordinates = approximateCoordinates(gridSize, getMousePos(event))
    initialPosition = coordinates
    //finalPosition = coordinates
    isDrawing = true
}

// Función para finalizar el dibujo
function endDrawing() {
    // Establecer la posición final de la línea y detener el dibujo
    const coordinates = approximateCoordinates(gridSize, getMousePos(event))
    finalPosition = coordinates
    isDrawing = false

    // Agregar la línea actual a la lista de líneas
    lines.push({ start: initialPosition, end: finalPosition })

    // Dibujar la línea actualizada
    drawLine(ctx, addIntermediatePoint(initialPosition, finalPosition))
}

// Función para arrastrar el canvas
function drawCanvas(event) {
    if (isDrawing) {
    
        const coordinates = approximateCoordinates(gridSize, getMousePos(event))
        finalPosition = coordinates

        // Limpiar el canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Volver a dibujar los nodos base del canvas
        initCanvas()

        // Dibujar todas las líneas
        drawAllLines()

        // Dibujar la línea actualizada
        drawLine(ctx, addIntermediatePoint(initialPosition, finalPosition))
    }
}

// Función para dibujar todas las líneas almacenadas en la lista de líneas
function drawAllLines() {
    lines.forEach(line => drawLine(ctx, addIntermediatePoint(line.start, line.end)))
}

// Agregar eventos de ratón al contenedor del canvas
canvasContainer.addEventListener('mousedown', startDrawing)
canvasContainer.addEventListener('mouseup', endDrawing)
canvasContainer.addEventListener('mousemove', drawCanvas)

/*Calculo de posición del mouse en el canvas*/

// Función para obtener la posición del mouse en el canvas
// Esta función te va a devolver un indice X y Y del punto mas cercano al mouse en el canvas cuando haces click, para convertirlo en
// cordenadas de el punto en el grid solo multiplica por 20 la cordenada que te devuelva la función y en ese pixel se encontrara el punto
// te dejo un ejemplo de como usar los indices que te devuelve la función en drawPoint(x, y) para dibujar un punto en el grid
function getMousePos(event) {
    var rect = canvas.getBoundingClientRect()
    return {
        x: Math.round(event.clientX - rect.left),
        y: Math.round(event.clientY - rect.top)
    }
}

// Obtener la posición del mouse dentro del canvas on click
canvas.addEventListener('click', function (event) {
    var pos = getMousePos(event)
    // drawPoint(pos.x, pos.y); DESCOMENTAR ESTA LINEA PARA VER EL PUNTO EN EL GRID
    console.log(pos)
})


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
            console.log("Modo wire")
            canvasContainer.removeEventListener('mousedown', startDragging);
            canvasContainer.removeEventListener('mouseup', endDragging);
            canvasContainer.removeEventListener('mousemove', dragCanvas);
            canvasContainer.addEventListener('mousedown', startDrawing);
            canvasContainer.addEventListener('mouseup', endDrawing);
            canvasContainer.addEventListener('mousemove', drawCanvas);

            break;
        case 'hand':
            document.getElementById('btn_hand').classList.add('select')
            canvasContainer.style.cursor = 'grab'
            canvasContainer.removeEventListener('mousedown', startDrawing);
            canvasContainer.removeEventListener('mouseup', endDrawing);
            canvasContainer.removeEventListener('mousemove', drawCanvas);
            canvasContainer.addEventListener('mousedown', startDragging);
            canvasContainer.addEventListener('mouseup', endDragging);
            canvasContainer.addEventListener('mousemove', dragCanvas);
            break;
    }
}

/* Inicialización del canvas */
resizeCanvas()
changeMode('wire')







