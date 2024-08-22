import { gridSize, defaultPointSize } from "../../config/config.js"

//Canvas delantero
export var canvasFront = document.getElementById('canvasFront')
export var ctxFront = canvasFront.getContext('2d')

//Canvas trasero
export var canvasBack = document.getElementById('canvasBack')
export var ctxBack = canvasBack.getContext('2d')

// Tamaño del grid y tamaño del punto
var canvasContainer = document.getElementById('canvasContainer')

export function initCanvas(ctx) {
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

export function resizeCanvas() {
    var containerWidth = canvasContainer.clientWidth // Resta el margen del ancho del contenedor
    var containerHeight = canvasContainer.clientHeight // Resta el margen del alto del contenedor
    canvasBack.width = containerWidth * 2
    canvasBack.height = containerHeight * 2
    canvasFront.width = containerWidth * 2
    canvasFront.height = containerHeight * 2
    initCanvas(ctxBack,canvasBack)
    // initCanvas(ctxFront,canvasFront)
}


export function clearCanvas() {
    // Limpiar el canvas
    ctxBack.clearRect(0, 0, canvasBack.width, canvasBack.height)
    ctxFront.clearRect(0, 0, canvasFront.width, canvasFront.height)

    // Llamar a la función para crear los nodos del canvas al cargar la página
    initCanvas(ctxBack)
    // initCanvas(ctxFront)
}

