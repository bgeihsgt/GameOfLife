var Line = require('./line');

var Grid = function(options) {
	this.columnLines = options.columnLines;
	this.rowLines = options.rowLines;
};


function createColumnLines(width, height, cols) {
	var columnLines = [],
		columnWidth = width / cols,
		columnX;

	for (columnX = columnWidth; columnX < width; columnX += columnWidth) {
		columnLines.push(Line.from(columnX, 0).to(columnX, height));
	}

	return columnLines;
}

function createRowLines(width, height, rows) {
	var rowLines = [],
		rowHeight = height / rows,
		rowY;

	for (rowY = rowHeight; rowY < height; rowY += rowHeight) {
		rowLines.push(Line.from(0, rowY).to(width, rowY));
	}

	return rowLines;
}

Grid.forCanvas = function(options) {	

	var columnLines = createColumnLines(options.width, options.height, options.cols);
	var rowLines = createRowLines(options.width, options.height, options.rows);

	return new Grid({
		columnLines: columnLines,
		rowLines: rowLines
	});
};



module.exports = Grid;