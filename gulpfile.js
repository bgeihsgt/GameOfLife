var gulp = require('gulp'),
	mocha = require('gulp-mocha'),
	jshint = require('gulp-jshint'),
	should = require('should'),
	watchingTests = false;



function handleTestError(err) {
	if (watchingTests) {
		this.emit('end');
		return;
	}
	
	console.log(err.toString());
	process.exit(1);
}


gulp.task('lint', function() {
	return gulp.src(['tests/**/*.js','app/**/*.js', 'gulpfile.js'])
			.pipe(jshint())
			.pipe(jshint.reporter('default'))
			.pipe(jshint.reporter('fail'));

});

gulp.task('test', ['lint'], function() {
	return gulp.src(['tests/**/*.js','app/**/*.js'], { read: false })
		.pipe(mocha({ reporter: 'list', globals: [should]}).on('error', handleTestError));	

});

gulp.task('watch-tests', function() {
	watchingTests = true;
	return gulp.watch('tests/**', ['test']);
});

gulp.task('build', ['test'], function() {
	return gulp.src('app/index.html')
		.pipe(gulp.dest('build'));
}); 