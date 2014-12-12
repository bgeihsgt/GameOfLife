var DrawingInstruction = require('./drawinginstruction.js');

var MockGraphics2d = function()
{
	this.instructions = [];
	this.fillStyle = '#000000';
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

MockGraphics2d.prototype.beginPath = function(x, y) {
	this.instructions.push(DrawingInstruction.beginPath());
};

MockGraphics2d.prototype.fillRect = function(x, y, width, height) {
	this.instructions.push(DrawingInstruction.fillRect(x, y, width, height, this.fillStyle));
};

module.exports = MockGraphics2d;