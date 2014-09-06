var Signal = require('signals');

var ResponsiveCanvas = function(canvasElement) {
	this.canvasElement = canvasElement;

	this._updateSizeAttributes();

	this.resized = new Signal();
};

ResponsiveCanvas.prototype.resize = function() {
	this._updateSizeAttributes();

	this.resized.dispatch(this.canvasElement.getContext('2d'), this.canvasElement.width, this.canvasElement.height);
};

ResponsiveCanvas.prototype._updateSizeAttributes = function() {
	this.canvasElement.width = this.canvasElement.offsetWidth;
	this.canvasElement.height = this.canvasElement.offsetHeight;	
};

ResponsiveCanvas.create = function(canvasElement) {
	var responsiveCanvas = new ResponsiveCanvas(canvasElement);

	window.addEventListener('resize', function() {
		responsiveCanvas.resize();
	});

	return responsiveCanvas;
};

module.exports = ResponsiveCanvas;