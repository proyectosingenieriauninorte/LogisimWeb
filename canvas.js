// Importar Funciones y clases
import { Button } from "./components/buttons.js"
import { changeMode } from './utils/util.js'
import {resizeCanvas, clearCanvas} from "./src/canvasSetup.js"


/* Inicialización del canvas */

//Inicializar canvas
resizeCanvas()

//Establcer modo cable
changeMode('wire')

// Llamar a la función para ajustar el tamaño del canvas cuando la ventana se redimensione
window.addEventListener('resize',resizeCanvas)


/* Limpieza del canvas */

// Obtener el botón de limpiar
var clearButton =  new Button('clearButton', clearCanvas)


/* Cambio de modo*/

// Obtener botones y darles sus respectivos eventos
const btn_wire = new Button('btn_wire', 'wire');
const btn_hand = new Button('btn_hand', 'hand');


