var gulp = require('gulp');
var gutil = require("gulp-util");
var webpackConfig = require('./webpack.config');
var webpack = require('webpack')(webpackConfig);

gulp.task('default', ['build'], function () {
    gulp.watch('src/page/**/*.html', ['page']);
    gulp.watch('src/page/**/*.css', ['styles']);
    gulp.watch('src/**/*.js', ['scripts']);
});

gulp.task('build', ['page', 'styles', 'scripts']);

gulp.task('page', function () {
    gulp.src('src/page/**/*.html').pipe(gulp.dest('build'));
});

gulp.task('styles', function () {
    gulp.src('src/page/**/*.css').pipe(gulp.dest('build'));
});

gulp.task('scripts', function (done) {
    webpack.run(function (error) {
        if (error) {
            throw new gutil.PluginError('webpack', error);
        }
        done();
    });
});

