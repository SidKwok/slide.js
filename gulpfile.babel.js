import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import BrowserSync from 'browser-sync';

const $ = gulpLoadPlugins();
const browserSync = BrowserSync.create();

gulp.task('js',
    () => gulp.src('./src/js/*.js')
        .pipe($.size())
        .pipe($.plumber())
        .pipe($.babel())
        .pipe(gulp.dest('./dist/js'))
        .pipe($.uglify())
        .pipe($.rename({ extname: '.min.js'}))
        .pipe(gulp.dest('./dist/js'))
        .pipe($.size())
        .pipe($.size({gzip: true})));

gulp.task('css',
    () => gulp.src('./src/css/*.css')
        .pipe($.plumber())
        .pipe($.autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./dist/css')));

gulp.task('default', ['js', 'css'],() => {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });

    gulp.watch('./src/js/*.js', ['js']);
    gulp.watch('./src/css/*.css', ['css']);
    gulp.watch(['./index.html', './src/js/*.js', './src/css/*.css']).on('change', browserSync.reload);
});
