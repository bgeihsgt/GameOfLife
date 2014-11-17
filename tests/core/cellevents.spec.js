var CellEvents = require('../../app/js/core/cellevents.js');

describe('Cell events', function() {

	var cellEvents;

	beforeEach(function() {
		cellEvents = new CellEvents();
	});

	describe('when the mouse goes down in the top left corner', function() {

		var actualX;
		var actualY;

		beforeEach(function() {
			cellEvents.cellToggled.add(function(x, y) {
				actualX = x;
				actualY = y;
			});

			cellEvents.handleMouseDown(0, 0);
		});

		it('should fire the cellToggled event at the right coordinates', function() {
			actualX.should.equal(0);
			actualY.should.equal(0);
		});

	});


});