import Point from './Point.js';
import Gate from './Gate.js';
import Pin from './Pin.js';

class Or extends Gate {
	constructor(point, entries = 2) {
		super(point);
		let x = point.x;
		let y = point.y;

		// Inicializar entradas
		for (let i = 0; i < entries; i++) {
			let pt = new Point(x - 20, y + i * 40 - 20);
			this.inputs.push(new Pin(pt, 'in', 'D', this));
		}

		// Inicializar salida
		let pt = new Point(x + 20, y);
		this.outputs.push(new Pin(pt, 'out', 'D', this));
		this.updateValue();
	}

	updateValue() {
		// Utiliza un temporizador para simular el retraso de propagación
		setTimeout(() => {
			this.setValue(
				this.inputs.reduce((prevValue, current) => {
					// Si alguna entrada está en estado de error, el resultado es error
					if (prevValue === 'E' || current.getValue() === 'E') return 'E';
					// Si alguna entrada está indefinida, el resultado es indefinido
					if (current.getValue() === 'D') return prevValue;
					if (prevValue === 'D') return current.getValue();
					// Realiza la operación OR binaria entre las entradas
					return (parseInt(prevValue, 2) | parseInt(current.getValue(), 2)).toString(2);
				}, 'D')
			);
		}, this.delay);
	}
}

export default Or;
