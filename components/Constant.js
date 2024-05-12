class Constant {
	constructor(point, value) {
		this.point = point;
		this.state = value;
		this.color = "black";
	}

	setState(state) {
		this.state = state;
	}

	getState() {
		return this.state;
	}

	isConnectedTo(point) {
		return this.point.isEqualTo(point);
	}
}

export default Constant;
