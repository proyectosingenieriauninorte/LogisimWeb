import Point from './Point.js';
import Gate from './Gate.js';
import Pin from './Pin.js';

class Not extends Gate {
	constructor(point) {
		super(point);
		let x = point.x;
		let y = point.y;

		// Inicializar entrada
		let pt = new Point(x - 20, y);
		this.inputs.push(new Pin(pt, 'in', 'D', this));

		// Inicializar salida
		pt = new Point(x + 20, y);
		this.outputs.push(new Pin(pt, 'out', 'D', this));
		this.updateValue();
	}

	updateValue() {
		// Utiliza un temporizador para simular el retraso de propagación
		setTimeout(() => {
			this.setValue(
				this.inputs.reduce((prevValue, current) => {
					// Si la entrada está en estado de error, el resultado es error
					if (prevValue === 'E' || current.getValue() === 'E') return 'E';
					// Si la entrada está indefinida, el resultado es indefinido
					if (current.getValue() === 'D') return prevValue;
					// Realiza la operación NOT binaria (inversión) en la entrada
					return current.getValue() === '1' ? '0' : '1';
				}, 'D')
			);
		}, this.delay);
	}
}

export default Not;
