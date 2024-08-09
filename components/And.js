import Gate from './Gate.js';
import PinFactory from './PinFactory.js';

class And extends Gate {
    constructor(point, entries = 2) {
        super(point, PinFactory);
        this.initializePins(point, entries);
    }

	updateValue() {
        if (this.dirty) {
            this.setValue(
                this.inputs.reduce((prevValue, current) => {
                    if (prevValue === 'E' || current.getValue() === 'E') return 'E';
                    if (current.getValue() === 'D') return prevValue;
                    if (prevValue === 'D') return current.getValue();
                    return (parseInt(prevValue, 2) & parseInt(current.getValue(), 2)).toString(2);
                }, 'D')
            );
            this.dirty = false; // Mark as clean after recalculating
        }
    }
}

export default And;
