import { eventHandlers } from "../modes/modes.js";
export function setMode(mode) {
    const canvasContainer = document.getElementById('canvasContainer');
    
    // Remove all event listeners for each mode
    Object.keys(eventHandlers).forEach(key => {
        Object.entries(eventHandlers[key].remove).forEach(([event, handler]) => {
            canvasContainer.removeEventListener(event, handler);
        });
    });

    // Add event listeners for the selected mode
    Object.entries(eventHandlers[mode].add).forEach(([event, handler]) => {
        canvasContainer.addEventListener(event, handler);
    });
}
