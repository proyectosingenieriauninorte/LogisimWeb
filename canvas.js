// Importar la clase Node desde el archivo node.js
import { Node } from './node.js'
// Importar la clase Line desde el archivo line.js
import { Line, areEndsConnectedToOtherLine } from './line.js'
import {
    addIntermediatePoint,
    approximateCoordinates,
    calculateMovementType,
    compareCoordinates,
    drawLine
} from './drawer.js'
import { getMousePos } from './util.js'

/* Base del canvas */

function $(selector) {
    return document.querySelector(selector)
}

/* Obtener el canvas y el contexto 2D*/

//Canvas delantero
var canvasFront = document.getElementById('canvasFront')
var ctxFront = canvasFront.getContext('2d')

//Canvas trasero
var canvasBack = document.getElementById('canvasBack')
var ctxBack = canvasBack.getContext('2d')

// Tamaño del grid y tamaño del punto
var gridSize = 20
var defaultPointSize = 0.5

// Función para crear los nodos base del canvas
function initCanvas(ctx) {
    for (var x = 0; x <= canvasBack.width; x += gridSize) {
        for (var y = 0; y <= canvasBack.height; y += gridSize) {
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
    canvasBack.width = containerWidth * 2
    canvasBack.height = containerHeight * 2
    canvasFront.width = containerWidth * 2
    canvasFront.height = containerHeight * 2
    initCanvas(ctxBack)
    initCanvas(ctxFront)
}

/* Limpieza del canvas */

// Obtener el botón de limpiar
var clearButton = document.getElementById('clearButton')

// Agregar evento de clic al botón de limpiar
clearButton.addEventListener('click', clearCanvas)

// Función para limpiar el canvas
function clearCanvas() {
    // Limpiar el canvas
    ctxBack.clearRect(0, 0, canvasBack.width, canvasBack.height)
    ctxFront.clearRect(0, 0, canvasFront.width, canvasFront.height)

    // Limpiar la lista de líneas
    lines = []

    // Llamar a la función para crear los nodos del canvas al cargar la página
    initCanvas(ctxBack)
    initCanvas(ctxFront)
}

// /* Utilidad para arrastrar el canvas */

// Variables para almacenar las coordenadas de inicio del arrastre
var dragStartX = 0
var dragStartY = 0
var isDragging = false

// Función para iniciar el arrastre
function startDragging(event) {
    isDragging = true
    dragStartX = event.clientX
    dragStartY = event.clientY
}

// Función para finalizar el arrastre
function endDragging() {
    isDragging = false
}

// Función para arrastrar el canvas
function dragCanvas(event) {
    if (isDragging) {
        var offsetX = event.clientX - dragStartX
        var offsetY = event.clientY - dragStartY
        canvasContainer.scrollLeft -= offsetX
        canvasContainer.scrollTop -= offsetY
        dragStartX = event.clientX
        dragStartY = event.clientY
    }
}

/* Utilidad para dibujar en el canvas */

// Estado del dibujo
var isDrawing = false

// variables para dibujar el cable
let initialPosition = { x: 0, y: 0 }
let finalPosition = { x: 0, y: 0 }
let positions = []
let lines = []
let debug = []
let desviation = false

// Función para iniciar el dibujo
function startDrawing(event) {
    //dragStartX = event.clientX
    //dragStartY = event.clientY
    canvasContainer.classList.add('dragging') // Agregar clase 'dragging'

    const coordinates = approximateCoordinates(gridSize, getMousePos(event))
    initialPosition = coordinates
    positions.push(initialPosition)
    //finalPosition = coordinates
    isDrawing = true
}

// Función para finalizar el dibujo
function endDrawing() {
    // Establecer la posición final de la línea y detener el dibujo
    const coordinates = approximateCoordinates(gridSize, getMousePos(event))
    finalPosition = coordinates
    positions.push(finalPosition)
    isDrawing = false

    // debug part
    const fiveFirst = debug.slice(0, 4)
    console.log(fiveFirst)

    const average = fiveFirst.reduce(
        (acc, curr) => {
            acc.x += curr.diff.x
            acc.y += curr.diff.y
            return acc
        },
        { x: 0, y: 0 }
    )

    if (
        (average.x < 0 && average.y >= 0) ||
        (average.x > 0 && average.y <= 0) ||
        (average.x < 0 && average.y < 0)
    ) {
        desviation = true
    }

    console.log(average, 's')

    // Agregar la línea actual a la lista de líneas
    lines.push({ start: initialPosition, end: finalPosition, desviation })

    // Dibujar la línea actualizada
    //drawLine(ctxBack, addIntermediatePoint(initialPosition, finalPosition))

    drawAllLines()
    // console.log(debug)
    debug = []
    desviation = false
}

// Función para arrastrar el canvas
function drawCanvas(event) {
    if (isDrawing) {
        const coordinates = approximateCoordinates(gridSize, getMousePos(event))
        finalPosition = coordinates

        if (
            !compareCoordinates(positions[positions.length - 1], finalPosition)
        ) {
            positions.push(finalPosition)

            debug.push({
                finalPosition,
                initialPosition: positions[positions.length - 2],
                diff: calculateMovementType(
                    positions[positions.length - 2],
                    finalPosition
                )
            })
        }
        //Limpiar el canvas
        ctxFront.clearRect(0, 0, canvasFront.width, canvasFront.height)

        // Volver a dibujar los nodos base del canvas
        //initCanvas()

        // Dibujar todas las líneas
        //drawAllLines()

        // debug part
        const fiveFirst = debug.slice(0, 4)
        // console.log(fiveFirst)

        const average = fiveFirst.reduce(
            (acc, curr) => {
                acc.x += curr.diff.x
                acc.y += curr.diff.y
                return acc
            },
            { x: 0, y: 0 }
        )
        let aprox
        if (
            (average.x < 0 && average.y >= 0) ||
            (average.x > 0 && average.y <= 0) ||
            (average.x < 0 && average.y < 0)
        ) {
            aprox = true
        }

        // Dibujar la línea actualizada
        drawLine(
            ctxFront,
            addIntermediatePoint(initialPosition, finalPosition, aprox)
        )
    }
}

// Función para dibujar todas las líneas almacenadas en la lista de líneas
function drawAllLines() {
    lines.forEach((line) =>
        drawLine(
            ctxBack,
            addIntermediatePoint(line.start, line.end, line.desviation)
        )
    )
}

// Agregar eventos de ratón al contenedor del canvas
canvasContainer.addEventListener('mousedown', startDrawing)
canvasContainer.addEventListener('mouseup', endDrawing)
canvasContainer.addEventListener('mousemove', drawCanvas)

// Obtener la posición del mouse dentro del canvas on click
canvasBack.addEventListener('click', function (event) {
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
            console.log('Modo wire')
            canvasContainer.removeEventListener('mousedown', startDragging)
            canvasContainer.removeEventListener('mouseup', endDragging)
            canvasContainer.removeEventListener('mousemove', dragCanvas)
            canvasContainer.addEventListener('mousedown', startDrawing)
            canvasContainer.addEventListener('mouseup', endDrawing)
            canvasContainer.addEventListener('mousemove', drawCanvas)

            break
        case 'hand':
            document.getElementById('btn_hand').classList.add('select')
            canvasContainer.style.cursor = 'grab'
            canvasContainer.removeEventListener('mousedown', startDrawing)
            canvasContainer.removeEventListener('mouseup', endDrawing)
            canvasContainer.removeEventListener('mousemove', drawCanvas)
            canvasContainer.addEventListener('mousedown', startDragging)
            canvasContainer.addEventListener('mouseup', endDragging)
            canvasContainer.addEventListener('mousemove', dragCanvas)
            break
    }
}

/* Inicialización del canvas */
resizeCanvas()
changeMode('wire')
