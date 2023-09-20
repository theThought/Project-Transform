var gulp = require('gulp');

function buildStyles() {
    var sass = require('gulp-sass')(require('sass')),
        sourcemaps = require('gulp-sourcemaps'),
        replace = require('gulp-replace'),
        autoprefixer = require('autoprefixer'),
        postcss = require('gulp-postcss'),
        flatten = require('gulp-flatten');

    var sourcepath = 'Survey/source/styles/**/*.scss';
    var destpath = 'Survey/styles/';

    return gulp
        .src(sourcepath)
        .pipe(sourcemaps.init())
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(postcss([ autoprefixer({grid: 'autoplace'}) ]))
        .pipe(replace('/Survey/images/', '../images/'))
        .pipe(sourcemaps.write('.'))
        .pipe(flatten())
        .pipe(gulp.dest(destpath))
}

exports.default = function() {
    gulp.watch('Survey/source/styles/**/*.scss', {usePolling: true}, buildStyles);
};