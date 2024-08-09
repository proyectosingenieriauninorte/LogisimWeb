import Gate from './Gate.js';
import Point from './Point.js';
import Pin from './Pin.js';

class Not extends Gate {
    constructor(point) {
        super(point);
        let x = point.x;
        let y = point.y;

        let pt = new Point(x - 20, y);
        this.inputs.push(new Pin(pt, 'in', 'D', this));

        pt = new Point(x + 20, y);
        this.outputs.push(new Pin(pt, 'out', 'D', this));
        this.updateValue();
    }

    updateValue() {
        this.setValue(
            this.inputs.reduce((prevValue, current) => {
                if (prevValue === 'E' || current.getValue() === 'E') return 'E';
                if (current.getValue() === 'D') return prevValue;
                return current.getValue()
                    .split('')
                    .map(lt => (lt === '0' ? '1' : '0'))
                    .join('');
            }, 'D')
        );
    }
}

export default Not;
