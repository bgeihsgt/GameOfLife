var GameOfLife = require('../../app/js/core/gameoflife.js');
var Grid = require('../../app/js/core/grid.js');
var Cell = require('../../app/js/core/cell.js');

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

		describe('then adding a cell', function() {

			beforeEach(function() {
				gameOfLife.addCell(new Cell(4, 5));
			});

			it('should have the cell in its living cells collection', function() {
				gameOfLife.livingCells[0].x.should.equal(4);
				gameOfLife.livingCells[0].y.should.equal(5);
			});

		});

	});

});