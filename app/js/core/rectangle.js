var Rectangle = function(x, y, width, height, fillColor) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.fillColor = fillColor;
};

Rectangle.prototype.draw = function(g) {
	g.fillStyle = this.fillColor;
	g.fillRect(this.x, this.y, this.width, this.height);
};

module.exports = Rectangle;