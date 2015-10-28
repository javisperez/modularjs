'use strict';

var gulp = require('gulp');

var paths = gulp.paths;

var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

gulp.task('partials', function () {

    return gulp.src([paths.src + '/**/*.html'])
        .pipe($.minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe($.angularTemplatecache('templateCacheHtml.js', {
            module: "<%= _.camelCase(appname) %>"
        }))
        .pipe(gulp.dest(paths.tmp + '/partials/'));
});

gulp.task('html', ['inject', 'partials'], function () {

    var partialsInjectFile = gulp.src(paths.tmp + '/partials/templateCacheHtml.js', { read: false });
    var partialsInjectOptions = {
        starttag: '<!-- inject:partials -->',
        ignorePath: paths.tmp + '/partials',
        addRootSlash: false
    };

    var htmlFilter = $.filter('*.html');
    var jsFilter = $.filter('**/*.js');
    var cssFilter = $.filter('**/*.css');
    var assets;

    return gulp.src(paths.tmp + '/serve/*.html')
        .pipe($.inject(partialsInjectFile, partialsInjectOptions))
        .pipe(assets = $.useref.assets())
        .pipe($.rev())

        //Js related changes
        .pipe(jsFilter)
        .pipe($.ngAnnotate())
        .pipe($.uglify({preserveComments: $.uglifySaveLicense, mangle: false}))
        .pipe(jsFilter.restore())

        //CSS related changes
        .pipe(cssFilter)
        .pipe($.replace('../bootstrap-sass-official/assets/fonts/bootstrap', 'fonts'))
        .pipe($.csso())
        .pipe(cssFilter.restore())

        //Assets related changes
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe($.revReplace())

        //HTML related changes
        .pipe(htmlFilter)
        .pipe($.minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe(htmlFilter.restore())

        .pipe(gulp.dest(paths.dist + '/'))
        .pipe($.size({ title: paths.dist + '/', showFiles: true }));
});

gulp.task('images', function () {

    return gulp.src(paths.src + '/images/**/*')
        .pipe($.imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}]
        }))
        .pipe(gulp.dest(paths.dist + '/images/'));
});

gulp.task('fonts', function () {

    var fontsSource = $.mainBowerFiles().concat(paths.srcFonts + '/**/*');

    return gulp.src(fontsSource)
        .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
        .pipe($.flatten())
        .pipe(gulp.dest(paths.dist + '/fonts/'));
});

gulp.task('misc', function () {

    return gulp.src(paths.src + '/**/*.ico')
        .pipe(gulp.dest(paths.dist + '/'));
});

gulp.task('clean', function () {

    $.del.sync([paths.dist + '/', paths.tmp + '/']);

});

gulp.task('clean-dist', function () {

    $.del.sync([paths.dist + '/']);

});

gulp.task('build', ['clean-dist', 'html', 'images', 'fonts', 'misc']);
