var Point = require('../../app/js/point.js');

describe('A point', function() {

	var point;

	beforeEach(function() {
		point = new Point(3, 4);
	});


	it('has an x an y coordinate', function() {
		point.x.should.equal(3);
		point.y.should.equal(4);
	});

});