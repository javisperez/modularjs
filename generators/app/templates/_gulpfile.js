'use strict';

var gulp = require('gulp');

gulp.paths = {
    src: 'src',
    dist: 'dist',
    build: 'build-output',
    tmp: '.tmp'
};

gulp.paths.tmpStyles   = gulp.paths.tmp + '/serve/styles';
gulp.paths.srcApp      = gulp.paths.src + '/app';
gulp.paths.srcFonts    = gulp.paths.src + '/fonts';
gulp.paths.srcViews    = gulp.paths.src + '/views';
gulp.paths.srcStyles   = gulp.paths.src + '/styles';
gulp.paths.tmpPartials = gulp.paths.tmp + '/partials';

require('require-dir')('./gulp');

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});
