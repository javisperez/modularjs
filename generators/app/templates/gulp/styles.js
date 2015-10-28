'use strict';

var gulp = require('gulp');

var paths = gulp.paths;

var $ = require('gulp-load-plugins')();

gulp.task('styles', function () {

    var sassOptions = {
        style: 'expanded',
        errLogToConsole: true
    };

    var injectFiles = gulp.src([
        paths.srcStyles + '/**/*.scss',
        '!' + paths.srcStyles + '/main.scss'
    ], { read: false });

    var injectOptions = {
        transform: function(filePath) {
            filePath = filePath.replace(paths.src + '/app/', '');
            return '@import \'' + filePath + '\';';
        },
        starttag: '// injector',
        endtag: '// endinjector',
        addRootSlash: false
    };

    var indexFilter = $.filter('main.scss');

    var stream = gulp.src([
        paths.srcStyles + '/main.scss'
    ])
        .pipe(indexFilter)
        .pipe($.inject(injectFiles, injectOptions))
        .pipe(indexFilter.restore())
        .pipe($.sass(sassOptions))
        .on('error', function handleError (err) {
            console.error(err.toString());
            this.emit('end');
        })
        .pipe($.autoprefixer())
        .pipe(gulp.dest(paths.tmp + '/serve/styles/'));

    return stream;
});
