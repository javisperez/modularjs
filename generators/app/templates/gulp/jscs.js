'use strict';

var gulp = require('gulp');
var paths = gulp.paths;
var $ = require('gulp-load-plugins')();
var srcFiles = [
    paths.srcApp + '/**/*.js',
    '!' + paths.srcApp + '/**/*.spec.js'
];

gulp.task('jscs', function () {

    return gulp.src(srcFiles)
        .pipe($.jscs());
});
