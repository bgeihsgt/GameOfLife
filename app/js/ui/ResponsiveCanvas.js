var Signal = require('signals'),
	Point = require('../core/point.js');

var Pixels = function(value, roundDownToNearest) {
	this.value = value;

	if (roundDownToNearest) {
		this.value -= value % roundDownToNearest;
	}
};

Pixels.prototype.toPx = function() {
	return this.value + 'px';
};

var ResponsiveCanvas = function(canvasElement, options) {
	this.canvasElement = canvasElement;
	this.options = options || {};

	this._updateSizeAttributes();

	this.resized = new Signal();
	this.clicked = new Signal();
};

ResponsiveCanvas.prototype.resize = function() {
	this._updateSizeAttributes();

	this.resized.dispatch(this.canvasElement.getContext('2d'), this.canvasElement.width, this.canvasElement.height);
};

ResponsiveCanvas.prototype.click = function(x, y) {
	this.clicked.dispatch(new Point(x, y));
};

ResponsiveCanvas.prototype._updateSizeAttributes = function() {
	this._removePreviousInlineUpdates();
	
	var width = new Pixels(this.canvasElement.clientWidth, this.options.roundWidthDownToNearest),
		height = new Pixels(this.canvasElement.clientHeight, this.options.roundHeightDownToNearest);
	
	this.canvasElement.style.width = width.toPx();	
	this.canvasElement.style.height = height.toPx();

	this.canvasElement.width = this.canvasElement.clientWidth;
	this.canvasElement.height = this.canvasElement.clientHeight;
};

ResponsiveCanvas.prototype._removePreviousInlineUpdates = function() {
	this.canvasElement.style.removeProperty('width');
	this.canvasElement.style.removeProperty('height');
};

ResponsiveCanvas.create = function(canvasElement, options) {
	var responsiveCanvas = new ResponsiveCanvas(canvasElement, options);

	window.addEventListener('resize', function() {
		responsiveCanvas.resize();
	});

	return responsiveCanvas;
};

module.exports = ResponsiveCanvas;