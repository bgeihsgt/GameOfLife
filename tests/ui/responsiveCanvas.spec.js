var ResponsiveCanvas = require('../../app/js/ui/ResponsiveCanvas');

describe('A responsive canvas', function() {
 
	var canvasElement,
		responsiveCanvas;

	beforeEach(function() {
		canvasElement = document.createElement('canvas');
		responsiveCanvas = new ResponsiveCanvas(canvasElement, 450, 780); 
	});

	describe('when initialized', function() {

		it('should set the width of its canvas element to given width', function() {
			canvasElement.width.should.eql(450);
		});

		it('should set the height of its canvas element to given height', function() {
			canvasElement.height.should.eql(780);
		});

	});

	describe('when resized', function() {

		beforeEach(function() {
			responsiveCanvas.resize(500, 300);
		});

		it('should set the canvas width to the given width', function() {
			canvasElement.width.should.eql(500);
		});

		it('should set the canvas height to the given height', function() {
			canvasElement.height.should.eql(300);
		});

	});

});