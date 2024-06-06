import Point from './Point.js';
import Gate from './Gate.js';
import Pin from './Pin.js';

class Not extends Gate {
	constructor(point) {
		super(point);
		let x = point.x;
		let y = point.y;

		// Inicializa las entradas
		let pt = null;
		pt = new Point(x - 20, y);
		this.inputs.push(new Pin(pt, 'in', 'D', this));

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
				return current.getValue()
					.split('')
					.map((lt) => (lt == '0' ? '1' : '0'))
					.join('');
			}, 'D')
		);
	}
}

export default Not;
