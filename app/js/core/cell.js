var Rectangle = require('./rectangle.js');

var Cell = function(x, y) {
	this.x = x;
	this.y = y;
};

Cell.prototype.toRectangle = function(cellWidth, cellHeight, fillColor) {
	var x = cellWidth * this.x,
		y = cellHeight * this.y;

	return new Rectangle(x, y, cellWidth, cellHeight, fillColor);
};

Cell.prototype.equals = function(other) {
	if (!other) {
		return false;
	}

	if (!(other instanceof Cell)) {
		return false;
	}

	return this.x === other.x && this.y === other.y;
};

module.exports = Cell;