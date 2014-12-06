var Signal = require('signals');

var CellEvents = function(options) {
	this.cellWidth = options.cellWidth;
	this.cellHeight = options.cellHeight;

	this.cellToggled = new Signal();
};

CellEvents.prototype.handleMouseDown = function(x, y) {
    var cellX = Math.floor(x / this.cellWidth),
    	cellY = Math.floor(y / this.cellHeight);


	this.cellToggled.dispatch(cellX, cellY);
};

CellEvents.prototype.handleMouseMove = function(x, y) {
	
};

module.exports = CellEvents;