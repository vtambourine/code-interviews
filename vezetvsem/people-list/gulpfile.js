var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');
var webpack = require('webpack');

var src = {};
var watch = false;
var browserSync;

gulp.task('default', ['sync']);

gulp.task('clean', del.bind(null, ['.tmp', 'build/*', '!build/.git'], {dot: true}));

gulp.task('assets', function () {
    src.assets = [
        'src/assets/**',
        'src/content*/**/*.*',
        'src/templates*/**/*.*'
    ];
    return gulp.src(src.assets)
        .pipe($.changed('build'))
        .pipe(gulp.dest('build'))
});

gulp.task('bundle', function (done) {
    var started = false;
    var config = require('./webpack.config');
    var bundler = webpack(config);

    function bundle (error) {
        if (error) {
            throw new $.util.PluginError('webpack', error);
        }

        if (!started) {
            started = true;
            return done();
        }
    }

    if (watch) {
        bundler.watch(200, bundle);
    } else {
        bundler.run(bundle);
    }
});

gulp.task('build', ['clean'], function (done) {
    runSequence(['assets', 'bundle'], done);
});

gulp.task('build:watch', function (done) {
    watch = true;
    runSequence('build', function () {
        gulp.watch(src.assets, ['assets']);
        done();
    });
});

gulp.task('serve', ['build:watch'], function (done) {
    src.server = [
        'build/server.js',
        'build/content/**/*',
        'build/templates/**/*'
    ];

    var started = false;
    var cp = require('child_process');

    var server = (function startup () {
        var child = cp.fork('build/server.js');
        child.once('message', function (message) {
            if (message.match(/^online$/)) {
                if (browserSync) {
                    browserSync.reload();
                }
                if (!started) {
                    started = true;
                    gulp.watch(src.server, function () {
                        $.util.log('Restarting development server.');
                        server.kill('SIGTERM');
                        server = startup();
                    });
                    done();
                }
            }
        });
        return child;
    })();

    process.on('exit', function () {
        server.kill('SIGTERM');
    });
});

gulp.task('sync', ['serve'], function (done) {
    browserSync = require('browser-sync');

    browserSync({
        notify: false,
        https: false,
        proxy: 'localhost:5000',
        open: false
    }, done);

    process.on('exit', function () {
        browserSync.exit();
    });

    gulp.watch(['build/**/*.*'].concat(
        src.server.map(function (file) {return '!' + file;})
    ), function (file) {
        browserSync.reload(path.relative(__dirname, file.path));
    });
});
