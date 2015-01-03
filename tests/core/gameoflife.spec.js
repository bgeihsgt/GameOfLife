var GameOfLife = require('../../app/js/core/gameoflife.js');
var Grid = require('../../app/js/core/grid.js');
var Cell = require('../../app/js/core/cell.js');
var Rectangle = require('../../app/js/core/rectangle.js');

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
					cellHeight: 29,
					backgroundColor: '#ffffff'
				};

				actualScene = gameOfLife.toScene(dimensions);
			});

			it('should create a scene with a grid fitting into the given dimensions', function() {
				actualScene.drawables.should.eql([
					new Rectangle(0, 0, 134, 78, '#ffffff'),
					Grid.create(dimensions)
				]);
			});

		});

		describe('then toggling a cell', function() {

			var cell,
				changed;

			beforeEach(function() {
				changed = false;
				cell = new Cell(4, 5);
				gameOfLife.changed.add(function() {
					changed = true;
				});

				gameOfLife.toggleCell(cell);
			});

			it('should have the cell in its living cells collection', function() {
				gameOfLife.livingCells[0].x.should.equal(4);
				gameOfLife.livingCells[0].y.should.equal(5);
			});

			it('should notify that the game changed', function() {
				changed.should.equal(true);
			});

			describe('then rendering', function() {

				var sceneOptions,
					scene;

				beforeEach(function() {
					sceneOptions = {
						width: 145,
						height: 987,
						cellWidth: 45,
						cellHeight: 32,
						livingCellColor: '#123456',
						backgroundColor: '#ffffff'
					};

					scene = gameOfLife.toScene(sceneOptions);
				});

				it('should convert the cell to a rectangle and add it to the scene', function() {
					scene.drawables.should.eql([
						new Rectangle(0, 0, 145, 987, '#ffffff'),
						cell.toRectangle(45, 32, '#123456'),
						Grid.create(sceneOptions)						
					]);
				});

			});

			describe('then toggling a different cell', function() {

				beforeEach(function() {
					cell = new Cell(5, 5);

					gameOfLife.toggleCell(cell);
				});

				it('should add the cell to the living cells collection', function() {
					gameOfLife.livingCells[1].x.should.equal(5);
					gameOfLife.livingCells[1].y.should.equal(5);
				});

			});

			describe('then toggling the same cell', function() {

				beforeEach(function() {
					cell = new Cell(4, 5);

					gameOfLife.toggleCell(cell);
				});

				it('should remove that cell from the living cells collection', function() {
					gameOfLife.livingCells.should.have.lengthOf(0);
				});

			});

		});

		describe('when calculating the next generation', function() {

			function shouldContainCell(x, y) {
				return gameOfLife.livingCells.some(function(c) {
					return c.x === x && c.y === y;
				});
			}

			describe('in any circumstance', function() {

				var called;

				beforeEach(function() {
					called = false;

					gameOfLife.changed.add(function() {
						called = true;
					});

					gameOfLife.nextGeneration();
				});

				it('should fire the changed event', function() {
					called.should.equal(true);
				});

			});

			describe('a cell with no neighbors', function() {

				beforeEach(function() {
					cell = new Cell(4, 5);

					gameOfLife.toggleCell(cell);

					gameOfLife.nextGeneration();
				});


				it('should die in the next generation', function() {
					gameOfLife.livingCells.should.have.lengthOf(0);
				});

			});

			describe('a cell with 2 neighbors', function() {

				beforeEach(function() {
					gameOfLife.toggleCell(new Cell(4, 5));
					gameOfLife.toggleCell(new Cell(3, 5));
					gameOfLife.toggleCell(new Cell(5, 5));

					gameOfLife.nextGeneration();
				});

				it('should live in the next generation', function() {
					shouldContainCell(4,5).should.equal(true);
				});

			});

		});

	});

});