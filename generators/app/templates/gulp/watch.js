'use strict';

var gulp = require('gulp');

var paths = gulp.paths;

gulp.task('watch', ['inject', 'jscs', 'jshint'], function () {

    gulp.watch([
        paths.src + '/**/*.html',
        paths.srcStyles + '/**/*.scss',
        paths.srcApp + '/**/*.js',
        paths.srcApp + '/**/*.json',
        'bower.json'

    ], ['inject', 'jscs', 'jshint']);

});
