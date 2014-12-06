var Scene = require('./Scene.js');
var Grid = require('./Grid.js');

var GameOfLife = function() {
	this.livingCells = [];
};

GameOfLife.prototype.toggleCell = function(cell) {
	var originalLength = this.livingCells.length;

	var newCells = this.livingCells.filter(function(item) {
		return !item.equals(cell);
	});

	if (newCells.length === originalLength) {
		newCells.push(cell);
	}

	this.livingCells = newCells;
};

GameOfLife.prototype.toScene = function(options) {
	var cellRectangles = this.livingCells.map(function(cell) {
		return cell.toRectangle(options.cellWidth, options.cellHeight, options.livingCellColor);
	}),
	grid = [Grid.create(options)],
	drawables = cellRectangles.concat(grid);

	return new Scene(drawables);
};

GameOfLife.prototype._findCell = function(cell) {
	var matchingCell = this.livingCells.filter(function(item) {
		if (item.equals(cell)) {
			return true;
		}
	});

	return matchingCell[0];
};

module.exports = GameOfLife;