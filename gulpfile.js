var gulp = require('gulp'),
    htmlmin = require('gulp-htmlmin'),
    inlineCss = require('gulp-inline-css'),
    awspublish = require('gulp-awspublish'),
    plumber = require('gulp-plumber'),
    size = require('gulp-size'),
    gls = require('gulp-live-server'),
    imagemin = require('gulp-imagemin');

// use gulp --prod
var env = (gutil.env.prod  === true) ? 'prod' : 'dev';

// Start a livereload server in 3000 port with dist content
// and watching templates folder
gulp.task('serve', ['clean', 'inline'], function() {

    var server = gls.static('dist', 3000);
    server.start();

    //use gulp.watch to trigger server actions(notify, start or stop)
    gulp.watch(['templates/**/*.html'], function (file) {
        server.notify.apply(server, [file]);
    });

    gulp.watch('templates/**/*.html', ['inline']);
});

// Just watch templates folder
gulp.task('watch', function(done){
    gulp.watch('templates/**/*.html', ['inline'])
});

// Clean dist folder
gulp.task('clean', function(clean) {
    return del([
        './dist/**/*'
    ], clean);
});

// @TODO Build dist folder uploading images to Amazon S3
gulp.task('build', ['clean'], function(done){

});

// Get css files and style tag content and put inline
gulp.task('inline', function(done){
    return gulp.src('templates/**/*.html')
        .pipe(inlineCss({
	        	applyStyleTags: true,
	        	applyLinkTags: true,
	        	removeStyleTags: true,
	        	removeLinkTags: true
        }))
        .pipe(size())
        .pipe(gulp.dest('dist/'))
        .on('end', done);
});
