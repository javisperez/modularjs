'use strict';

var gulp = require('gulp'),
    wiredep = require('wiredep'),
    paths = gulp.paths,
    karma = require('karma').server,
    _ = require('lodash'),
    glob = require('glob'),
    util = require('gulp-util');

var karmaRunner = function (done, singleRun, options) {

    var bowerDeps, testFiles = [];

    bowerDeps = wiredep({
        directory: 'bower_components',
        exclude: ['bootstrap-sass-official'],
        dependencies: true,
        devDependencies: true
    });

    glob.sync(paths.src + '/**/*.js', {nosort: true}).forEach(function (file) {
        testFiles.push(file);
    });

    testFiles = bowerDeps.js.concat(testFiles);

    if (util.env.debug) {
        console.log('--- LISTING FILES START ---');
        console.log(testFiles);
        console.log('--- LISTING FILES END ---');
    }

    options = _.extend({}, {

        // autoWatch : false,
        frameworks: ['jasmine'],
        browsers: ['PhantomJS'], //, 'Chrome'
        plugins: [
            'karma-phantomjs-launcher',
            'karma-chrome-launcher',
            'karma-junit-reporter',
            'karma-coverage',
            'karma-jasmine'
        ],
        singleRun: singleRun || true,
        files: testFiles

    }, options || {});

    karma.start(options, done);
};

gulp.task('test', function (done) {

    karmaRunner(done, true, {
        browsers: ['Chrome']
    });
});

gulp.task('test:watch', function (done) {

    karmaRunner(done, false, {
        browsers: ['Chrome']
    });
});

gulp.task('test:build', function (done) {

    karmaRunner(done, true, {

        browsers: ['PhantomJS'],

        reporters: ['junit', 'coverage'],

        // the junit configuration
        junitReporter: {
            outputFile: paths.build + '/karma-junit-results.xml',
            suite: ''
        },

        preprocessors: {
            // these files will be instrumented by Istanbul
            'src/**/*.js' : ['coverage']
        },

        // configure the reporter
        coverageReporter: {
            type : 'html',
            dir : paths.build + '/coverage/'
        }
    });
});
