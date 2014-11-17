var Scene = require('./Scene.js');
var Grid = require('./Grid.js');

var GameOfLife = function() {
	this.livingCells = [];
};

GameOfLife.prototype.addCell = function(cell) {
	this.livingCells.push(cell);
};

GameOfLife.prototype.toScene = function(options) {
	var cellRectangles = this.livingCells.map(function(cell) {
		return cell.toRectangle(options.cellWidth, options.cellHeight, options.livingCellColor);
	}),
	grid = [Grid.create(options)],
	drawables = cellRectangles.concat(grid);

	return new Scene(drawables);
};

module.exports = GameOfLife;