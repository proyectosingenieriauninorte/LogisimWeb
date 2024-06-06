//Import clase Line
import Wire from '../../components/Wire.js';
import Line from '../../components/Line.js';
import Pin from '../../components/Pin.js';
import Point from '../../components/Point.js';
import Gate from '../../components/Gate.js';

import * as drawer from '../../utils/drawer.js';
import {
	ctxBack,
	clearCanvas,
	initCanvas,
} from '../canvas/canvasSetup.js';

// Coleccion de componentes y cables
class circuit {
	constructor() {
		this.Wires = [];
		this.Components = [];
		this.temp_const = '1'; // Variable temporal para probar las diferentes constantes
		this.gate_type = '';
	}

	addWire(pointA, pointB) {
		// Crea la nueva linea
		let line = new Line(pointA, pointB);

		// Obtiene los componentes, si es que existen, a los que estan conectados
		// los puntos
		let compA = this.getConnectedComponent(pointA);
		let compB = this.getConnectedComponent(pointB);

		// Cable al que se le va a agregar la linea
		let wire = null;

		// Verifica los dos puntos seleccionados
		if (compA instanceof Wire && compB instanceof Wire) {
			// Crea un nuevo cable que sera la union de los dos
			wire = new Wire();
			wire.lines = Array.from(compA.lines).concat(
				Array.from(compB.lines)
			);
			wire.inputs = Array.from(compA.inputs).concat(
				Array.from(compB.inputs)
			);
			wire.outputs = Array.from(compA.outputs).concat(
				Array.from(compB.outputs)
			);
			wire.updateValue();

			// Elimina las conexiones de los antiguos cables
			compA.deleteAllConnections();
			compB.deleteAllConnections();

			// Actuliza las conexiones de los componentes conectados a
			// los anteriores cables
			wire.inputs.forEach((input) => input.addConnection(wire));
			wire.outputs.forEach((output) => output.addConnection(wire));

			// Elimina los antiguos cables
			this.Wires = this.Wires.filter((comp) => comp != compA && comp != compB);
			// Agrega el nuevo cable
			this.Wires.push(wire);
		} else if (compA instanceof Wire) {
			wire = compA;
		} else if (compB instanceof Wire) {
			wire = compB;
		} else {
			// Si no existe crea un nuevo cable
			wire = new Wire();
			this.Wires.push(wire);
		}

		wire.addLine(line); // Agrega la linea

		// Agrega las entradas y/o salidas a las que esta conectada esta linea
		if (compA instanceof Pin) {
			switch (compA.type) {
				case 'out':
					wire.addInput(compA);
					break;
				case 'in':
					wire.addOutput(compA);
					break;
			}
			compA.addConnection(wire);
		}
		if (compB instanceof Pin) {
			switch (compB.type) {
				case 'out':
					wire.addInput(compB);
					break;
				case 'in':
					wire.addOutput(compB);
					break;
			}
			compB.addConnection(wire);
		}
	}

	getConnectedComponent(point) {
		let comp = null;
		for (let cp of this.Components) {
			comp = cp.isConnectedTo(point);
			if (comp) break;
		}

		if (comp) return comp;
		for (let cp of this.Wires) {
			comp = cp.isConnectedTo(point);
			if (comp) break;
		}

		return comp;
	}

	getConnectedComponentWithNotParent(point, parent) {
		let comp = null;
		for (let cp of this.Components) {
			if (cp == parent) continue;
			comp = cp.isConnectedTo(point);
			if (comp) break;
		}

		if (comp) return comp;
		for (let cp of this.Wires) {
			if (cp == parent) continue;
			comp = cp.isConnectedTo(point);	
			if (comp) break;
		}

		return comp;
	}
	// Funcion para actualizar el estado de los cables

	draw(obj) {
		//console.log (obj.constructor.name);
		if (obj instanceof Point) {
			drawer.drawPoint(obj.x, obj.y);
		} else if (obj instanceof Line) {
			drawer.drawLine(ctxBack, obj.getPoints(), color);
		} else if (obj instanceof Wire) {
			let color = '';
			let value = obj.getValue();

			switch (value) {
				case 'E':
					color = 'red';
					break;
				case 'D':
					color = 'blue';
					break;
				case '0':
					color = '#006400';
					break;
				case '1':
					color = '#00d200';
					break;
				default:
					color = 'black';
					break;
			}

			obj.lines.forEach((ln) =>
				drawer.drawLine(ctxBack, ln.getPoints(), color)
			);
		} else if (obj instanceof Pin) {
			drawer.drawPin(obj, ctxBack);
		} else if (obj instanceof Gate) {
			drawer.drawGate(obj, ctxBack);
		} else {
			console.error('No se pudo pintar el objeto');
			console.error('Objeto: ', obj);
		}
	}

	// Funcion para eliminar todos los componentes
	clearComponents() {
		this.Wires = [];
		this.Components = [];
		//clearCanvas()
	}

	getComponent(component){
		return this.Components.find((comp) => comp == component);
	}


	repaintCircuit() {
		console.log('WIRES:', this.Wires);
		console.log('COMPONENTS', this.Components);
		clearCanvas();
		initCanvas(ctxBack);
		this.Wires.forEach((wire) => this.draw(wire)); // Pinta todos los cables
		this.Components.forEach((comp) => this.draw(comp)); // Pinta todos los componentes
	}
}
export default circuit;
