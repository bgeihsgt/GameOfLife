var Scene = require('./Scene.js');
var Grid = require('./Grid.js');

var GameOfLife = function() {
	this.livingCells = [];
};

GameOfLife.prototype.addCell = function(cell) {
	this.livingCells.push(cell);
};

GameOfLife.prototype.toScene = function(options) {
	return new Scene([Grid.create(options)]);
};

module.exports = GameOfLife;