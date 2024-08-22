
import { gridSize } from "../config/config.js"


/*Calculo de posición del mouse en el canvas*/

// Función para obtener la posición del mouse en el canvas
// Esta función te va a devolver un indice X y Y del punto mas cercano al mouse en el canvas cuando haces click, para convertirlo en
// cordenadas de el punto en el grid solo multiplica por 20 la cordenada que te devuelva la función y en ese pixel se encontrara el punto
export function getMousePos(event) {
    var rect = canvasBack.getBoundingClientRect()
    return {
        x: Math.round(event.clientX - rect.left),
        y: Math.round(event.clientY - rect.top)
    }
}

// Funcion para traducir un punto del mouse en uno del grid del canvas
export function getPointGrid(mouseX, mouseY, Point) {
	return new Point(
		Math.round(mouseX / gridSize),
		Math.round(mouseY / gridSize)
	);
}