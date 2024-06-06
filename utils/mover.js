import { Circuit } from "../canvas.js";

const handleSize = 6;

export function getRectAt(x, y, objects) {
    return objects.find(object =>
        x >= object.point.x - (object.width/2) && x <= object.point.x + (object.width/2) &&
        y >= object.point.y - (object.height/2) && y <= object.point.y + (object.height/2)
    );
}

export function getPinAt(x, y, objects) {
    return objects.find(object =>
        x >= object.point.x - 5 && x <= object.point.x + 5 &&
        y >= object.point.y - 5 && y <= object.point.y + 5
    );
}

export function drawComponents(objects, selectedObjects, ctx, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let object of objects) {
        if (selectedObjects.includes(object)) {
            let selectorBox = new SelectionBox(object.point.x, object.point.y, object.width, object.height);
            drawBoxHandles(ctx, selectorBox);
        }
        else{
            for (let object of objects) {
                removeBoxHandles(ctx, object);
            }
        }
    }
}

export function drawPins(objects, selectedObjects, ctx, canvas) {
    for (let object of objects) {
        if (selectedObjects.includes(object)) {
            drawPinHandles(ctx, object);
        }
    }
}

export function roundToGrid(value, gridSize) {
    return Math.round(value / gridSize) * gridSize;
}

function drawPinHandles(ctx, object) {
    // Draw circle around pin
    ctx.arc(object.point.x, object.point.y, handleSize, 0, 5 * Math.PI);
    ctx.stroke();
}



function drawBoxHandles(ctx, object) {
    ctx.fillStyle = 'black';
    ctx.fillRect(object.x - handleSize / 2, object.y - handleSize / 2, handleSize, handleSize);
    ctx.fillRect(object.x + object.width - handleSize / 2, object.y - handleSize / 2, handleSize, handleSize);
    ctx.fillRect(object.x - handleSize / 2, object.y + object.height - handleSize / 2, handleSize, handleSize);
    ctx.fillRect(object.x + object.width - handleSize / 2, object.y + object.height - handleSize / 2, handleSize, handleSize);
}

function removeBoxHandles(ctx, object) {
    ctx.clearRect(object.x - handleSize / 2, object.y - handleSize / 2, handleSize, handleSize);
    ctx.clearRect(object.x + object.width - handleSize / 2, object.y - handleSize / 2, handleSize, handleSize);
    ctx.clearRect(object.x - handleSize / 2, object.y + object.height - handleSize / 2, handleSize, handleSize);
    ctx.clearRect(object.x + object.width - handleSize / 2, object.y + object.height - handleSize / 2, handleSize, handleSize);
}

class SelectionBox{
    x;
    y;
    width;
    height;
    constructor(x, y, width, height){
        this.x = x - (width/2) - 5;
        this.y = y - (height/2) - 5;
        this.width = width+10;
        this.height = height+10;
    }
}