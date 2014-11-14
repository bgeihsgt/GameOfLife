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

});