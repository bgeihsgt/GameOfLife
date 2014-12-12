module.exports.moveTo = function(x, y) {
	return {
		type: 'moveTo',
		x: x,
		y: y
	};
};

module.exports.lineTo = function(x, y) {
	return {
		type: 'lineTo',
		x: x,
		y: y
	};
};

module.exports.stroke = function() {
	return {
		type: 'stroke'
	};
};

module.exports.beginPath = function() {
	return {
		type: 'beginPath'
	};
};

module.exports.fillRect = function(x, y, width, height, fillStyle) {
	return {
		type: 'fillRect',
		x: x,
		y: y,
		width: width,
		height: height,
		fillStyle: fillStyle
	};
};