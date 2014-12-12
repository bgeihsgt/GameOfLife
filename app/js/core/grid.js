var Line = require('./line');

var Grid = function(options) {
	this.columnLines = options.columnLines;
	this.rowLines = options.rowLines;
};

Grid.prototype.draw = function(g) { 
	g.beginPath();
	this.columnLines.forEach(function(l) { l.draw(g); });
	this.rowLines.forEach(function(l) { l.draw(g); });
	g.stroke();
};


function createColumnLines(width, height, cellWidth) {
	var columnLines = [],
		columnWidth = cellWidth,
		columnX;

	for (columnX = columnWidth + 0.5; columnX < width; columnX += columnWidth) {
		columnLines.push(Line.from(columnX, 0).to(columnX, height));
	}

	return columnLines;
}

function createRowLines(width, height, cellHeight) {
	var rowLines = [],
		rowHeight = cellHeight,
		rowY;

	for (rowY = rowHeight + 0.5; rowY < height; rowY += rowHeight) {
		rowLines.push(Line.from(0, rowY).to(width, rowY));
	}

	return rowLines;
}

Grid.create = function(options) {	

	var columnLines = createColumnLines(options.width, options.height, options.cellWidth);
	var rowLines = createRowLines(options.width, options.height, options.cellHeight);

	return new Grid({
		columnLines: columnLines,
		rowLines: rowLines
	});
};



module.exports = Grid;