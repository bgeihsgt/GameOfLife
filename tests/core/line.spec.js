var Point = require('../../app/js/core/point.js'),
	Line = require('../../app/js/core/line.js'),
    MockGraphics2d = require('./mockgraphics2d.js'),
    DrawingInstruction = require('./drawinginstruction.js');

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

	it('has a default width of 1', function() {
		line.width.should.equal(1);
	});

	it('can be built expressively', function() {
		Line.from(start.x, start.y).to(end.x, end.y).should.eql(line);
	});

	describe('when drawn', function() {

		var mockGraphics2d;

		beforeEach(function() {
			mockGraphics2d = new MockGraphics2d();

			line.draw(mockGraphics2d);
		});

		it('will move to the start point first', function() {
			mockGraphics2d.instructions[0].should.eql(DrawingInstruction.moveTo(start.x, start.y));
		});

		it('will line to the end point second', function() {
			mockGraphics2d.instructions[1].should.eql(DrawingInstruction.lineTo(end.x, end.y));
		});

		it('will set the line width to line width', function() {
			mockGraphics2d.lineWidth.should.eql(line.width);
		});
	});

});