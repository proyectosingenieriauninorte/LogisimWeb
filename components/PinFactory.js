const Point = require('./Point.js');
const Pin = require('./Pin.js');

class PinFactory {
    /**
     * Creates a new Point.
     * @param {number} x - The x-coordinate of the point.
     * @param {number} y - The y-coordinate of the point.
     * @returns {Point} - A new Point instance.
     */
    static createPoint(x, y) {
        return new Point(x, y);
    }

    /**
     * Creates a new Pin.
     * @param {Point} point - The location of the pin.
     * @param {string} type - The type of pin ('in' or 'out').
     * @param {string} value - The initial value of the pin (default is 'D').
     * @param {Component} parent - The parent component this pin belongs to.
     * @returns {Pin} - A new Pin instance.
     */
    static createPin(point, type, value = "D", parent = null) {
        return new Pin(point, type, value, parent);
    }
}

module.exports = PinFactory;
