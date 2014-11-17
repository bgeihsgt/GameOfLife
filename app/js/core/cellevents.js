var Signal = require('signals');

var CellEvents = function() {
	this.cellToggled = new Signal();
};

CellEvents.prototype.handleMouseDown = function(x, y) {
	this.cellToggled.dispatch(0, 0);
};

module.exports = CellEvents;