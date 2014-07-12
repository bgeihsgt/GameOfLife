var gulp = require('gulp'),
	mocha = require('gulp-mocha');
	should = require('should'),
	watchingTests = false;



function handleTestError(err) {
	console.log(err.toString());
	
	if (watchingTests) {
		this.emit('end');
		return;
	}

	process.exit(1);
}


gulp.task('test', function() {
	return gulp.src('tests/**/*.spec.js', { read: false })
		.pipe(mocha({ reporter: 'list', globals: [should]}).on('error', handleTestError));
		

});

gulp.task('watch-tests', function() {
	watchingTests = true;
	return gulp.watch('tests/**', ['test']);
})

gulp.task('build', ['test'], function() {
	return gulp.src('app/index.html')
		.pipe(gulp.dest('build'));
}); 