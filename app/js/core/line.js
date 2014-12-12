var Point = require('./point');

var Line = function(start, end) {
	this.start = start;
	this.end = end;
	this.width = 1;
};

Line.prototype.draw = function(g) {
	g.moveTo(this.start.x, this.start.y);
	g.lineTo(this.end.x, this.end.y);
	g.lineWidth = this.width;
};

var LineBuilder = function(x, y) {
	this.start = new Point(x, y);
};

LineBuilder.prototype.to = function(x, y) {
	return new Line(this.start, new Point(x, y));
};

Line.from = function(x, y) {
	return new LineBuilder(x, y);
};

 
module.exports = Line;