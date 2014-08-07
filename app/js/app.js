var Grid = require('./grid'),
	ResponsiveCanvas = require('../ui/ResponsiveCanvas.js'),
	gameSurface,
	responsiveCanvas;
	
	gameSurface = document.getElementById('game-surface');
	responsiveCanvas = new ResponsiveCanvas(gameSurface, window.width, window.height);

	responsiveCanvas.resized.add(function(g, width, height) {

		Grid.create({
			width: width,
			height: height,
			cellWidth: 20,
			cellHeight: 20
		}).draw(graphics2d);		
	});

	responsiveCanvas.resize(300, 400);





