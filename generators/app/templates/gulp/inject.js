'use strict';

var gulp = require('gulp');

var paths = gulp.paths;

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;

gulp.task('inject', ['styles'], function () {

    var injectStyles = gulp.src([
        paths.tmp + '/**/*.css',
    ], { read: false });

    var injectScripts = gulp.src([
        paths.srcLang + '/*.js',
        paths.srcApp + '/**/*.js',
        '!' + paths.srcApp + '/**/*.spec.js',
        '!' + paths.srcApp + '/**/*.mock.js'
    ])
    .pipe($.using())
    .pipe($.angularFilesort());


    var injectOptions = {
        ignorePath: [paths.src, paths.tmp + '/serve'],
        addRootSlash: false
    };

    var wiredepOptions = {
        directory: 'bower_components',
        exclude: [/bootstrap-sass-official/, /bootstrap\.css/, /bootstrap\.css/, /foundation\.css/]
    };

    injectStyles
    .pipe($.using());

    gulp.src(paths.src + '/*.html')
        .pipe($.inject(injectStyles, injectOptions))
        .pipe($.inject(injectScripts, injectOptions))
        .pipe(wiredep(wiredepOptions))
        .pipe(gulp.dest(paths.tmp + '/serve'));

});
