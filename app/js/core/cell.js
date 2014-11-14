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

module.exports = Cell;