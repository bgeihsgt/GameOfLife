var ResponsiveCanvas = require('../../app/js/ui/ResponsiveCanvas');

describe('A responsive canvas', function() {
 
	var canvasElement,
		canvasContainer,
		responsiveCanvas,
		style;

	beforeEach(function() {
		var css = '#canvas-element { width: 100%; height: 100%; border: 1px solid black; box-sizing: content-box; }';

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
				canvasElement.clientWidth.should.equal(501);
				canvasElement.width.should.equal(canvasElement.clientWidth);				
			});

			it('should set the height of its canvas element to the canvas element style height', function() {
				canvasElement.clientHeight.should.equal(809);
				canvasElement.height.should.equal(canvasElement.clientHeight);
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
				canvasElement.clientWidth.should.equal(101);
				canvasElement.width.should.equal(canvasElement.clientWidth);
			});

			it('should set the canvas height to the given height', function() {
				canvasElement.clientHeight.should.equal(307);
				canvasElement.height.should.equal(canvasElement.clientHeight);
			});

			it('should fire the resized event with the proper parameters', function() {
				actualGraphics.canvas.should.equal(canvasElement);
				actualWidth.should.equal(canvasElement.width);
				actualHeight.should.equal(canvasElement.height);
			});
		});

		describe('when clicked', function() {

			var actualCoordinates;

			beforeEach(function() {
				responsiveCanvas.clicked.add(function(coordinates) {
					actualCoordinates = coordinates;
				});

				responsiveCanvas.click(7, 9);
			});


			it('should fire the clicked event with the clicked coordinates', function() {
				actualCoordinates.x.should.equal(7);
				actualCoordinates.y.should.equal(9);
			});
		});

		describe('when mouse down', function() {

			var actualCoordinates;

			beforeEach(function() {
				responsiveCanvas.mousedown.add(function(coordinates) {
					actualCoordinates = coordinates;
				});

				responsiveCanvas.signalMouseDown(7, 9);
			});


			it('should fire the clicked event with the clicked coordinates', function() {
				actualCoordinates.x.should.equal(7);
				actualCoordinates.y.should.equal(9);
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
			canvasElement.clientWidth.should.equal(180);
			canvasElement.width.should.equal(180);
		});

		it('should round the height down to the given configuration', function() {			
			canvasElement.clientHeight.should.equal(200);
			canvasElement.height.should.equal(200);
		});

	});

	
});