var Signal = require('signals'),
	Scene = require('./Scene.js'),
	Grid = require('./Grid.js'),
	Rectangle = require('./Rectangle.js');

var GameOfLife = function() {
	this.livingCells = [];
	this.changed = new Signal();
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
	this.changed.dispatch();
};

GameOfLife.prototype.toScene = function(options) {
	var cellRectangles = this.livingCells.map(function(cell) {
		return cell.toRectangle(options.cellWidth, options.cellHeight, options.livingCellColor);
	}),
	grid = [Grid.create(options)],
	background = [new Rectangle(0, 0, options.width, options.height, options.backgroundColor)],
	drawables = background.concat(cellRectangles).concat(grid);

	return new Scene(drawables);
};

module.exports = GameOfLife;