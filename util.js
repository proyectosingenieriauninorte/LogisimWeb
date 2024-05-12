/*Calculo de posición del mouse en el canvas*/

// Función para obtener la posición del mouse en el canvas
// Esta función te va a devolver un indice X y Y del punto mas cercano al mouse en el canvas cuando haces click, para convertirlo en
// cordenadas de el punto en el grid solo multiplica por 20 la cordenada que te devuelva la función y en ese pixel se encontrara el punto
// te dejo un ejemplo de como usar los indices que te devuelve la función en drawPoint(x, y) para dibujar un punto en el grid
export function getMousePos(event) {
    var rect = canvasFront.getBoundingClientRect()
    return {
        x: Math.round(event.clientX - rect.left),
        y: Math.round(event.clientY - rect.top)
    }
}
