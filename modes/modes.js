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


