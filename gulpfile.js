var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json')
// var babel = require('gulp-babel');
// var concat = require('gulp-concat'); 

function sassCompile(cb) {
    return gulp.src('app/scss/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/css'));
    cb();
}


function watch() {
    gulp.watch('app/scss/*.scss', sassCompile);
    gulp.watch('app/js/*.ts', typescript);
    // gulp.watch('app/js/*.js', babelCompile);
}


function typescript(cb) {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest('app/js/dist'))
    cb();
}

// function babelCompile() {
//     return gulp.src('app/js/*.js')
//         .pipe(sourcemaps.init())
//         .pipe(babel())
//         .pipe(concat('all.js'))
//         .pipe(sourcemaps.write('.'))
//         .pipe(gulp.dest('app/js/dist'));
// }

exports.sass = sassCompile;

exports.watch = watch;

exports.ts = typescript;

// exports.babel = babelCompile;





