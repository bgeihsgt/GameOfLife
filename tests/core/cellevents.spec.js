var CellEvents = require('../../app/js/core/cellevents.js');

describe('Cell events', function() {

	var cellEvents;

	beforeEach(function() {
		cellEvents = new CellEvents({cellWidth: 5, cellHeight: 7});
	});

	describe('when the mouse goes down', function() {

		var toggledCells;

		beforeEach(function() {
			toggledCells = [];

			cellEvents.cellToggled.add(function(cell) {
				toggledCells.push(cell);
			});
		});

		describe('in the top left corner of a cell', function() {

			beforeEach(function() {
				cellEvents.handleMouseDown(0, 0);
			});

			it('should toggle the cell at its coordinates', function() {
				toggledCells[0].x.should.equal(0);
				toggledCells[0].y.should.equal(0);
			});

			describe('then the mouse moves to another part within the same cell', function() {

				beforeEach(function() {
					cellEvents.handleMouseMove(1, 0);
				});

				it('should not toggle any cells', function() {
					toggledCells.should.have.lengthOf(1);
				});

				describe('then the mouse moves to a different cell', function() {

					beforeEach(function() {
						cellEvents.handleMouseMove(5, 7);
					});

					it('should toggle that cell', function() {
						toggledCells[1].should.eql({x: 1, y: 1});
					});

					describe('then the mouse moves within the same cell', function() {
						beforeEach(function() {
							cellEvents.handleMouseMove(6, 7);
						});

						it('should not toggle that cell', function() {
							toggledCells.should.have.lengthOf(2);
						});
					});

					describe('then the mouse goes up', function() {
						beforeEach(function() {
							cellEvents.handleMouseUp(6, 7);
						});

						it('should not toggle that cell', function() {
							toggledCells.should.have.lengthOf(2);
						});

						describe('then the mouse moves to a different cell', function() {
							beforeEach(function() {
								cellEvents.handleMouseMove(10, 7);
							});

							it('should not toggle that cell', function() {
								toggledCells.should.have.lengthOf(2);
							});
						});
					});

				});

			});

		});

		describe('in the top left corner of another cell', function() {

			beforeEach(function() {
				cellEvents.handleMouseDown(10, 21);
			});

			it('should toggle the cell at its coordinates', function() {
				toggledCells[0].x.should.equal(2);
				toggledCells[0].y.should.equal(3);
			});
		});

		describe('in the bottom right corner of another cell', function() {

			beforeEach(function() {
				cellEvents.handleMouseDown(14, 27);
			});

			it('should toggle the cell at its coordinates', function() {
				toggledCells[0].x.should.equal(2);
				toggledCells[0].y.should.equal(3);
			});
		});


	});


});