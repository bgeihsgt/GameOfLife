var gulp = require('gulp'),
	mocha = require('gulp-mocha'),
	jshint = require('gulp-jshint'),
	should = require('should'),
	allJsSources = ['tests/**/*.js','app/**/*.js'],
	watchingTests = false;

function handleTestError(err) {
	console.log(err.toString());

	if (watchingTests) {
		this.emit('end');
		return;
	}

	process.exit(1);
}


gulp.task('lint', function() {
	return gulp.src(allJsSources.concat('gulpfile.js'))
			.pipe(jshint())
			.pipe(jshint.reporter('default'))
			.pipe(jshint.reporter('fail'));

});

gulp.task('test', ['lint'], function() {
	return gulp.src(allJsSources, { read: false })
		.pipe(mocha({ reporter: 'list', globals: [should]}).on('error', handleTestError));	

});

gulp.task('watch-tests', function() {
	watchingTests = true;
	return gulp.watch(allJsSources, ['test']);
});

gulp.task('build', ['test'], function() {
	return gulp.src('app/index.html')
		.pipe(gulp.dest('build'));
}); 