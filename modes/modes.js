import {startDrawing,endDrawing,drawCanvas} from "../modes/drawing.js"
import {startDragging,endDragging,dragCanvas} from "../modes/dragging.js"
import { handleClickPin, handleClickDelete } from "../handlers/modesHandlers.js";

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
            click: handleClickPin
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
            click: handleClickPin
        }
    },
    constan01Mode: {
        add: {
            click: handleClickPin
        },
        remove: {
            mousedown: startDragging,
            mouseup: endDragging,
            mousemove: dragCanvas,
            mousedown: startDrawing,
            mouseup: endDrawing,
            mousemove: drawCanvas
        }
    },
    constan00Mode: {
        add: {
            click: handleClickPin
        },
        remove: {
            mousedown: startDragging,
            mouseup: endDragging,
            mousemove: dragCanvas,
            mousedown: startDrawing,
            mouseup: endDrawing,
            mousemove: drawCanvas
        }
    },
    deleteMode: {
        add: {
            click: handleClickDelete
        },
        remove: {
            mousedown: startDragging,
            mouseup: endDragging,
            mousemove: dragCanvas,
            mousedown: startDrawing,
            mouseup: endDrawing,
            mousemove: drawCanvas
        }
    },
    probeMode: {
        add: {
            click: handleClickPin
        },
        remove: {
            mousedown: startDragging,
            mouseup: endDragging,
            mousemove: dragCanvas,
            mousedown: startDrawing,
            mouseup: endDrawing,
            mousemove: drawCanvas
        }
    }
};
