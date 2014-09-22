var Scene = require('../../app/js/core/scene.js');
var Line = require('../../app/js/core/line.js');
var MockGraphics2d = require('./mockgraphics2d.js');

describe('A scene', function() {

	var scene,
		drawables;

	beforeEach(function() {
		drawables = [
			Line.from(3,2).to(6,2),
			Line.from(8,-1).to(-4,2),
			Line.from(3,-9).to(5,1)
		];
		scene = new Scene(drawables); 
	});

	describe('when drawn', function() {

		var mockGraphics;

		beforeEach(function() {
			mockGraphics = new MockGraphics2d();

			scene.draw(mockGraphics);
		});

		it ('should draw each of its drawables', function() {
			mockGraphics.instructions.should.have.lengthOf(9);
		});

	});


	

});