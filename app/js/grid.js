var Grid = function(options) {
	this.columnLines = [1,2,3,4];
};

Grid.forCanvas = function() {
	return new Grid();
};

module.exports = Grid;