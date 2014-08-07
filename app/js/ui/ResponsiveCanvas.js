var ResponsiveCanvas = function(canvasElement, width, height) {
	this.canvasElement = canvasElement;

	canvasElement.width = width;
	canvasElement.height = height;
};

ResponsiveCanvas.prototype.resize = function(width, height) {
	this.canvasElement.width = width;
	this.canvasElement.height = height;
};

module.exports = ResponsiveCanvas;