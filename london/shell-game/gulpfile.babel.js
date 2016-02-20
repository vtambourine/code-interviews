'use strict';

import gulp from 'gulp';
import del from 'del';
import runSequence from 'run-sequence';
import browserSync from 'browser-sync';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

// Compile and automatically prefix stylesheets
gulp.task('styles', () => {
  const AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
  ];

  // For best performance, don't add Sass partials to `gulp.src`
  return gulp.src('src/**/*.scss')
    .pipe($.sass({
      precision: 10
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe($.size({title: 'styles'}))
    .pipe(gulp.dest('dist/'));
});

// Complile ES2015 code to single ES5 bundle.
gulp.task('scripts', () => {
    gulp.src([
      // 'babel-polyfill',
      'src/index.js'
    ])
        .pipe($.webpack({
            output: { filename: 'main.js' },
            module: {
              loaders: [
                { test: /\.js$/, loader: 'babel' }
              ]
            },
            devtool: 'source-map',
            watch: true
        }))
        .pipe($.size({ title: 'scripts' }))
        .pipe(gulp.dest('dist/'));
    }
);

// Clean output directory
gulp.task('clean', cb => del(['.tmp', 'dist/*', '!dist/.git'], {dot: true}));


// Build and serve the output from the dist build
gulp.task('serve', ['default'], () => {
  browserSync({
    open: false,
    notify: false,
    logPrefix: 'SHG',
    server: '.',
    port: 3001
  });

  gulp.watch(['*.html'], reload);
  gulp.watch(['src/**/*.scss'], ['styles', reload]);
  gulp.watch(['dist/**/*.js'], reload);
});

// Build production files, the default task
gulp.task('default', ['clean'], done =>
  runSequence(
    ['scripts', 'styles'],
    done
  )
);
