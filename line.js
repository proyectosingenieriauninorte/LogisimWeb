// line.js

// Definir la clase Line para representar las líneas del canvas
export class Line {
    constructor(startNode, endNode) {
        this.startNode = startNode; // Nodo de inicio de la línea
        this.endNode = endNode; // Nodo de fin de la línea
        this.nodes = []; // Lista de nodos que componen la línea
        this.constructLine(); // Construir la línea
    }

    // Método para construir la línea entre los nodos de inicio y fin
    constructLine() {
        // Determinar si la línea es horizontal o vertical
        if (this.startNode.x === this.endNode.x) { // Línea vertical
            const minY = Math.min(this.startNode.y, this.endNode.y);
            const maxY = Math.max(this.startNode.y, this.endNode.y);
            // Agregar los nodos que componen la línea
            for (let y = minY; y <= maxY; y += 20) {
                this.nodes.push({ x: this.startNode.x, y });
            }
        } else if (this.startNode.y === this.endNode.y) { // Línea horizontal
            const minX = Math.min(this.startNode.x, this.endNode.x);
            const maxX = Math.max(this.startNode.x, this.endNode.x);
            // Agregar los nodos que componen la línea
            for (let x = minX; x <= maxX; x += 20) {
                this.nodes.push({ x, y: this.startNode.y });
            }
        }
    }
}
