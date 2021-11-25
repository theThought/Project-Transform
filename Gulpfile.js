var gulp = require('gulp');

function autoprefixer() {
    var autoprefixer = require('autoprefixer');
    var sourcemaps = require('gulp-sourcemaps');
    var postcss = require('gulp-postcss');

    return gulp.src('Survey/source/styles/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([ autoprefixer({grid: 'autoplace'}) ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('Survey/styles'))
}

exports.autoprefixer = autoprefixer;