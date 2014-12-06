var GameOfLife = require('./gameoflife.js'),
	ResponsiveCanvas = require('../ui/ResponsiveCanvas.js'),
	Cell = require('./cell.js'),
	CellEvents = require('./cellevents.js'),
	gameSurface,
	game,
	cellEvents,
	responsiveCanvas;
	
	gameSurface = document.getElementById('game-surface');
	responsiveCanvas = ResponsiveCanvas.create(gameSurface, {
		roundWidthDownToNearest: 20,
		roundHeightDownToNearest: 20
	});

	game = new GameOfLife();
	cellEvents = new CellEvents({
		cellWidth: 20,
		cellHeight: 20
	});

	cellEvents.cellToggled.add(function(cell) {
		game.toggleCell(cell);
	});

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
		cellEvents.handleMouseDown(coordinates.x, coordinates.y);
	});

	responsiveCanvas.mouseWentUp.add(function(coordinates) {
		cellEvents.handleMouseUp(coordinates.x, coordinates.y);
	});

	responsiveCanvas.mouseMoved.add(function(coordinates) {
		cellEvents.handleMouseMove(coordinates.x, coordinates.y);
	});

	responsiveCanvas.resize();





