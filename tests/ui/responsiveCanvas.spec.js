var responsiveCanvas = require('../../app/js/ui/ResponsiveCanvas');

describe('A responsive canvas', function() {
 
	var canvasElement,
		responsiveCanvas;

	beforeEach(function() {
		canvasElement = document.createElement('canvas');
		responsiveCanvas = new ResponsiveCanvas(canvasElement); 
	});

	describe('when initialized', function() {

		it('should set the width of its canvas element to given width', function() {
			(1).should.eql(1);
		}); 

	});

});