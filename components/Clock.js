import Pin from './Pin.js';

class ClockPin extends Pin {
    constructor(point, type, interval = 2000, parent = null) {
         if (ClockPin.instance) {
            ClockPin.instance.addLocation(point);
             return ClockPin.instance;
         }
        super(point, type, '0', parent); // El valor inicial es '0'
        this.interval = interval;  // Intervalo de tiempo en milisegundos
        this.isRunning = false;  // Estado del reloj (encendido/apagado)
        this.subscribers = [];  // Lista de suscriptores
        this.locations = [point];  // Lista de ubicaciones donde el ClockPin está colocado
        ClockPin.instance = this;
    }

      // Añadir una nueva ubicación donde se dibuja el ClockPin
    addLocation(point) {
        if (!this.locations.some(loc => loc.isEqualTo(point))) {
            this.locations.push(point);
        }
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

            // Notificar a los suscriptores
            this.notifySubscribers();

            // Programar la siguiente alternancia
            setTimeout(() => this.tick(), this.interval);
        }
    }

    // Método para suscribirse a los cambios del reloj
    subscribe(callback) {
        // Verifica si el callback ya está suscrito
        if (!this.subscribers.includes(callback)) {
            this.subscribers.push(callback);
        } else {
            console.warn('Callback already subscribed.');
        }
    }

    // Método para notificar a los suscriptores
    notifySubscribers() {
        this.subscribers.forEach(callback => callback(this.value));
    }

    // Método estático para obtener la instancia única de ClockPin
    static getInstance(point, type, interval = 2000, parent = null) {
        if (!ClockPin.instance) {
            ClockPin.instance = new ClockPin(point, type, interval, parent);
        }
        return ClockPin.instance;
    }

    // `updateValue` heredado de `Pin` no es necesario sobrescribirlo, ya que el reloj genera su propio valor

    // `getValue` ya está implementado en `Pin` y no es necesario redefinirlo
}

export default ClockPin;
