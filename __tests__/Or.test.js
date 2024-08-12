import Or from '../components/Or.js';
import Point from '../components/Point.js';

describe('OR Gate Tests', () => {
    test('should return 1 when any input is 1', done => {
        const point = new Point(100, 100);
        const orGate = new Or(point, 2);

        orGate.inputs[0].setValue('1');
        orGate.inputs[1].setValue('0');
        
        setTimeout(() => {
            expect(orGate.getValue()).toBe('1');
            done();
        }, orGate.delay + 10);
    });

    test('should return 0 when all inputs are 0', done => {
        const point = new Point(100, 100);
        const orGate = new Or(point, 2);

        orGate.inputs[0].setValue('0');
        orGate.inputs[1].setValue('0');
        
        setTimeout(() => {
            expect(orGate.getValue()).toBe('0');
            done();
        }, orGate.delay + 10);
    });

    test('should return E if any input is E', done => {
        const point = new Point(100, 100);
        const orGate = new Or(point, 2);

        orGate.inputs[0].setValue('E');
        orGate.inputs[1].setValue('0');
        
        setTimeout(() => {
            expect(orGate.getValue()).toBe('E');
            done();
        }, orGate.delay + 10);
    });

    test('should handle delay in propagation', done => {
        const point = new Point(100, 100);
        const orGate = new Or(point, 2);

        orGate.inputs[0].setValue('1');
        orGate.inputs[1].setValue('0');
        
        setTimeout(() => {
            expect(orGate.getValue()).toBe('1');
            done();
        }, orGate.delay + 10);
    });
});
