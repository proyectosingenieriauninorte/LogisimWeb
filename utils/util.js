
import { gridSize } from "../config/config.js"
import { setMode } from "../handlers/eventHandlers.js"

/*Calculo de posición del mouse en el canvas*/

// Función para obtener la posición del mouse en el canvas
// Esta función te va a devolver un indice X y Y del punto mas cercano al mouse en el canvas cuando haces click, para convertirlo en
// cordenadas de el punto en el grid solo multiplica por 20 la cordenada que te devuelva la función y en ese pixel se encontrara el punto
export function getMousePos(event) {
    var rect = canvasFront.getBoundingClientRect()
    return {
        x: Math.round(event.clientX - rect.left),
        y: Math.round(event.clientY - rect.top)
    }
}

var temp_const = "1";
export function changeMode(mode) {
    document.getElementById('btn_wire').classList.remove('select')
    document.getElementById('btn_hand').classList.remove('select')
    document.getElementById('btn_delete').classList.remove('select')
    document.getElementById('btn_const0').classList.remove('select')
    document.getElementById('btn_const1').classList.remove('select')
    document.getElementById('btn_probe').classList.remove('select')


    switch (mode) {
        case 'wire':
            console.log('Modo wire')
            document.getElementById('btn_wire').classList.add('select')
            canvasContainer.style.cursor = 'crosshair'
            setMode('wireMode')
            break
            
        case 'hand':
            console.log('Modo hand')
            document.getElementById('btn_hand').classList.add('select')
            canvasContainer.style.cursor = 'grab'
            setMode("handMode")
            break
        case "delete":
            console.log('Modo delete')

            btn_delete.classList.add("select");
            canvasContainer.style.cursor = "crosshair"; // Cambia el cursor
            
            //setea el modo con sus eventos
            setMode("deleteMode")
            break;
        // ¡¡TAMPOCO BORRAR!! esto tambien hace parte de lo mismo que se habla arriba
        // case "const":
        // 	btn_const.classList.add("select");
        // 	canvasContainer.style.cursor = "crosshair"; // Cambia el cursor

        // 	// Eventos del click para el modo constante
        // 	canvas.addEventListener("click", handleClickPin);
        // 	break;
        case "const0":
            console.log("Constante 0")
            btn_const0.classList.add("select");
            canvasContainer.style.cursor = "crosshair"; // Cambia el cursor
            temp_const = "0";
            
            //setea el modo con sus eventos
            setMode("constan00Mode")

            break;
        case "const1":
            console.log("Constante 1")
            btn_const1.classList.add("select");
            canvasContainer.style.cursor = "crosshair"; // Cambia el cursor
            temp_const = "1";
            
            //setea el modo con sus eventos
            setMode("constan01Mode")

            break;
        case "probe":
            btn_probe.classList.add("select");
            canvasContainer.style.cursor = "crosshair"; // Cambia el cursor
            temp_const = "-1";

            // Eventos del click para el modo constante
            canvas.addEventListener("click", handleClickPin);
            break;
        case "and":
            btn_and.classList.add("select");
            canvasContainer.style.cursor = "crosshair"; // Cambia el cursor
            gate_type = "and";

            canvas.addEventListener("click", handleClickGate);
            break;
    }
}



// Funcion para traducir un punto del mouse en uno del grid del canvas
export function getPointGrid(mouseX, mouseY, Point) {
	return new Point(
		Math.round(mouseX / gridSize),
		Math.round(mouseY / gridSize)
	);
}