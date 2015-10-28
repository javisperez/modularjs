'use strict';

var gulp = require('gulp');

var paths = gulp.paths;

var util = require('util');

var browserSync = require('browser-sync');

function browserSyncInit(baseDir, files, browser) {

    browser = browser === undefined ? 'default' : browser;

    var routes = null;
    if (baseDir === paths.src || (util.isArray(baseDir) && baseDir.indexOf(paths.src) !== -1)) {
        routes = {
            '/bower_components': 'bower_components'
        };
    }

    browserSync.instance = browserSync.init(files, {
        startPath: '/',
        server: {
          baseDir: baseDir,
          routes: routes
        },
        browser: browser,
        notify: false
    });
}

gulp.task('serve', ['watch'], function () {
    browserSyncInit([
        paths.tmp + '/serve',
        paths.src
    ], [
        paths.tmpApp + '/**/*.css',
        paths.srcApp + '/**/*.js',
        paths.src + '/images/**/*',
        paths.tmp + '/serve/*.html',
        paths.tmpApp + '/**/*.html',
        paths.srcApp + '/**/*.html'
    ]);
});

gulp.task('serve:dist', ['build'], function () {
    browserSyncInit(paths.dist);
});
