var DrawingInstruction = require('./drawinginstruction.js');

var MockGraphics2d = function()
{
	this.instructions = [];
};

MockGraphics2d.prototype.moveTo = function(x, y) {
	this.instructions.push(DrawingInstruction.moveTo(x, y));
};

module.exports = MockGraphics2d;