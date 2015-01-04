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
	mochaPhantomJs = require('gulp-mocha-phantomjs'),
	ftp = require('gulp-ftp'),
	tap = require('gulp-tap'),
	fs = require('fs'),
	S = require('string'),
	allSassSources = ['app/scss/**/*.scss'],
	allCoreSources = ['tests/core/**/*.js','app/**/*.js'],
	allUiSources = ['tests/ui/**/*.js'],
	allJsSources = allCoreSources.concat(allUiSources),
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
	return gulp.src(['build', 'testoutput'], { read: false })
			.pipe(clean());	
});


gulp.task('lint', function() {
	return gulp.src(allJsSources.concat('gulpfile.js'))
			.pipe(jshint())
			.pipe(jshint.reporter('default'))
			.pipe(jshint.reporter('fail'));

});

gulp.task('test', ['lint'], function() {
	return gulp.src(allCoreSources.concat('!app/js/core/app.js'), { read: false })
		.pipe(mocha({ reporter: 'list', globals: [should]}).on('error', handleTestError));	

});

gulp.task('uitests', ['lint', 'browserify-uitests'], function() {
	return gulp.src('tests/ui/runner.html')
		 .pipe(gulp.dest('testoutput'))
		.pipe(mochaPhantomJs());
});

gulp.task('browserify-uitests', function() {
	var specFilenames = fs.readdirSync('tests/ui').filter(function(filename) {
		return S(filename).endsWith('.spec.js');
	});

	specFilenames.forEach(function(specFilename) {
		var bundleStream = browserify('./tests/ui/' + specFilename).bundle();
		bundleStream
		.pipe(source(specFilename))		
		.pipe(gulp.dest('testoutput'));
	});
});

gulp.task('fonts', ['clean'], function() {
	return gulp.src('node_modules/bootstrap-sass/assets/fonts/bootstrap/glyphicons-halflings-regular.*')
			.pipe(rename({
				dirname: 'bootstrap'
			}))
			.pipe(gulp.dest('build/fonts'));

});

gulp.task('css',['fonts'], function() {
	return gulp.src(allSassSources)
			.pipe(sass())
			.pipe(minifyCss())
			.pipe(gulp.dest('build/css'));
});

gulp.task('watch', function() {
	watchingTests = true;
	
	gulp.watch(allSources, ['build']);
});

gulp.task('browserify', function() {
	var bundleStream = browserify('./app/js/core/app.js').bundle();

	return bundleStream
		.pipe(source('app.js'))		
		.pipe(gulp.dest('build/js'))
		.pipe(streamify(uglify()))
		.pipe(rename('app.min.js'))
		.pipe(gulp.dest('build/js'));
});

gulp.task('build', ['clean', 'test', 'uitests', 'css', 'browserify'], function() {
	return gulp.src(['app/index.html'])
		.pipe(gulp.dest('build'));
}); 

gulp.task('deploy', ['build'], function() {
	var ftpInfo = JSON.parse(fs.readFileSync('ftp.json', 'utf-8'));

	return gulp.src('build/**/*')
		.pipe(ftp({
			host: ftpInfo.host,
			user: ftpInfo.username,
			pass: ftpInfo.password
		}));
});