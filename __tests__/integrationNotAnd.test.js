import And from '../components/And.js';
import Not from '../components/Not.js';
import Point from '../components/Point.js';

describe('Integration Tests Not And', () => {
    test('NOT gate outputs 0, AND gate should output 0 with a second input of 1', done => {
        const point1 = new Point(100, 100);
        const point2 = new Point(200, 100);

        const notGate = new Not(point1);
        const andGate = new And(point2, 2);

        // Conectar la salida del NOT a una de las entradas del AND
        andGate.inputs[0].addConnection(notGate.outputs[0]);

        // Configurar la entrada del NOT gate
        notGate.inputs[0].setValue('1');

        // Configurar la segunda entrada del AND gate
        andGate.inputs[1].setValue('1');

        // Primero, espera que el NOT gate propague su valor
        notGate.updateValue();
        //console.log(`NOT Gate output: ${notGate.getValue()}`);

        // Después de que NOT ha actualizado su valor, actualiza el AND gate
        andGate.updateValue();

        setTimeout(() => {
            setTimeout(() => {
                //console.log(`AND Gate output: ${andGate.getValue()}`);
                expect(andGate.getValue()).toBe('0'); // AND gate should output 0
                done();
            }, andGate.delay + 10); // Espera el tiempo necesario para que AND gate actualice su valor
        }, notGate.delay + 10); // Espera el tiempo necesario para que NOT gate propague su valor
    });

    test('NOT gate outputs 1, AND gate should output 1 with a second input of 1', done => {
        const point1 = new Point(100, 100);
        const point2 = new Point(200, 100);

        const notGate = new Not(point1);
        const andGate = new And(point2, 2);

        // Conectar la salida del NOT a una de las entradas del AND
        andGate.inputs[0].addConnection(notGate.outputs[0]);

        // Configurar la entrada del NOT gate
        notGate.inputs[0].setValue('0');

        // Configurar la segunda entrada del AND gate
        andGate.inputs[1].setValue('1');

        // Primero, espera que el NOT gate propague su valor
        notGate.updateValue();
        //console.log(`NOT Gate output: ${notGate.getValue()}`);

        // Después de que NOT ha actualizado su valor, actualiza el AND gate
        andGate.updateValue();

        setTimeout(() => {
            setTimeout(() => {
                //console.log(`AND Gate output: ${andGate.getValue()}`);
                expect(andGate.getValue()).toBe('1'); // AND gate should output 1
                done();
            }, andGate.delay + 10); // Espera el tiempo necesario para que AND gate actualice su valor
        }, notGate.delay + 10); // Espera el tiempo necesario para que NOT gate propague su valor
    });
});
