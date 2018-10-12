const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const connect = require('gulp-connect');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');

gulp.task('watch', function(){
     gulp.watch('src/**/*.scss', ['sass']);
     gulp.watch('src/**/*.pug', ['pug']);
     gulp.watch('src/js/**/*.js', ['scripts']);
});

gulp.task('sass',  function(){
    return gulp.src('src/sass/style.scss')
      .pipe(sourcemaps.init())
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
        }))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('assets/css'))
      .pipe(connect.reload())
});

gulp.task('pug', function(){
    return gulp.src('src/pug/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('./'))
        .pipe(connect.reload())

});

gulp.task('connect', function() {
    connect.server({
        root: './',
        livereload: true,
        port: 9000
    });
});

gulp.task('scripts', function() {
    return gulp.src(['./src/js/vendors/*.js','./src/js/partials/*.js'])
      .pipe(concat('scripts.js'))
      .pipe(gulp.dest('./assets/js'));
});

gulp.task('default', ['watch','connect']);