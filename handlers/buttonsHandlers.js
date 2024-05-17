import {startDrawing,endDrawing,drawCanvas} from "../modes/drawing.js"
import {startDragging,endDragging,dragCanvas} from "../modes/dragging.js"


export function wireMode(){
    canvasContainer.removeEventListener('mousedown', startDragging)
    canvasContainer.removeEventListener('mouseup', endDragging)
    canvasContainer.removeEventListener('mousemove', dragCanvas)
    canvasContainer.addEventListener('mousedown', startDrawing)
    canvasContainer.addEventListener('mouseup', endDrawing)
    canvasContainer.addEventListener('mousemove', drawCanvas)
}

export function handMode(){
    canvasContainer.removeEventListener('mousedown', startDrawing)
    canvasContainer.removeEventListener('mouseup', endDrawing)
    canvasContainer.removeEventListener('mousemove', drawCanvas)
    canvasContainer.addEventListener('mousedown', startDragging)
    canvasContainer.addEventListener('mouseup', endDragging)
    canvasContainer.addEventListener('mousemove', dragCanvas)
}

function getPosition(){
    // Obtener la posición del mouse dentro del canvas on click
    canvasBack.addEventListener('click', function (event) {
        var pos = getMousePos(event)
})
}