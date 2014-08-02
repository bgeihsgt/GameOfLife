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