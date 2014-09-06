var ResponsiveCanvas = require('../../app/js/ui/ResponsiveCanvas');

describe('A responsive canvas', function() {
 
	var canvasElement,
		responsiveCanvas;

	beforeEach(function() {
		canvasElement = document.createElement('canvas');
		canvasElement.style.width = '100%';
		canvasElement.style.height = '100%';
		document.body.appendChild(canvasElement);

		responsiveCanvas = new ResponsiveCanvas(canvasElement); 
	});

	afterEach(function() {
		document.body.removeChild(canvasElement);
	});

	describe('when initialized', function() {

		it('should set the width of its canvas element to given width', function() {
			canvasElement.offsetWidth.should.be.greaterThan(0);
			canvasElement.width.should.equal(canvasElement.offsetWidth);
		});

		it('should set the height of its canvas element to given height', function() {
			canvasElement.offsetHeight.should.be.greaterThan(0);
			canvasElement.height.should.equal(canvasElement.offsetHeight);
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

			canvasElement.style.width = '50%';
			canvasElement.style.height = '77%';

			responsiveCanvas.resize();
		});

		it('should set the canvas width to the given width', function() {
			canvasElement.width.should.equal(canvasElement.offsetWidth);
		});

		it('should set the canvas height to the given height', function() {
			canvasElement.height.should.equal(canvasElement.offsetHeight);
		});

		it('should fire the resized event with the proper parameters', function() {
			actualGraphics.canvas.should.equal(canvasElement);
			actualWidth.should.equal(canvasElement.width);
			actualHeight.should.equal(canvasElement.height);
		});
	});

});