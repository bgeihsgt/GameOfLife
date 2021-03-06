var Signal = require('signals'),
	Cell = require('./cell.js');

var CellEvents = function(options) {
	this.cellWidth = options.cellWidth;
	this.cellHeight = options.cellHeight;

	this.cellToggled = new Signal();
	this.currentCell = undefined;
};

CellEvents.prototype.handleMouseDown = function(x, y) {
    var cell = this._getCell(x, y);

    this.currentCell = cell;
	this.cellToggled.dispatch(cell);
};

CellEvents.prototype.handleMouseMove = function(x, y) {
	var cell;

	if (!this.currentCell) {
		return;
	}

	cell = this._getCell(x, y);

	if (!cell.equal(this.currentCell)) {
		this.currentCell = cell;
		this.cellToggled.dispatch(cell);
	}
};

CellEvents.prototype.handleMouseUp = function(x, y) {
	this.currentCell = undefined;
};

CellEvents.prototype._getCell = function(mouseX, mouseY) {
	var cellX = Math.floor(mouseX / this.cellWidth),
    	cellY = Math.floor(mouseY / this.cellHeight);

    return new Cell(cellX, cellY);
};

module.exports = CellEvents;