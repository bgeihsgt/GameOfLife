var ResponsiveCanvas = require('../../app/js/ui/ResponsiveCanvas');

describe('A responsive canvas', function() {
 
	var canvasElement,
		canvasContainer,
		responsiveCanvas,
		style;

	beforeEach(function() {
		var css = '#canvas-element { width: 100%; height: 100%; }';

		style = document.createElement('style');
		style.appendChild(document.createTextNode(css));

		document.head.appendChild(style);

		canvasContainer = document.createElement('div');		
		canvasElement = document.createElement('canvas');
		canvasElement.id = 'canvas-element';

		canvasContainer.appendChild(canvasElement);
		document.body.appendChild(canvasContainer);		

		canvasContainer.style.width = '501px';
		canvasContainer.style.height = '809px';
	});

	afterEach(function() {
		canvasContainer.removeChild(canvasElement);
		document.body.removeChild(canvasContainer);
		document.head.removeChild(style);
	});

	describe('without options', function() {

		beforeEach(function() {
			responsiveCanvas = new ResponsiveCanvas(canvasElement);
		});

		describe('when initialized', function() {

			it('should set the width of its canvas element to the canvas element style width', function() {
				canvasElement.offsetWidth.should.equal(501);
				canvasElement.width.should.equal(canvasElement.offsetWidth);				
			});

			it('should set the height of its canvas element to the canvas element style height', function() {
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

				canvasContainer.style.width = '101px';
				canvasContainer.style.height = '307px';

				responsiveCanvas.resize();
			});

			it('should set the canvas width to the given width', function() {
				canvasElement.offsetWidth.should.equal(101);
				canvasElement.width.should.equal(canvasElement.offsetWidth);
			});

			it('should set the canvas height to the given height', function() {
				canvasElement.offsetHeight.should.equal(307);
				canvasElement.height.should.equal(canvasElement.offsetHeight);
			});

			it('should fire the resized event with the proper parameters', function() {
				actualGraphics.canvas.should.equal(canvasElement);
				actualWidth.should.equal(canvasElement.width);
				actualHeight.should.equal(canvasElement.height);
			});
		});


		
	});

	describe('with rounding', function() {

		beforeEach(function() {
			canvasContainer.style.width = '197px';
			canvasContainer.style.height = '203px';

			responsiveCanvas = new ResponsiveCanvas(canvasElement, {
				roundWidthDownToNearest: 20,
				roundHeightDownToNearest: 10
			});
		});
		
		it('should round the width down to the given configuration', function() {			
			canvasElement.offsetWidth.should.equal(180);
			canvasElement.width.should.equal(180);
		});

		it('should round the height down to the given configuration', function() {			
			canvasElement.offsetHeight.should.equal(200);
			canvasElement.height.should.equal(200);
		});

	});

	
});