import Or from '../components/Or.js';
import Point from '../components/Point.js';

describe('OR Gate Tests', () => {
    test('should return 1 when any input is 1', () => {
        const point = new Point(100, 100);
        const orGate = new Or(point, 2);

        orGate.inputs[0].setValue('1');
        orGate.inputs[1].setValue('0');
        orGate.updateValue();

        expect(orGate.getValue()).toBe('1');
    });

    test('should return 0 when all inputs are 0', () => {
        const point = new Point(100, 100);
        const orGate = new Or(point, 2);

        orGate.inputs[0].setValue('0');
        orGate.inputs[1].setValue('0');
        orGate.updateValue();

        expect(orGate.getValue()).toBe('0');
    });

    test('should return E if any input is E', () => {
        const point = new Point(100, 100);
        const orGate = new Or(point, 2);

        orGate.inputs[0].setValue('0');
        orGate.inputs[1].setValue('E');
        orGate.updateValue();

        expect(orGate.getValue()).toBe('E');
    });

    test('should return D when all inputs are D', () => {
        const point = new Point(100, 100);
        const orGate = new Or(point, 2);

        orGate.inputs[0].setValue('D');
        orGate.inputs[1].setValue('D');
        orGate.updateValue();

        expect(orGate.getValue()).toBe('D');
    });

    test('should handle 3 inputs correctly', () => {
        const point = new Point(100, 100);
        const orGate = new Or(point, 3);

        orGate.inputs[0].setValue('0');
        orGate.inputs[1].setValue('0');
        orGate.inputs[2].setValue('1');
        orGate.updateValue();

        expect(orGate.getValue()).toBe('1');

        orGate.inputs[2].setValue('0');
        orGate.updateValue();

        expect(orGate.getValue()).toBe('0');
    });
});
