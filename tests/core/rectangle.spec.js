var Rectangle = require('../../app/js/core/rectangle.js'),
	MockGraphics2d = require('./mockgraphics2d.js'),
	DrawingInstruction = require('./drawinginstruction.js');

describe('A rectangle', function() {

	var rectangle;	

	describe('when created', function() {


		beforeEach(function() {
			rectangle = new Rectangle(3, 7, 14, 56, '#cccccc');
		});

		it('should set its properties to given values', function() {
			rectangle.x.should.equal(3);
			rectangle.y.should.equal(7);
			rectangle.width.should.equal(14);
			rectangle.height.should.equal(56);
			rectangle.fillColor.should.equal('#cccccc');
		});

		describe('then drawn', function() {

			var mockGraphics2d;

			beforeEach(function() {
				mockGraphics2d = new MockGraphics2d();

				rectangle.draw(mockGraphics2d);
			});

			it('should send the correct drawing instructions', function() {
				mockGraphics2d.instructions.should.have.lengthOf(1);
				mockGraphics2d.instructions[0].should.eql(DrawingInstruction.fillRect(3, 7, 14, 56, '#cccccc'));
			});

		});

	});

});