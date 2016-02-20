import gulp from 'gulp';
import babel from 'gulp-babel';

var browserSync = require('browser-sync').create();

gulp.task('scripts', () => {
    return gulp.src('source/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('build'));
});

gulp.task('assets', () => {
    var assets = [
        'images/**/*',
        'index.html'
    ];

    return gulp.src(assets, {base: '.'})
        .pipe(gulp.dest('build'));
});

gulp.task('serve', ['build'], () => {
    browserSync.init({
        server: {
            baseDir: './build'
        },
        open: false
    });
});

gulp.task('build', ['scripts', 'assets'])

gulp.task('default', ['build']);
