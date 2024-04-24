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

// Función para verificar si los extremos de una línea están conectados a otra línea
export function areEndsConnectedToOtherLine(line, lines) {
    // Arreglo para almacenar las líneas conectadas
    var connectedLines = [];
    
    // Verificar si el inicio de la línea está conectado a otra línea
    for (var i = 0; i < lines.length; i++) {
        if (lines[i] !== line && (lines[i].start === line.start || lines[i].start === line.end)) {
            connectedLines.push(lines[i]);
        }
    }
    
    // Verificar si el final de la línea está conectado a otra línea
    for (var i = 0; i < lines.length; i++) {
        if (lines[i] !== line && (lines[i].end === line.start || lines[i].end === line.end)) {
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
