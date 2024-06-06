import Pin from '../components/Pin.js';
import Point from '../components/Point.js';
import Wire from '../components/Wire.js';
import And from '../components/And.js';
import Or from '../components/Or.js';
import { getMousePos } from '../utils/util.js';
import Circuit from '../canvas.js';
import { approximateCoordinates, drawPin, drawGate } from '../utils/drawer.js';
import { gridSize } from '../config/config.js';
import Not from '../components/Not.js';
import { ctxFront } from '../src/canvas/canvasSetup.js';

/* Modo para eliminar componentes */
export function handleClickDelete(event) {
	// var rect = canvas.getBoundingClientRect();
	// var mouseX = event.clientX - rect.left;
	// var mouseY = event.clientY - rect.top;
	// clickedPoint = approximateCoordinates(mouseX, mouseY);
	var coordinates = approximateCoordinates(gridSize, getMousePos(event));
	var clickedPoint = new Point(coordinates.x, coordinates.y);
	let comp = Circuit.getConnectedComponent(clickedPoint);
	if (comp) {
		if (comp instanceof Wire) {
			Circuit.Wires = Circuit.Wires.filter((wire) => wire != comp);
		} else {
			if (comp instanceof Pin && comp.parent) comp = comp.parent;

			Circuit.Components = Circuit.Components.filter((cp) => cp != comp);
		}

		comp.deleteAllConnections();
		Circuit.repaintCircuit();
	}
}

/* Modo para agregar pines */
// Variable para almacenar el último pin creado
let currentPin = null;

// Variable para almacenar el listener de mousedown
let mousedownListener = null;

export function handleClickPin(event, temp_const) {
    // Obtener las coordenadas del ratón y el punto aproximado en la cuadrícula
    var coordinates = approximateCoordinates(gridSize, getMousePos(event));
    var clickedPoint = new Point(coordinates.x, coordinates.y);
    let pin = null;

    if (temp_const == -1) {
        pin = new Pin(clickedPoint, 'in');
    } else {
        pin = new Pin(clickedPoint, 'out', temp_const);
    }
	
    // Limpiar el canvas
    ctxFront.clearRect(0, 0, canvasFront.width, canvasFront.height);
    drawPin(pin, ctxFront);

    // Guardar el pin actual
    currentPin = pin;

    // Remover el listener de mousedown anterior si existe
	if (mousedownListener) {
		canvasContainer.removeEventListener('mousedown', mousedownListener);
	}

    // Crear un nuevo listener de mousedown
    mousedownListener = () => {
    
		let wire = Circuit.getConnectedComponent(pin.point);

        if (wire) {
            if (pin.type == 'in') {
                wire.addOutput(pin);
            } else if (pin.type == 'out') {
                wire.addInput(pin);
            }

            pin.addConnection(wire);
        }

        Circuit.Components.push(pin);
        Circuit.repaintCircuit();
        

        // Limpiar el pin actual después de añadirlo
        currentPin = null;
    };

    // Agregar el nuevo listener de mousedown
    canvasContainer.addEventListener('mousedown', mousedownListener);
}


/* Modo para agregar puertas */
let currentGate = null;

// Variable para almacenar el listener de mousedown
let gateMousedownListener = null;

export function handleClickGate(event, gate_type) {
    // Obtener las coordenadas del ratón y el punto aproximado en la cuadrícula
    var coordinates = approximateCoordinates(gridSize, getMousePos(event));
    var clickedPoint = new Point(coordinates.x, coordinates.y);

    let gate = null;
    switch (gate_type) {
      case 'and':
        gate = new And(clickedPoint);
        break;
      case 'or':
        gate = new Or(clickedPoint);
        break;
      case 'not':
        gate = new Not(clickedPoint);
        break;
    }

    // Limpiar el canvas
    ctxFront.clearRect(0, 0, canvasFront.width, canvasFront.height);
    drawGate(gate, ctxFront);  // Supongamos que tienes una función para dibujar la puerta

    // Guardar la puerta actual
    currentGate = gate;

    // Remover el listener de mousedown anterior si existe
    if (gateMousedownListener) {
	
        canvasContainer.removeEventListener('mousedown', gateMousedownListener);
    }

    // Crear un nuevo listener de mousedown
    gateMousedownListener = () => {
    
		gate.inputs.forEach((pin) => {
            let wire = Circuit.getConnectedComponent(pin.point);
            if (wire) {
                wire.addOutput(pin);
                pin.addConnection(wire);
            }
        });
        gate.outputs.forEach((pin) => {
            let wire = Circuit.getConnectedComponent(pin.point);
            if (wire) {
                wire.addInput(pin);
                pin.addConnection(wire);
            }
        });

        Circuit.Components.push(gate);
        Circuit.repaintCircuit();
    

        // Limpiar la puerta actual después de añadirla
        currentGate = null;
    };

    // Agregar el nuevo listener de mousedown
    canvasContainer.addEventListener('mousedown', gateMousedownListener);
}
