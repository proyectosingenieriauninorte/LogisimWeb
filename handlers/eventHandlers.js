import { eventHandlers,
    removeEventListenersWithParam,
    addEventListenerWithParam,
    addEventListenerWithDelete,
    removeEventListenersWithDelete,
    addEventListenerWithGate,
    removeEventListenersWithGate } from "../modes/modes.js";
export function setMode(mode) {
    const canvasContainer = document.getElementById('canvasContainer');

    // Remove all generic event listeners
    Object.keys(eventHandlers).forEach(key => {
        Object.entries(eventHandlers[key].add).forEach(([event, handler]) => {
            canvasContainer.removeEventListener(event, handler);
        });
        Object.entries(eventHandlers[key].remove).forEach(([event, handler]) => {
            if (handler) {
                canvasContainer.removeEventListener(event, handler);
            }
        });
    });

    // Remove all handleClickPin listeners with parameters
    removeEventListenersWithParam();
    // Remove all handleClickDelete listeners
    removeEventListenersWithDelete();
    // Remove all handleClickGate listeners
    removeEventListenersWithGate();

    // Add new event listeners for the selected mode
    Object.entries(eventHandlers[mode].add).forEach(([event, handler]) => {
        if (handler) {
            canvasContainer.addEventListener(event, handler);
        }
    });

    // Add specific handleClickPin listener with parameter if needed
    if (mode === 'constan01Mode') {
        addEventListenerWithParam('mousemove','click', "1");
    } else if (mode === 'constan00Mode') {
        addEventListenerWithParam('mousemove','click', "0");
    } else if (mode === 'probeMode') {
        addEventListenerWithParam('mousemove','click', "-1");
    }
    // Add handleClickDelete listener if needed
    if (mode === 'deleteMode') {
        addEventListenerWithDelete('click');
    }
    // Add handleClickGate listener if needed
    if (mode === 'andMode') {
        addEventListenerWithGate('click',"and");
    }
}
