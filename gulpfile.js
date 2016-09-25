var gulp = require('gulp'),
    php = require('gulp-connect-php'),
    browserSync = require('browser-sync'),
    sass = require('gulp-sass');

var reload  = browserSync.reload;
// START PHP SERVER
gulp.task('php', function() {
    php.server({ base: 'public', port: 8000, keepalive: true});
});

// Start browsersync with php server
gulp.task('browser-sync',['php'], function() {
    browserSync({
        proxy: '127.0.0.1:8000',
        port: 8000,
        open: true,
        notify: false
    });
});
// Sass compiler
gulp.task('sass', function () {
    return gulp.src('./sources/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/assets/styles'));
});
// Run browser-sync and sass on default run
gulp.task('default', ['browser-sync', 'sass'], function () {
    // Watch php files for changes, if true reload browser
    gulp.watch(['public/**/*.php'], [reload]);
    // Watch css files for changes, if true reload browser
    gulp.watch('./sources/scss/**/*.scss', ['sass', reload]);
});