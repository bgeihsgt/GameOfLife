var Grid = require('../app/js/grid.js');
var Line = require('../app/js/line.js');

describe('A Grid', function() {

	var grid;

	beforeEach(function() {
		grid = Grid.forCanvas({
			width: 30,
			height: 40,
			rows: 4,
			cols: 5
		});
	});

	it('should create lines between each column', function() {
		grid.columnLines.should.eql([
			Line.from(6, 0).to(6, 40),
			Line.from(12, 0).to(12, 40),
			Line.from(18, 0).to(18, 40),
			Line.from(24, 0).to(24, 40)
		]);
	});

	it('should create lines between each row', function() {
		grid.rowLines.should.eql([
			Line.from(0, 10).to(30, 10),
			Line.from(0, 20).to(30, 20),
			Line.from(0, 30).to(30, 30),
		]);
	});


});