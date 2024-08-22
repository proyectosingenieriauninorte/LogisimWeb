import {
    eventHandlers,
    addEventListenerWithParam,
    addEventListenerWithDelete,
    addEventListenerWithGate,
    addEventListenerWithMouse,
} from "../modes/modes.js";
import { ctxFront } from "../src/canvas/canvasSetup.js";
export function setMode(mode) {

    ctxFront.clearRect(0, 0, canvasFront.width, canvasFront.height)
    //console.log('anTES', getAllEventListeners());
    const canvasContainer = document.getElementById('canvasContainer');


    // Remove all Listener canvas container
    removeAllEventListenersFromElement(canvasContainer)
    
    // Add new event listeners for the selected mode
    Object.entries(eventHandlers[mode].add).forEach(([event, handler]) => {
        if (handler) {
            canvasContainer.addEventListener(event, handler);
        }
    });

    // Add specific handleClickPin listener with parameter if needed
    if (mode === 'constan01Mode') {
        addEventListenerWithParam('mousemove', "1");
    } else if (mode === 'constan00Mode') {
        addEventListenerWithParam('mousemove', "0");
    } else if (mode === 'probeMode') {
        addEventListenerWithParam('mousemove',"-1");
    }
    // Add handleClickDelete listener if needed
    if (mode === 'deleteMode') {
        addEventListenerWithDelete('click');
    }
    // Add handleClickGate listener if needed
    if (mode === 'andMode') {
        addEventListenerWithGate('mousemove',"and");
    }
    if (mode === 'orMode') {
        addEventListenerWithGate('mousemove',"or");
    }
    if (mode === 'notMode') {
        addEventListenerWithGate('mousemove',"not");
    }
    if (mode === 'mouseMode') {
        addEventListenerWithMouse();
    }
    
}
