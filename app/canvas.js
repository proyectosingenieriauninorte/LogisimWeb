// Importar Funciones y clases
import { Button } from "/components/buttons.js"
import { changeMode } from "/src/circuit/changemode.js";
import { resizeCanvas, clearCanvas } from "/src/canvas/canvasSetup.js"
import circuit from "/src/circuit/circuit.js";

/* Inicialización del canvas */

//Inicializar canvas
resizeCanvas()

//Establcer modo cable
changeMode('wire')

// Llamar a la función para ajustar el tamaño del canvas cuando la ventana se redimensione
window.addEventListener('resize', resizeCanvas)

// Obtener el botón de limpiar
const clearButton = document.getElementById('btn_clear')

clearButton.addEventListener("click", () => {
    Circuit.clearComponents();
    clearCanvas();
});

/* Circuito */

//Instanciar el circuito
export var Circuit = new circuit();

/* Cambio de modo de click */

// Obtener botones y darles sus respectivos eventos

//mouse
const btn_mouse = new Button('btn_mouse', 'mouse');

//dibujar cable
const btn_wire = new Button('btn_wire', 'wire');

//mover el circuito
const btn_hand = new Button('btn_hand', 'hand');

// actualizar el estado de los cables
const btn_reload = new Button("btn_reload", circuit.reloadWires);

//borrar componentes
const btn_delete = new Button("btn_delete", "delete");

//Cosntante 0
const btn_const0 = new Button("btn_const0", "const0");

//Contante 1
const btn_const1 = new Button("btn_const1", "const1");

//Probe
const btn_probe = new Button("btn_probe", "probe");

//And
const btn_and = new Button("btn_and", "and");

// Or
const btn_or = new Button("btn_or", "or");

// Not
const btn_not = new Button("btn_not", "not");

/* Inicialización */
resizeCanvas();
changeMode("wire");

//Exportar circuito 
export default Circuit;
