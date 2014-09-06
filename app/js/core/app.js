var Grid = require('./grid'),
	ResponsiveCanvas = require('../ui/ResponsiveCanvas.js'),
	gameSurface,
	responsiveCanvas;
	
	gameSurface = document.getElementById('game-surface');
	responsiveCanvas = ResponsiveCanvas.create(gameSurface, {
		roundWidthDownToNearest: 20,
		roundHeightDownToNearest: 20
	});

	responsiveCanvas.resized.add(function(g, width, height) {

		Grid.create({
			width: width,
			height: height,
			cellWidth: 20,
			cellHeight: 20
		}).draw(g);
	});

	responsiveCanvas.resize();





