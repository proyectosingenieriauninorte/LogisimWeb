import Pin from './Pin.js';

class ClockPin extends Pin {
    constructor(point, type, interval = 2000, parent = null) {
        super(point, type, '0', parent); // El valor inicial es '0'
        this.interval = interval;  // Intervalo de tiempo en milisegundos
        this.isRunning = false;  // Estado del reloj (encendido/apagado)
    }

    // Inicia el reloj
    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.tick();  // Comienza a alternar el valor
        }
    }

    // Detiene el reloj
    stop() {
        this.isRunning = false;
    }

    // Alterna el valor del reloj
    tick() {
        if (this.isRunning) {
            // Alternar entre '0' y '1'
            this.setValue(this.value === '0' ? '1' : '0');
            console.log(`Clock tick: ${this.value}`);

            // Programar la siguiente alternancia
            setTimeout(() => this.tick(), this.interval);
        }
    }

    // `updateValue` heredado de `Pin` no es necesario sobrescribirlo, ya que el reloj genera su propio valor

    // `getValue` ya está implementado en `Pin` y no es necesario redefinirlo
}

export default ClockPin;
