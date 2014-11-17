var GameOfLife = require('./gameoflife.js'),
	ResponsiveCanvas = require('../ui/ResponsiveCanvas.js'),
	Cell = require('./cell.js'),
	gameSurface,
	game,
	responsiveCanvas;
	
	gameSurface = document.getElementById('game-surface');
	responsiveCanvas = ResponsiveCanvas.create(gameSurface, {
		roundWidthDownToNearest: 20,
		roundHeightDownToNearest: 20
	});

	game = new GameOfLife();
	game.addCell(new Cell(3,3));

	responsiveCanvas.resized.add(function(g, width, height) {

		game.toScene({
			width: width,
			height: height,
			cellWidth: 20,
			cellHeight: 20,
			livingCellColor: '#cccccc'
		}).draw(g);
	});

	responsiveCanvas.mouseWentDown.add(function(coordinates) {
		console.log(coordinates);
	});

	responsiveCanvas.mouseWentUp.add(function(coordinates) {
		console.log(coordinates);
	});

	responsiveCanvas.mouseMoved.add(function(coordinates) {
		console.log(coordinates);
	});

	responsiveCanvas.resize();





