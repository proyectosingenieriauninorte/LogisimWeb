// line.js

// Definir la clase Line para representar las líneas del canvas
export class Line {
    constructor(startNode, endNode) {
        this.startNode = startNode; // Nodo de inicio de la línea
        this.endNode = endNode; // Nodo de fin de la línea
        this.nodes = []; // Lista de nodos que componen la línea
        this.constructLine(); // Método para construir la línea
    }

    // Método para construir la línea entre los nodos de inicio y fin
    constructLine() {
        var xDistance = this.endNode.x - this.startNode.x;
        var yDistance = this.endNode.y - this.startNode.y;


        if (yDistance != 0) {
            const minY = Math.min(this.startNode.y, this.endNode.y);
            const maxY = Math.max(this.startNode.y, this.endNode.y);
            // Agregar los nodos que componen la línea
            for (let y = minY; y <= maxY; y += 20) {
                this.nodes.push({ x: this.startNode.x, y });
            }
        }
        if (xDistance != 0) {
            const minX = Math.min(this.startNode.x, this.endNode.x);
            const maxX = Math.max(this.startNode.x, this.endNode.x);
            // Agregar los nodos que componen la línea
            for (let x = minX; x <= maxX; x += 20) {
                this.nodes.push({ x, y: this.endNode.y });
            }
        }

        
    }


}

// Función para verificar si los extremos de una línea están conectados a otra línea
export function areEndsConnectedToOtherLine(line, lines) {
    // Arreglo para almacenar las líneas conectadas
    var connectedLines = [];

    // Verificar si el inicio de la línea está conectado a otra línea
    for (var i = 0; i < lines.length; i++) {
        if (lines[i] !== line && (lines[i].startNode === line.startNode || lines[i].startNode === line.endNode)) {
            connectedLines.push(lines[i]);
        }
    }

    // Verificar si el final de la línea está conectado a otra línea
    for (var i = 0; i < lines.length; i++) {
        if (lines[i] !== line && (lines[i].endNode === line.startNode || lines[i].endNode === line.endNode)) {
            connectedLines.push(lines[i]);
        }
    }

    // Si hay líneas conectadas, devolver el arreglo
    if (connectedLines.length > 0) {
        return connectedLines;
    } else {
        return null; // Si no hay líneas conectadas, devolver null
    }
}
