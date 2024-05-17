// wire.js

// Definir la clase Line para representar los cables del canvas
export class Wire {
    constructor(lines) {
        this.end1 = null; // Posición del nodo de inicio
        this.end2 = null; // Posición del nodo de fin
        this.lines = lines; // Tamaño del nodo
        this.constructWire(); 
    }

    // Método para construir el cable entre los nodos de inicio y fin
    constructWire() {
        // Determinar si el cable es horizontal o vertical
        for (let line of this.lines) {
            
        }
    }
}