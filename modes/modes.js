import {startDrawing,
        endDrawing,drawCanvas} from "../modes/drawing.js"
import {startDragging,
        endDragging,
        dragCanvas} from "../modes/dragging.js"
import { handleClickPin,handleNotClickPin,
        handleClickDelete,
        handleClickGate } from "../handlers/modesHandlers.js";

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
            mouseup: endDrawing,
            mousemove: drawCanvas,
            click: null // Se eliminarán los listeners específicos más adelante
        }
    },
    deleteMode: {
        add: {
            click: (event) => handleClickDelete(event)
        },
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
    probeMode: {
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
    andMode: {
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

export function addEventListenerWithParam(event1, event2, param) {
    const NotwrappedHandler = (event) => handleNotClickPin(event, param);
    const wrappedHandler = (event) => handleClickPin(event, param);

    // Almacenar los eventos y sus manejadores de manera consistente
    handleClickPinListeners.push({ event: event1, handler: NotwrappedHandler });
    handleClickPinListeners.push({ event: event2, handler: wrappedHandler });

    canvasContainer.addEventListener(event1, NotwrappedHandler);
    canvasContainer.addEventListener(event2, wrappedHandler);
}

export function removeEventListenersWithParam() {
    console.log(handleClickPinListeners);
    handleClickPinListeners.forEach(({ event, handler }) => {
        console.log(event, handler);
        canvasContainer.removeEventListener(event, handler);
    });
    handleClickPinListeners = [];
}

export function addEventListenerWithDelete(eventType) {
    handleClickDeleteListeners.push({ eventType, handleClickDelete });
    canvasContainer.addEventListener(eventType, handleClickDelete);
}
    	
export function removeEventListenersWithDelete() {
    handleClickDeleteListeners.forEach(({ eventType }) => {
        canvasContainer.removeEventListener(eventType, handleClickDelete);
    });
    handleClickDeleteListeners = [];
}
export function addEventListenerWithGate(eventType,param){
    const wrappedHandler = (event) => handleClickGate(event, param);
    handleClickGateListeners.push({eventType,wrappedHandler});
    canvasContainer.addEventListener(eventType,wrappedHandler);
}
export function removeEventListenersWithGate(){
    handleClickGateListeners.forEach(({eventType,wrappedHandler})=>{
        canvasContainer.removeEventListener(eventType,wrappedHandler);
    });
    handleClickGateListeners = [];
}

