var Signal = require('signals'),
	hashes = require('../lib/hashes'),
	Scene = require('./Scene.js'),
	Grid = require('./Grid.js'),
	Rectangle = require('./Rectangle.js');

var GameOfLife = function() {
	this.livingCells = new hashes.HashSet();
	this.changed = new Signal();
};

GameOfLife.prototype.toggleCell = function(cell) {
	if (this.livingCells.contains(cell)) {
		this.livingCells.remove(cell);
	} else {
		this.livingCells.add(cell);
	}

	this.changed.dispatch();
};

GameOfLife.prototype.toScene = function(options) {
	var cellRectangles = this.livingCells.getKeys().map(function(cell) {
		return cell.toRectangle(options.cellWidth, options.cellHeight, options.livingCellColor);
	}),
	grid = [Grid.create(options)],
	background = [new Rectangle(0, 0, options.width, options.height, options.backgroundColor)],
	drawables = background.concat(cellRectangles).concat(grid);

	return new Scene(drawables);
};

GameOfLife.prototype.nextGeneration = function() {
	if (this.livingCells.count() === 1) {
		this.livingCells.clear();
	}


	this.changed.dispatch();
};

module.exports = GameOfLife;