import And from '../components/And.js';
import Not from '../components/Not.js';
import Point from '../components/Point.js';

describe('Integration Tests And Not', () => {
    test('AND gate outputs 1, NOT gate should invert to 0', done => {
        const point1 = new Point(100, 100);
        const point2 = new Point(200, 100);

        const andGate = new And(point1, 2);
        const notGate = new Not(point2);

        // Conectar la salida del AND a la entrada del NOT
        notGate.inputs[0].addConnection(andGate.outputs[0]);

        // Configurar las entradas del AND gate
        andGate.inputs[0].setValue('1');
        andGate.inputs[1].setValue('1');

        // Primero, espera que el AND gate propague su valor
        andGate.updateValue();

        //console.log(`AND Gate output: ${andGate.getValue()}`);
            
        // Después de que AND ha actualizado su valor, actualiza el NOT gate
        notGate.updateValue();

        setTimeout(() => {
            setTimeout(() => {
                //console.log(`NOT Gate output: ${notGate.getValue()}`);
                expect(notGate.getValue()).toBe('0'); // NOT gate should invert the AND output (1) to 0
                done();
            }, notGate.delay + 10); // Espera el tiempo necesario para que NOT gate actualice su valor
        }, andGate.delay + 10); // Espera el tiempo necesario para que AND gate propague su valor
    }); 

    test('AND gate outputs 0, NOT gate should invert to 1', done => {
        const point1 = new Point(100, 100);
        const point2 = new Point(200, 100);

        const andGate = new And(point1, 2);
        const notGate = new Not(point2);

        // Conectar la salida del AND a la entrada del NOT
        notGate.inputs[0].addConnection(andGate.outputs[0]);

        // Configurar las entradas del AND gate
        andGate.inputs[0].setValue('0');
        andGate.inputs[1].setValue('1');

        // Primero, espera que el AND gate propague su valor
        andGate.updateValue();
        //console.log(`AND Gate output: ${andGate.getValue()}`);
        notGate.updateValue();


        setTimeout(() => {
            setTimeout(() => {
                //console.log(`NOT Gate output: ${notGate.getValue()}`);
                expect(notGate.getValue()).toBe('1'); // NOT gate should invert the AND output (0) to 1
                done();
            }, notGate.delay + 10); // Espera el tiempo necesario para que NOT gate actualice su valor
        }, andGate.delay + 10); // Espera el tiempo necesario para que AND gate propague su valor
    }); 
});
