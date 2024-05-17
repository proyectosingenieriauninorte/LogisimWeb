import { getMousePos} from "../utils/util.js"
import {
    addIntermediatePoint,
    approximateCoordinates,
    calculateMovementType,
    compareCoordinates,
    drawLine
} from '../utils/drawer.js'
import { gridSize, defaultPointSize } from "../config/config.js"
import { ctxBack, ctxFront,canvasFront } from "../src/canvasSetup.js"

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
export function startDrawing(event) {
    //dragStartX = event.clientX
    //dragStartY = event.clientY
    //canvasContainer.classList.add('dragging') // Agregar clase 'dragging'

    const coordinates = approximateCoordinates(gridSize, getMousePos(event))
    initialPosition = coordinates
    positions.push(initialPosition)
    //finalPosition = coordinates
    isDrawing = true
}

// Función para finalizar el dibujo
export function endDrawing() {
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
export function drawCanvas(event) {
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
export function drawAllLines() {
    lines.forEach((line) =>
        drawLine(
            ctxBack,
            addIntermediatePoint(line.start, line.end, line.desviation)
        )
    )
}