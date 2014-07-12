var gulp = require('gulp'),
	mocha = require('gulp-mocha');
	should = require('should');

gulp.task('test', function() {
	return gulp.src('tests/**/*.spec.js')
		.pipe(mocha({ reporter: 'nyan', globals: [should]}));

})

gulp.task('build', ['test'], function() {
	return gulp.src('app/index.html')
		.pipe(gulp.dest('build'));
}); 