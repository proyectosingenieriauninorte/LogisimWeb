// /* Utilidad para arrastrar el canvas */

// Variables para almacenar las coordenadas de inicio del arrastre
var dragStartX = 0
var dragStartY = 0
var isDragging = false

// Función para iniciar el arrastre
export function startDragging(event) {
    isDragging = true
    dragStartX = event.clientX
    dragStartY = event.clientY
}

// Función para finalizar el arrastre
export function endDragging() {
    isDragging = false
}

// Función para arrastrar el canvas
export function dragCanvas(event) {
    if (isDragging) {
        var offsetX = event.clientX - dragStartX
        var offsetY = event.clientY - dragStartY
        canvasContainer.scrollLeft -= offsetX
        canvasContainer.scrollTop -= offsetY
        dragStartX = event.clientX
        dragStartY = event.clientY
    }
}
