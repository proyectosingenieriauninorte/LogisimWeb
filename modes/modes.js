import {
    startDrawing,
    endDrawing, drawCanvas
} from "../modes/drawing.js"
import {
    startDragging,
    endDragging,
    dragCanvas
} from "../modes/dragging.js"
import {
    handleClickPin,
    handleClickDelete,
    handleClickGate
} from "../handlers/modesHandlers.js";

import { canvasBack, canvasFront, ctxFront, ctxBack } from "../src/canvas/canvasSetup.js";

import { Circuit } from "../canvas.js";

import { openModal } from "../modal.js";

import { getRectAt, getPinAt, drawComponents, drawPins, roundToGrid } from "../utils/mover.js";

export const eventHandlers = {
    wireMode: {
        add: {
            mousedown: startDrawing,
            mouseup: endDrawing,
            mousemove: drawCanvas
        },
        remove: {
            mousedown: startDragging,
            mouseup: endDragging,
            mousemove: dragCanvas,
            click: null // Se eliminarán los listeners específicos más adelante
        }
    },
    handMode: {
        add: {
            mousedown: startDragging,
            mouseup: endDragging,
            mousemove: dragCanvas
        },
        remove: {
            mousedown: startDrawing,
            mouseup: endDrawing,
            mousemove: drawCanvas,
            click: null // Se eliminarán los listeners específicos más adelante
        }
    },
    constan01Mode: {
        add: {},
        remove: {
            mousedown: startDragging,
            mouseup: endDragging,
            mousemove: dragCanvas,
            mousedown: startDrawing,
            mousedown: handleClickGate,
            mouseup: endDrawing,
            mousemove: drawCanvas,
            click: null // Se eliminarán los listeners específicos más adelante
        }
    },
    constan00Mode: {
        add: {},
        remove: {
            mousedown: startDragging,
            mouseup: endDragging,
            mousemove: dragCanvas,
            mousedown: startDrawing,
            mousedown: handleClickGate,
            mouseup: endDrawing,
            mousemove: drawCanvas,
            click: null // Se eliminarán los listeners específicos más adelante
        }
    },
    deleteMode: {
        add: {},
        remove: {
            mousedown: startDragging,
            mouseup: endDragging,
            mousemove: dragCanvas,
            mousedown: startDrawing,
            mousedown: handleClickGate,
            mousedown: handleClickPin,
            mouseup: endDrawing,
            mousemove: drawCanvas,
            click: null // Se eliminarán los listeners específicos más adelante
        }
    },
    probeMode: {
        add: {},
        remove: {
            mousedown: startDragging,
            mouseup: endDragging,
            mousemove: dragCanvas,
            mousedown: startDrawing,
            mousedown: handleClickGate,
            mouseup: endDrawing,
            mousemove: drawCanvas,
            click: null // Se eliminarán los listeners específicos más adelante
        }
    },
    andMode: {
        add: {},
        remove: {
            mousedown: startDragging,
            mouseup: endDragging,
            mousemove: dragCanvas,
            mousedown: startDrawing,
            mousedown: handleClickPin,
            mouseup: endDrawing,
            mousemove: drawCanvas,
            click: null // Se eliminarán los listeners específicos más adelante
        }
    },
    orMode: {
        add: {},
        remove: {
            mousedown: startDragging,
            mouseup: endDragging,
            mousemove: dragCanvas,
            mousedown: startDrawing,
            mouseup: endDrawing,
            mousemove: drawCanvas,
            click: null // Se eliminarán los listeners específicos más adelante
        }
    },
    notMode: {
        add: {},
        remove: {
            mousedown: startDragging,
            mouseup: endDragging,
            mousemove: dragCanvas,
            mousedown: startDrawing,
            mouseup: endDrawing,
            mousemove: drawCanvas,
            click: null // Se eliminarán los listeners específicos más adelante
        }
    }
    ,
    mouseMode: {
        add: {},
        remove: {
            mousedown: startDragging,
            mouseup: endDragging,
            mousemove: dragCanvas,
            mousedown: startDrawing,
            mouseup: endDrawing,
            mousemove: drawCanvas,
            click: null // Se eliminarán los listeners específicos más adelante
        }
    }

};

let handleClickPinListeners = [];
let handleClickDeleteListeners = [];
let handleClickGateListeners = [];

export function addEventListenerWithParam(eventType, param) {
    const wrappedHandler = (event) => handleClickPin(event, param);
    handleClickPinListeners.push({ eventType, wrappedHandler });
    canvasContainer.addEventListener(eventType, wrappedHandler);
}


export function addEventListenerWithDelete(eventType) {
    handleClickDeleteListeners.push({ eventType, handleClickDelete });
    canvasContainer.addEventListener(eventType, handleClickDelete);
}

export function addEventListenerWithGate(eventType, param) {
    const wrappedHandler = (event) => handleClickGate(event, param);
    handleClickGateListeners.push({ eventType, wrappedHandler });
    canvasContainer.addEventListener(eventType, wrappedHandler);
}

export function addEventListenerWithMouse() {

    var selectedComponents = [];
    var selectedPins = [];
    var isDragging = false;
    var isSelecting = false;
    var selectionStart = {};
    var selectionEnd = {};
    var offsetX = 0;
    var offsetY = 0;
    let Components = Circuit.Components;
    canvasContainer.addEventListener('mousedown', (e) => {
        const rect = canvasBack.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        selectedComponents = [];
        selectedPins = [];
        let clickedComponent = getRectAt(x, y, Components);
        let clickedPin = getPinAt(x, y, Components);
        if (clickedComponent && typeof clickedComponent != 'Wire') {
            if (!selectedComponents.includes(clickedComponent)) {
                selectedComponents = [clickedComponent];
            }
            const rectIndex = Components.indexOf(clickedComponent);
            Components.push(...Components.splice(rectIndex, 1)); // Move clicked rect to front
            offsetX = x - clickedComponent.point.x;
            offsetY = y - clickedComponent.point.y;
            isDragging = true;

        } else if (clickedPin && typeof clickedPin != 'Pin') {
            if (!selectedPins.includes(clickedPin)) {
                selectedPins = [clickedPin];
            }
            const rectIndex = Components.indexOf(clickedPin);
            Components.push(...Components.splice(rectIndex, 1)); // Move clicked rect to front
            offsetX = x - clickedPin.point.x;
            offsetY = y - clickedPin.point.y;
            openModal(clickedPin, Circuit);
        } else if (isSelecting) {
            isDragging = false;
            selectionStart = { x, y };
            selectionEnd = { x, y };
            isSelecting = true;
        }
        drawComponents(Components, selectedComponents, ctxFront, canvasFront);
        drawPins(Components, selectedPins, ctxFront, canvasFront);
    });

    canvasContainer.addEventListener('mousemove', (e) => {
        const rect = canvasContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        let clickedComponent = getRectAt(x, y, Components);
        if (isDragging) {
            const newX = roundToGrid(x - offsetX, 20);
            const newY = roundToGrid(y - offsetY, 20);
            const deltaX = newX - clickedComponent.point.x;
            const deltaY = newY - clickedComponent.point.y;

            for (let object of selectedComponents) {
                object.point.x += deltaX;
                object.point.y += deltaY;

                object.inputs.forEach((pin) => {
                    pin.point.x += deltaX;
                    pin.point.y += deltaY;
                });

                object.outputs.forEach((pin) => {
                    pin.point.x += deltaX;
                    pin.point.y += deltaY;
                });
            }

        } else if (isSelecting) {
            selectionEnd = { x, y };
            selectRects();
            drawComponents();
        }
        drawComponents(Components, selectedComponents, ctxFront, canvasFront);
    });

    canvasContainer.addEventListener('mouseup', () => {
        isDragging = false;
        for (let object of selectedComponents) {
            let Componente = Circuit.getComponent(object);
            Componente.deleteAllConnections();
            Componente.reconnectComponent(Circuit);
            Circuit.repaintCircuit();
        }   
    });
}

