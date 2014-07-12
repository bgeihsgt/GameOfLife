var gulp = require('gulp');

gulp.task('build', function() {
	return gulp.src('app/index.html')
		.pipe(gulp.dest('build'));
}); 