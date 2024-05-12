class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

    // Compara si un punto es igual a el mismo
	isEqualTo(point) {
		return point instanceof Point && point.x == this.x && point.y == this.y;
    }
}

export default Point;
