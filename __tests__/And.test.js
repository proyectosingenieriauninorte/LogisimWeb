import And from '../components/And.js';
import Point from '../components/Point.js';

describe('AND Gate Tests', () => {
    test('should return 1 when all inputs are 1', done => {
        const point = new Point(100, 100);
        const andGate = new And(point, 2);

        andGate.inputs[0].setValue('1');
        andGate.inputs[1].setValue('1');
        
        setTimeout(() => {
            expect(andGate.getValue()).toBe('1');
            done();
        }, andGate.delay + 10);
    });

    test('should return 0 when any input is 0', done => {
        const point = new Point(100, 100);
        const andGate = new And(point, 2);

        andGate.inputs[0].setValue('1');
        andGate.inputs[1].setValue('0');
        
        setTimeout(() => {
            expect(andGate.getValue()).toBe('0');
            done();
        }, andGate.delay + 10);
    });

    test('should return E if any input is E', done => {
        const point = new Point(100, 100);
        const andGate = new And(point, 2);

        andGate.inputs[0].setValue('1');
        andGate.inputs[1].setValue('E');
        
        setTimeout(() => {
            expect(andGate.getValue()).toBe('E');
            done();
        }, andGate.delay + 10);
    });

    test('should handle delay in propagation', done => {
        const point = new Point(100, 100);
        const andGate = new And(point, 2);

        andGate.inputs[0].setValue('1');
        andGate.inputs[1].setValue('1');
        
        setTimeout(() => {
            expect(andGate.getValue()).toBe('1');
            done();
        }, andGate.delay + 10);
    });
});
