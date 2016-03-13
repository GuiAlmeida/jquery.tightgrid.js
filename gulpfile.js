var gulp    = require('gulp');
var uglify  = require('gulp-uglify');
var babel   = require('gulp-babel');
var rename  = require('gulp-rename');
var plumber = require('gulp-plumber');

gulp.task('build', () => {
  gulp.src('jquery.tightgrid.js')
    .pipe(plumber())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('dist'))
    .pipe(rename('jquery.tightgrid.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
});

gulp.task('watch', ['build'], () => {
  gulp.watch('jquery.tightgrid.js', ['build']);
});

gulp.task('default', ['build']);