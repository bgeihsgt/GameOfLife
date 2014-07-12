var Point = require('../app/js/point.js');
var Line = require('../app/js/line.js');

describe('A line', function() {

	var line,
		start,
		end;

	beforeEach(function() {
		start = new Point(2, 3);
		end = new Point(7, 1);
		line = new Line(start, end);
	});

	it('has two points', function() {
		line.start.should.equal(start);
		line.end.should.equal(end);
	});

});