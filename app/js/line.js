var Line = function(start, end) {
	this.start = start;
	this.end = end;
};

Line.prototype.draw = function(g) {
	g.moveTo(this.start.x, this.start.y);
	g.lineTo(this.end.x, this.end.y);
	g.stroke();
};

 
module.exports = Line;