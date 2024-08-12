import Or from '../components/Or.js';
import Not from '../components/Not.js';
import Point from '../components/Point.js';

describe('Integration Tests Or Not', () => {
    test('OR gate outputs 1, NOT gate should invert to 0', done => {
        const point1 = new Point(100, 100);
        const point2 = new Point(200, 100);

        const orGate = new Or(point1, 2);
        const notGate = new Not(point2);

        // Conectar la salida del OR a la entrada del NOT
        notGate.inputs[0].addConnection(orGate.outputs[0]);

        // Configurar las entradas del OR gate
        orGate.inputs[0].setValue('1');
        orGate.inputs[1].setValue('0');

        // Primero, espera que el OR gate propague su valor
        orGate.updateValue();
        //console.log(`OR Gate output: ${orGate.getValue()}`);

        // Después de que OR ha actualizado su valor, actualiza el NOT gate
        notGate.updateValue();

        setTimeout(() => {
            setTimeout(() => {
                //console.log(`NOT Gate output: ${notGate.getValue()}`);
                expect(notGate.getValue()).toBe('0'); // NOT gate should invert the OR output (1) to 0
                done();
            }, notGate.delay + 10); // Espera el tiempo necesario para que NOT gate actualice su valor
        }, orGate.delay + 10); // Espera el tiempo necesario para que OR gate propague su valor
    });

    test('OR gate outputs 0, NOT gate should invert to 1', done => {
        const point1 = new Point(100, 100);
        const point2 = new Point(200, 100);

        const orGate = new Or(point1, 2);
        const notGate = new Not(point2);

        // Conectar la salida del OR a la entrada del NOT
        notGate.inputs[0].addConnection(orGate.outputs[0]);

        // Configurar las entradas del OR gate
        orGate.inputs[0].setValue('0');
        orGate.inputs[1].setValue('0');

        // Primero, espera que el OR gate propague su valor
        orGate.updateValue();
        //console.log(`OR Gate output: ${orGate.getValue()}`);

        // Después de que OR ha actualizado su valor, actualiza el NOT gate
        notGate.updateValue();

        setTimeout(() => {
            setTimeout(() => {
                //console.log(`NOT Gate output: ${notGate.getValue()}`);
                expect(notGate.getValue()).toBe('1'); // NOT gate should invert the OR output (0) to 1
                done();
            }, notGate.delay + 10); // Espera el tiempo necesario para que NOT gate actualice su valor
        }, orGate.delay + 10); // Espera el tiempo necesario para que OR gate propague su valor
    });
});
