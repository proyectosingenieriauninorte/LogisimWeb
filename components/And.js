const Gate = require('./Gate');
const PinFactory = require('./PinFactory');

export class And extends Gate {
    constructor(point, entries = 2) {
        super(point, PinFactory);
        this.initializePins(point, entries);
    }

	updateValue() {
        if (this.dirty) {
            console.log('Starting updateValue for And gate');

            const result = this.inputs.reduce((prevValue, current) => {
                const currentValue = current.getValue();
                
                console.log(`Previous Value: ${prevValue}, Current Value: ${currentValue}`);

                // Handle error state "E"
                if (prevValue === 'E' || currentValue === 'E') {
                    console.log('Found "E" state, setting result to "E"');
                    return 'E';
                }

                // If any input is "0", the result should be "0"
                if (currentValue === '0') {
                    console.log('Found "0" input, setting result to "0"');
                    return '0';
                }

                // If any input is "D", return "D"
                if (currentValue === 'D') {
                    console.log('Found "D" input, returning "D"');
                    return 'D';
                }

                // Perform AND operation if both previous and current values are known (i.e., not "D")
                if (prevValue !== 'D' && currentValue !== 'D') {
                    const andResult = (parseInt(prevValue, 2) & parseInt(currentValue, 2)).toString(2);
                    console.log(`AND Result: ${andResult}`);
                    return andResult;
                }

                return prevValue;
            }, '1');  // Start with '1' since AND gate returns 1 if all inputs are 1

            console.log(`Final Result for And gate: ${result}`);
            this.setValue(result);
            this.dirty = false;  // Mark as clean after recalculating
        } else {
            console.log(`And gate is not dirty, skipping update, current value: ${this.value}`);
        }
    }
}

module.exports = And;

