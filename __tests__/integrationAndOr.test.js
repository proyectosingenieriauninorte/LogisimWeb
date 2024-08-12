import And from '../components/And.js';
import Or from '../components/Or.js';
import Point from '../components/Point.js';

describe('Integration Tests And Or', () => {
    test('AND gate outputs 1, OR gate should output 1 with a second input of 0', done => {
        const point1 = new Point(100, 100);
        const point2 = new Point(200, 100);

        const andGate = new And(point1, 2);
        const orGate = new Or(point2, 2);

        // Conectar la salida del AND a una de las entradas del OR
        orGate.inputs[0].addConnection(andGate.outputs[0]);

        // Configurar las entradas del AND gate
        andGate.inputs[0].setValue('1');
        andGate.inputs[1].setValue('1');

        // Configurar la segunda entrada del OR gate
        orGate.inputs[1].setValue('0');

        // Primero, espera que el AND gate propague su valor
        andGate.updateValue();
        //console.log(`AND Gate output: ${andGate.getValue()}`);

        // Después de que AND ha actualizado su valor, actualiza el OR gate
        orGate.updateValue();

        setTimeout(() => {
            setTimeout(() => {
                //console.log(`OR Gate output: ${orGate.getValue()}`);
                expect(orGate.getValue()).toBe('1'); // OR gate should output 1
                done();
            }, orGate.delay + 10); // Espera el tiempo necesario para que OR gate actualice su valor
        }, andGate.delay + 10); // Espera el tiempo necesario para que AND gate propague su valor
    });

    test('AND gate outputs 0, OR gate should output 1 with a second input of 1', done => {
        const point1 = new Point(100, 100);
        const point2 = new Point(200, 100);

        const andGate = new And(point1, 2);
        const orGate = new Or(point2, 2);

        // Conectar la salida del AND a una de las entradas del OR
        orGate.inputs[0].addConnection(andGate.outputs[0]);

        // Configurar las entradas del AND gate
        andGate.inputs[0].setValue('1');
        andGate.inputs[1].setValue('0');

        // Configurar la segunda entrada del OR gate
        orGate.inputs[1].setValue('1');

        // Primero, espera que el AND gate propague su valor
        andGate.updateValue();
        //console.log(`AND Gate output: ${andGate.getValue()}`);

        // Después de que AND ha actualizado su valor, actualiza el OR gate
        orGate.updateValue();

        setTimeout(() => {
            setTimeout(() => {
                //console.log(`OR Gate output: ${orGate.getValue()}`);
                expect(orGate.getValue()).toBe('1'); // OR gate should output 1 due to second input being 1
                done();
            }, orGate.delay + 10); // Espera el tiempo necesario para que OR gate actualice su valor
        }, andGate.delay + 10); // Espera el tiempo necesario para que AND gate propague su valor
    });
});
