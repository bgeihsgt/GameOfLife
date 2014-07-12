var Point = require('../app/js/point.js');

describe('A point', function() {

	describe('with given coordinates', function() {

		beforeEach(function() {
			point = new Point(3, 4);
		});

		it('should have those coordinates', function() {
			point.x.should.equal(3);
			point.y.should.equal(4);
		});

	});

});