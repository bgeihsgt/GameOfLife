var GameOfLife = require('./gameoflife.js'),
	ResponsiveCanvas = require('../ui/ResponsiveCanvas.js'),
	gameSurface,
	game,
	responsiveCanvas;
	
	gameSurface = document.getElementById('game-surface');
	responsiveCanvas = ResponsiveCanvas.create(gameSurface, {
		roundWidthDownToNearest: 20,
		roundHeightDownToNearest: 20
	});

	game = new GameOfLife();

	responsiveCanvas.resized.add(function(g, width, height) {

		game.toScene({
			width: width,
			height: height,
			cellWidth: 20,
			cellHeight: 20
		}).draw(g);
	});

	responsiveCanvas.mousedown.add(function(coordinates) {
		console.log(coordinates);
	});

	responsiveCanvas.mouseup.add(function(coordinates) {
		console.log(coordinates);
	});

	responsiveCanvas.mousemoved.add(function(coordinates) {
		console.log(coordinates);
	});

	responsiveCanvas.resize();





