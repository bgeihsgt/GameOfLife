var Line = function(start, end) {
	this.start = start;
	this.end = end;
};

Line.prototype.draw = function(g) {
	g.moveTo(this.start.x, this.start.y);
	g.lineTo(this.end.x, this.end.y);
	g.stroke();
};

var LineBuilder = function(start) {
	this.start = start;
};

LineBuilder.prototype.to = function(end) {
	return new Line(this.start, end);
};

Line.from = function(point) {
	return new LineBuilder(point);
};

 
module.exports = Line;