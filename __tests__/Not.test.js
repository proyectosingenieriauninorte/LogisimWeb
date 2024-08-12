import Not from '../components/Not.js';
import Point from '../components/Point.js';

describe('NOT Gate Tests', () => {
    test('should return 0 when input is 1', () => {
        const point = new Point(100, 100);
        const notGate = new Not(point);

        notGate.inputs[0].setValue('1');
        notGate.updateValue();

        expect(notGate.getValue()).toBe('0');
    });

    test('should return 1 when input is 0', () => {
        const point = new Point(100, 100);
        const notGate = new Not(point);

        notGate.inputs[0].setValue('0');
        notGate.updateValue();

        expect(notGate.getValue()).toBe('1');
    });

    test('should return E if input is E', () => {
        const point = new Point(100, 100);
        const notGate = new Not(point);

        notGate.inputs[0].setValue('E');
        notGate.updateValue();

        expect(notGate.getValue()).toBe('E');
    });

    test('should return D when input is D', () => {
        const point = new Point(100, 100);
        const notGate = new Not(point);

        notGate.inputs[0].setValue('D');
        notGate.updateValue();

        expect(notGate.getValue()).toBe('D');
    });
});
