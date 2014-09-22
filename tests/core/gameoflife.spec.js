var GameOfLife = require('../../app/js/core/gameoflife.js');
var Grid = require('../../app/js/core/grid.js');

describe('A game of life', function() {

	var gameOfLife;

	describe('when empty', function() {

		beforeEach(function() {
			gameOfLife = new GameOfLife();
		});

		describe('then rendered', function() {

			var actualScene,
				dimensions;

			beforeEach(function() {
				dimensions = {
					width: 134,
					height: 78,
					cellWidth: 12,
					cellHeight: 29
				};

				actualScene = gameOfLife.toScene(dimensions);
			});

			it('should create a scene with a grid fitting into the given dimensions', function() {
				actualScene.drawables.should.eql([
					Grid.create(dimensions)
				]);
			});

		});		

	});

});