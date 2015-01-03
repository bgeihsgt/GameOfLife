var Cell = require('../../app/js/core/Cell.js'),
	hashes = require('../../app/js/lib/hashes.js');

describe('A cell', function () {

	var cell;

	describe('when converted to a rectangle', function() {

		var rectangle;

		describe('and in the top left corner', function() {

			beforeEach(function() {
				cell = new Cell(0, 0);

				rectangle = cell.toRectangle(20, 10, '#cccccc');
			});

			it('should have x and y of zero', function() {
				rectangle.x.should.equal(0);
				rectangle.y.should.equal(0);
			});

			it('should have width and height of given cellWidth and cellHeight', function() {
				rectangle.width.should.equal(20);
				rectangle.height.should.equal(10);
			});

			it('should have given fillColor', function() {
				rectangle.fillColor.should.equal('#cccccc');
			});

		});

		describe('and in the middle of the grid', function() {

			beforeEach(function() {
				cell = new Cell(3, 4);

				rectangle = cell.toRectangle(20, 10, '#cccccc');
			});

			it('should set x and y to the correct slot in the grid', function() {
				rectangle.x.should.equal(60);
				rectangle.y.should.equal(40);
			});

		});

	});

	describe('when checking equality', function() {

		var other;

		describe('with x and y equal', function() {

			beforeEach(function() {
				cell = new Cell(1, 2);
				other = new Cell(1, 2);
			});

			it('should be equal', function() {
				cell.equal(other).should.equal(true);
			});
			
		});

		describe('with same object', function() {

			beforeEach(function() {
				cell = new Cell(1, 2);
				other = cell;
			});

			it('should be equal', function() {
				cell.equal(other).should.equal(true);
			});
			
		});

		describe('with undefined', function() {

			beforeEach(function() {
				cell = new Cell(1, 2);
				other = undefined;
			});

			it('should be equal', function() {
				cell.equal(other).should.equal(false);
			});
			
		});

		describe('with different x', function() {

			beforeEach(function() {
				cell = new Cell(1, 2);
				other = new Cell(0, 2);
			});

			it('should be equal', function() {
				cell.equal(other).should.equal(false);
			});
			
		});

		describe('with different y', function() {

			beforeEach(function() {
				cell = new Cell(1, 2);
				other = new Cell(1, 1);
			});

			it('should be equal', function() {
				cell.equal(other).should.equal(false);
			});
			
		});

		describe('with a non cell', function() {

			beforeEach(function() {
				cell = new Cell(1, 2);
				other = { x: 1, y: 2};
			});

			it('should be equal', function() {
				cell.equal(other).should.equal(false);
			});
			
		});

	});

	describe('hash code', function() {

		beforeEach(function() {
			cell = new Cell(1, 1);
		});

		it('should be a standard hash on two integers', function() {
			cell.getHashCode().should.equal(32);
		});

	});

	describe('count neighbors', function() {

		var cells;

		beforeEach(function() {
			cell = new Cell(1, 1);
			cells = new hashes.HashSet();
		});

		it('should count no neighbors when given cells are empty', function() {
			cell.countNeighbors(cells).should.equal(0);
		});

		it('should not count itself', function() {
			cells.add(cell);

			cell.countNeighbors(cells).should.equal(0);
		});

		it('should not count more than one distance away', function() {
			cells.add(new Cell(-1, 1));
			cells.add(new Cell(1, -1));

			cell.countNeighbors(cells).should.equal(0);
		});

		it('should count above and to the left', function() {
			cells.add(new Cell(0, 2));

			cell.countNeighbors(cells).should.equal(1);
		});

		it('should count directly above', function() {
			cells.add(new Cell(1, 2));

			cell.countNeighbors(cells).should.equal(1);
		});

		it('should count above and to the right', function() {
			cells.add(new Cell(2, 2));

			cell.countNeighbors(cells).should.equal(1);
		});

		it('should count directly to the right', function() {
			cells.add(new Cell(2, 1));

			cell.countNeighbors(cells).should.equal(1);
		});

		it('should count below and to the right', function() {
			cells.add(new Cell(2, 0));

			cell.countNeighbors(cells).should.equal(1);
		});

		it('should count directly below', function() {
			cells.add(new Cell(1, 0));

			cell.countNeighbors(cells).should.equal(1);
		});

		it('should count below and to the left', function() {
			cells.add(new Cell(0, 0));

			cell.countNeighbors(cells).should.equal(1);
		});

		it('should could directly to the left', function() {
			cells.add(new Cell(0, 1));

			cell.countNeighbors(cells).should.equal(1);
		});

	});

});