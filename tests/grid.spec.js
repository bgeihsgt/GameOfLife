var Grid = require('../app/js/grid.js');

describe('A Grid', function() {

	var grid;

	beforeEach(function() {
		grid = Grid.forCanvas({
			width: 30,
			height: 60,
			rows: 3,
			cols: 5
		});
	});

	it('should create lines between each column', function() {
		grid.columnLines.should.have.lengthOf(4);
	});


});