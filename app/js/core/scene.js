var Scene = function(drawables) {
	this.drawables = drawables;
}; 

Scene.prototype.draw = function(g) {
	this.drawables.forEach(function(drawable) {
		drawable.draw(g);
	});
};

module.exports = Scene;