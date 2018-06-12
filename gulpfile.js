var gulp 			= 	require('gulp'),
	autoprefixer 	= 	require('autoprefixer'),
	postcss 		= 	require('gulp-postcss'),
	sass 			= 	require('gulp-sass'),
	browserify  	= 	require('gulp-browserify'),
	connect  		= 	require('gulp-connect'),
	sourcemaps 		= 	require('gulp-sourcemaps'),
	gulpif 			= 	require('gulp-if'),
	uglify 			= 	require('gulp-uglify-es').default,
	minifyHtml 		= 	require('gulp-minify-html'),
	minifyJson 		= 	require('gulp-jsonminify'),
	imagemin 		= 	require('gulp-imagemin'),
	preload 	    = 	require('gulp-image-preload'),
	pngcrush 		= 	require('imagemin-pngcrush'),
	concat  		= 	require('gulp-concat');

var env,
	htmlSources,
	sassSources,
	sassFiles,
	jsSources,
	jsonSources,
	outputDir,
	sassStyle,
	root_dev,
	root_prod;

root_dev = 'builds/development/';
root_prod = 'builds/production/';
htmlSources = [outputDir+'*.html'];
sassSources = ['components/sass/style.scss'];
sassFiles = ['components/sass/*.scss'];
jsonSources = [outputDir+'js/*.json'];
jsSources = 'components/scripts/**/*.js';

env = process.env.NODE_ENV || 'development';

if (env==='development') {
	outputDir = root_dev;
	sassStyle = 'expanded';
}else{
	outputDir = root_prod;
	sassStyle = 'compressed';
}

gulp.task('js', function(){
	gulp.src(jsSources)
	.pipe(concat('script.js'))
	.pipe(browserify())
	.pipe( gulpif( env === 'production', uglify() ) )

	.pipe(gulp.dest(outputDir+'js'))
	.pipe(connect.reload())
});

gulp.task('css', function(){
	return gulp.src(sassSources)
	.pipe(sourcemaps.init())
	.pipe(sass({
		file: 'components/sass',
		outputStyle: sassStyle, 
		indentType: 'tab',
		indentWidth: '1'
	}).on('error', sass.logError))
	.pipe(postcss([
		autoprefixer('last 2 versions')
	]))
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest(outputDir+'css'))
	.pipe(connect.reload())
});

gulp.task('html', function(){
	gulp.src(root_dev+'*.html')
	.pipe(gulpif(env === 'production', minifyHtml()))
	.pipe(gulpif(env === 'production', gulp.dest(outputDir)))
	.pipe(connect.reload())
});

gulp.task('json', function(){
	gulp.src(root_dev+'js/*.json')
	.pipe(gulpif(env === 'production', minifyJson()))
	.pipe(gulpif(env === 'production', gulp.dest(root_prod+'js')))
	.pipe(connect.reload())
});

gulp.task('imagepreload', function () {
  gulp.src(root_dev+'image/**/*.{png,jpg,gif,jpeg}')
    .pipe(gulpif(env === 'production', preload({
        inline: "index.html"
    })))
    .pipe(gulp.dest('/'))
    .pipe(connect.reload());
});

gulp.task('images', function(){
	gulp.src(root_dev+'images/**/*.*')
	.pipe(gulpif(env === 'production', imagemin({
		progressive:true,
		svgoPlugins:[{removeViewBox:false}],
		use:[pngcrush()]
	})))
	.pipe(gulpif(env === 'production', gulp.dest(outputDir+'images')))
	.pipe(connect.reload())
});

gulp.task('videos', function(){
	gulp.src(root_dev+'videos/**/*.*')
	.pipe(gulpif(env === 'production', gulp.dest(outputDir+'videos')))
	.pipe(connect.reload())
});

gulp.task('watch', function(){
	gulp.watch(jsSources, ['js']);
	gulp.watch(sassFiles, ['css']);
	gulp.watch(root_dev+'js/*json', ['json']);
	gulp.watch(root_dev+'*.html', ['html']);
	gulp.watch(root_dev+'images/**/*.*', ['imagepreload']);
	gulp.watch(root_dev+'images/**/*.*', ['images']);
	gulp.watch(root_dev+'videos/**/*.*', ['videos']);
});

gulp.task('connect', function(){
	connect.server({
		root:outputDir,
		livereload:true
	});
});

gulp.task('default', ['html', 'css', 'js', 'json', 'imagepreload', 'images', 'videos', 'connect', 'watch']);




