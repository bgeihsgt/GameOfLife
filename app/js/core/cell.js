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

Cell.prototype.countNeighbors = function(cells) {
	var self = this;

	var neighbors = this._getNeighbors();

	return neighbors.filter(function(c) {
		return cells.contains(c);
	}).length;
};

Cell.prototype._getNeighbors = function() {
	var neighbors = [],
		x,
		y;

	for (x = this.x - 1; x <= this.x + 1; x++) {
		for (y = this.y -1; y <= this.y + 1; y++) {
			if (x === this.x && y === this.y) {
				continue;
			}

			neighbors.push(new Cell(x, y));
		}
	}

	return neighbors;
};

Cell.prototype.equal = function(other) {
	if (!other) {
		return false;
	}

	if (!(other instanceof Cell)) {
		return false;
	}

	return this.x === other.x && this.y === other.y;
};

Cell.prototype.getHashCode = function() {
	return this.x * 31 + this.y;
};

module.exports = Cell;