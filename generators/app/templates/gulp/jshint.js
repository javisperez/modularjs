'use strict';

var gulp = require('gulp');
var paths = gulp.paths;
var $ = require('gulp-load-plugins')();

var srcFiles = [
    paths.srcApp + '/**/*.js',
    '!' + paths.srcApp + '/**/*.spec.js'
];

gulp.task('jshint', function () {

    return gulp.src(srcFiles)
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'));
});

gulp.task('jshint:build', function () {

    return gulp.src(srcFiles)
        .pipe($.jshint())
        .pipe($.jshint.reporter('default'))
        .pipe($.jshint.reporter('fail'));
});
