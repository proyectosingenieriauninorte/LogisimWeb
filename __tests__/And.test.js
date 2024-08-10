const And = require('../components/And');
const Point = require('../components/Point');
const Pin = require('../components/Pin');

describe('And Gate', () => {

    // test('should initialize with correct number of inputs and outputs', () => {
    //     const point = new Point(100, 100);
    //     const andGate = new And(point, 2);

    //     expect(andGate.inputs.length).toBe(2);
    //     expect(andGate.outputs.length).toBe(1);
    // });

    test('should return 1 when all inputs are 1', () => {
        const point = new Point(100, 100);
        const andGate = new And(point, 2);

        andGate.inputs[0].setValue('1');
        andGate.inputs[1].setValue('1');
        andGate.updateValue();

        expect(andGate.getValue()).toBe('1');
    });

    test('should return 0 when any input is 0', () => {
        const point = new Point(100, 100);
        const andGate = new And(point, 2);

        andGate.inputs[0].setValue('1');
        andGate.inputs[1].setValue('0');
        andGate.updateValue();

        expect(andGate.getValue()).toBe('0');
    });

    test('should return E if any input is E (error state)', () => {
        const point = new Point(100, 100);
        const andGate = new And(point, 2);

        andGate.inputs[0].setValue('1');
        andGate.inputs[1].setValue('E');
        andGate.updateValue();

        expect(andGate.getValue()).toBe('E');
    });

    test('should handle dynamic number of inputs', () => {
        const point = new Point(100, 100);
        const andGate = new And(point, 3);

        andGate.inputs[0].setValue('1');
        andGate.inputs[1].setValue('1');
        andGate.inputs[2].setValue('1');
        andGate.updateValue();

        expect(andGate.getValue()).toBe('1');

        andGate.inputs[2].setValue('0');
        andGate.updateValue();

        expect(andGate.getValue()).toBe('0');
    });
});
