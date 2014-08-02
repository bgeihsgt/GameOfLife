var Grid = require('../../app/js/core/grid.js'),
	Line = require('../../app/js/core/line.js'),
    MockGraphics2d = require('./mockgraphics2d.js'),
    DrawingInstruction = require('./drawinginstruction.js');


describe('A Grid', function() {

	var grid;

	beforeEach(function() {
		grid = Grid.create({
			width: 30,
			height: 40,
			cellWidth: 6,
			cellHeight: 10
		});
	});

	it('should create lines between each column', function() {
		grid.columnLines.should.eql([
			Line.from(6.5, 0).to(6.5, 40),
			Line.from(12.5, 0).to(12.5, 40),
			Line.from(18.5, 0).to(18.5, 40),
			Line.from(24.5, 0).to(24.5, 40) 
		]);
	});

	it('should create lines between each row', function() {
		grid.rowLines.should.eql([
			Line.from(0, 10.5).to(30, 10.5),
			Line.from(0, 20.5).to(30, 20.5),
			Line.from(0, 30.5).to(30, 30.5),
		]);
	});

	describe('when drawn', function() {
		
		var mockGraphics2d;

		beforeEach(function() {
			mockGraphics2d = new MockGraphics2d();

			grid.draw(mockGraphics2d);
		});

		it('should draw the column and row lines', function() {
			mockGraphics2d.instructions.should.have.lengthOf(21);
		});
	});


});