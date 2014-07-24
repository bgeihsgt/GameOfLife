var Grid = require('./grid'),
	gameSurface,
	graphics2d;
	
gameSurface = document.getElementById('game-surface');
graphics2d = gameSurface.getContext('2d');

Grid.forCanvas({
	width: gameSurface.width,
	height: gameSurface.height,
	rows: 50,
	cols: 40
}).draw(graphics2d);


