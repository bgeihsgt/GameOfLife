var gulp = require('gulp'),
	mocha = require('gulp-mocha'),
	jshint = require('gulp-jshint'),
	should = require('should'),
	clean = require('gulp-clean'),
	source = require('vinyl-source-stream'),
	rename = require('gulp-rename'),
	browserify = require('browserify'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	minifyCss = require('gulp-minify-css'),
	streamify = require('gulp-streamify'),
	allSassSources = ['app/scss/**/*.scss'],
	allJsSources = ['tests/**/*.js','app/**/*.js'],
	allSources = allJsSources.concat('app/index.html').concat(allSassSources),
	watchingTests = false;

function handleTestError(err) {
	console.log(err.toString());

	if (watchingTests) {
		this.emit('end');
		return;
	}

	process.exit(1);
}

gulp.task('clean', function() {
	return gulp.src('build', { read: false })
			.pipe(clean());	
});


gulp.task('lint', function() {
	return gulp.src(allJsSources.concat('gulpfile.js'))
			.pipe(jshint())
			.pipe(jshint.reporter('default'))
			.pipe(jshint.reporter('fail'));

});

gulp.task('test', ['lint'], function() {
	return gulp.src(allJsSources.concat('!app/js/app.js'), { read: false })
		.pipe(mocha({ reporter: 'list', globals: [should]}).on('error', handleTestError));	

});

gulp.task('css', function() {
	return gulp.src(allSassSources)
			.pipe(sass())
			.pipe(minifyCss())
			.pipe(gulp.dest('app/css'));
});

gulp.task('watch', function() {
	watchingTests = true;
	
	return gulp.watch(allSources, ['build']);
});

gulp.task('browserify', function() {
	var bundleStream = browserify('./app/js/app.js').bundle();

	return bundleStream
		.pipe(source('app.js'))		
		.pipe(gulp.dest('build'))
		.pipe(streamify(uglify()))
		.pipe(rename('app.min.js'))
		.pipe(gulp.dest('build'));
});

gulp.task('build', ['clean', 'test',  'css', 'browserify'], function() {
	return gulp.src(['app/index.html', 'app/css/*.css'])
		.pipe(gulp.dest('build'));
}); 