var gulp = require('gulp');

function buildStyles() {
    var sass = require('gulp-sass')(require('sass')),
        sourcemaps = require('gulp-sourcemaps'),
        autoprefixer = require('autoprefixer'),
        postcss = require('gulp-postcss');

    return gulp.src('Survey/source/styles/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(postcss([ autoprefixer({grid: 'autoplace'}) ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('Survey/styles'))
}

exports.default = function() {
    gulp.watch('Survey/source/styles/*.scss', buildStyles);
};