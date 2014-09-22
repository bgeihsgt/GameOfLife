var Scene = require('./Scene.js');
var Grid = require('./Grid.js');

var GameOfLife = function() {
	
}; 

GameOfLife.prototype.toScene = function(options) {
	return new Scene([Grid.create(options)]);
};

module.exports = GameOfLife;