var CellEvents = require('../../app/js/core/cellevents.js');

describe('Cell events', function() {

	var cellEvents;

	beforeEach(function() {
		cellEvents = new CellEvents({cellWidth: 5, cellHeight: 7});
	});

	describe('when the mouse goes down', function() {

		var actualX,
			actualY,
			timesCalled;

		beforeEach(function() {
			timesCalled = 0;

			cellEvents.cellToggled.add(function(x, y) {
				actualX = x;
				actualY = y;
				timesCalled++;
			});
		});

		describe('in the top left corner of cell 0,0', function() {

			beforeEach(function() {
				cellEvents.handleMouseDown(0, 0);
			});

			it('should fire the cellToggled event at cell 0,0', function() {
				actualX.should.equal(0);
				actualY.should.equal(0);
			});

			describe('then the mouse moves to another part within the cell', function() {

				beforeEach(function() {
					cellEvents.handleMouseMove(1, 0);
				});

				it('should not toggle any cells', function() {
					timesCalled.should.equal(1);
				});

			});

		});

		describe('in the top left corner of cell 2,3', function() {

			beforeEach(function() {
				cellEvents.handleMouseDown(10, 21);
			});

			it('should fire the cellToggled event at the cell 2,3', function() {
				actualX.should.equal(2);
				actualY.should.equal(3);
			});
		});

		describe('in the bottom right corder of cell 2,3', function() {

			beforeEach(function() {
				cellEvents.handleMouseDown(14, 27);
			});

			it('should fire the cellToggled event at the cell 2,3', function() {
				actualX.should.equal(2);
				actualY.should.equal(3);
			});
		});


	});


});