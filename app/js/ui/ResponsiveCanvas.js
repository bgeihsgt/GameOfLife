var Signal = require('signals');

var ResponsiveCanvas = function(canvasElement, width, height) {
	this.canvasElement = canvasElement;

	canvasElement.width = width;
	canvasElement.height = height;

	this.resized = new Signal();
};

ResponsiveCanvas.prototype.resize = function(width, height) {
	this.canvasElement.width = width;
	this.canvasElement.height = height;

	this.resized.dispatch(this.canvasElement.getContext('2d'), width, height);
};

module.exports = ResponsiveCanvas;