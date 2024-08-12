import And from '../components/And.js';
import Point from '../components/Point.js';

describe('AND Gate Tests', () => {
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

    test('should return E if any input is E', () => {
        const point = new Point(100, 100);
        const andGate = new And(point, 2);

        andGate.inputs[0].setValue('1');
        andGate.inputs[1].setValue('E');
        andGate.updateValue();

        expect(andGate.getValue()).toBe('E');
    });

    test('should return D when all inputs are D', () => {
        const point = new Point(100, 100);
        const andGate = new And(point, 2);

        andGate.inputs[0].setValue('D');
        andGate.inputs[1].setValue('D');
        andGate.updateValue();

        expect(andGate.getValue()).toBe('D');
    });

    test('should handle 3 inputs correctly', () => {
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
