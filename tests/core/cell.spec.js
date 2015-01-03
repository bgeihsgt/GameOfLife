var Cell = require('../../app/js/core/Cell.js');

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

});