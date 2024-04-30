// node.js

// Definir la clase Node para representar los nodos del canvas
export class Node {
    constructor(x, y, size, ctx) {
        this.x = x; // Posición x del nodo
        this.y = y; // Posición y del nodo
        this.size = size; // Tamaño del nodo
        this.highlighted = false; // Estado del nodo (resaltado o no)
        this.color = 'black'; // Color del nodo
        this.draw(ctx); // Método para dibujar el nodo en el canvas
    }

    // Método para dibujar el nodo en el canvas
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.getNodeSize(), 0, 2 * Math.PI);
        ctx.fillStyle = this.color; // Color del nodo según su estado
        ctx.fill();
        ctx.closePath();
    }

    // Método para verificar si un punto está dentro del área del nodo
    isPointInside(pointX, pointY) {
        // Calcular la distancia entre el punto dado y el centro del nodo
        const distance = Math.sqrt((pointX - this.x) ** 2 + (pointY - this.y) ** 2);
        // Si la distancia es menor o igual al radio del nodo más un pequeño margen, el punto está dentro del nodo
        return distance <= (this.size + 10); // Añadimos un margen de 10 píxeles al radio del nodo
    }

    getNodeSize() {
        return this.highlighted ? this.size * 16 : this.size;
    }

    // Método para resaltar el nodo
    highlight(color = 'red') {
        this.highlighted = true;
        this.color = color;
    }

    // Método para quitar el resaltado del nodo
    unhighlight() {
        this.highlighted = false;
    }
}
