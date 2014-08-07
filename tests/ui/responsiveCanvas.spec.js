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
			canvasElement.width.should.equal(450);
		});

		it('should set the height of its canvas element to given height', function() {
			canvasElement.height.should.equal(780);
		});

	});

	describe('when resized', function() {

		var actualGraphics,
			actualWidth,
			actualHeight;

		beforeEach(function() {
			responsiveCanvas.resized.add(function(g, width, height) {
				actualGraphics = g;
				actualWidth = width;
				actualHeight = height;
			});

			responsiveCanvas.resize(500, 300);
		});

		it('should set the canvas width to the given width', function() {
			canvasElement.width.should.equal(500);
		});

		it('should set the canvas height to the given height', function() {
			canvasElement.height.should.equal(300);
		});

		it('should fire the resized event with the proper parameters', function() {
			actualGraphics.canvas.should.equal(canvasElement);
			actualWidth.should.equal(500);
			actualHeight.should.equal(300);
		});
	});

});