import Not from '../components/Not.js';
import Point from '../components/Point.js';

describe('NOT Gate Tests', () => {
    test('should return 0 when input is 1', done => {
        const point = new Point(100, 100);
        const notGate = new Not(point);

        notGate.inputs[0].setValue('1');
        
        setTimeout(() => {
            expect(notGate.getValue()).toBe('0');
            done();
        }, notGate.delay + 10);
    });

    test('should return 1 when input is 0', done => {
        const point = new Point(100, 100);
        const notGate = new Not(point);

        notGate.inputs[0].setValue('0');
        
        setTimeout(() => {
            expect(notGate.getValue()).toBe('1');
            done();
        }, notGate.delay + 10);
    });

    test('should return E if input is E', done => {
        const point = new Point(100, 100);
        const notGate = new Not(point);

        notGate.inputs[0].setValue('E');
        
        setTimeout(() => {
            expect(notGate.getValue()).toBe('E');
            done();
        }, notGate.delay + 10);
    });

    test('should handle delay in propagation', done => {
        const point = new Point(100, 100);
        const notGate = new Not(point);

        notGate.inputs[0].setValue('0');
        
        setTimeout(() => {
            expect(notGate.getValue()).toBe('1');
            done();
        }, notGate.delay + 10);
    });
});
