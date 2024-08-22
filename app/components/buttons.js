import { changeMode } from "../src/circuit/changemode.js";

export class Button {
    constructor(id, mode) {
        this.button = document.getElementById(id);
        this.action = mode;
        this.button.addEventListener('click', () => this.handleClick());
    }

    handleClick() {
        if (typeof this.action === 'function') {
            // Si action es una función, la llamamos directamente
            this.action();
        } else {
            // Si no, asumimos que es un modo y llamamos a changeMode
            changeMode(this.action);
        }
    }
}

// Crear instancias de la clase Button
