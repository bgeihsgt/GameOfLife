var DrawingInstruction = require('./drawinginstruction.js');

var MockGraphics2d = function()
{
	this.instructions = [];
};

MockGraphics2d.prototype.moveTo = function(x, y) {
	this.instructions.push(DrawingInstruction.moveTo(x, y));
};

MockGraphics2d.prototype.lineTo = function(x, y) {
	this.instructions.push(DrawingInstruction.lineTo(x, y));
};

MockGraphics2d.prototype.stroke = function(x, y) {
	this.instructions.push(DrawingInstruction.stroke());
};

module.exports = MockGraphics2d;