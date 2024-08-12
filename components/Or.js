import Point from './Point.js';
import Gate from './Gate.js';
import Pin from './Pin.js';

class Or extends Gate {
	constructor(point, entries = 2) {
		super(point);
		let x = point.x;
		let y = point.y;

		// Inicializa las entradas
		let pt = null;
		for (let i = 0; i < entries; i++) {
			pt = new Point(x - 20, y + i * 40 - 20);
			this.inputs.push(new Pin(pt, 'in', 'D', this));
		}

		// Inicializa la salida
		pt = new Point(x + 20, y);
		this.outputs.push(new Pin(pt, 'out', 'D', this));
		this.updateValue();
	}

	// Se reescribe el metodo de actualizacion del valor
	updateValue() {
		this.setValue(
			this.inputs.reduce((prevValue, current) => {
				if (prevValue == 'E' || current.getValue() == 'E') return 'E';
				if (current.getValue() == 'D') return prevValue;
				if (prevValue == 'D') return current.getValue();
				return (parseInt(prevValue, 2) | parseInt(current.getValue(), 2)).toString(2);
			}, 'D')
		);
	}
}

export default Or;