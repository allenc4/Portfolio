const {src, dest, watch, series} = require('gulp');

const plumber = require('gulp-plumber');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const wait = require('gulp-wait');
const babel = require('gulp-babel');;
const rename = require('gulp-rename');

function runScripts() {
    return src(['./js/*.js', '!./js/*.min.js'])
        .pipe(plumber(plumber({
            errorHandler: function(err) {
                console.log(err);
                this.emit('end');
            }
        })))
        .pipe(babel({
            presets: [['@babel/env', {modules:false}]]
        }))
        .pipe(uglify({
            output: {
                comments: '/^!/'
            }
        }))
        .pipe(rename({extname: '.min.js'}))
        .pipe(dest('./js'));

}

function runStyles() {
    return src('./scss/*.scss')
        .pipe(wait(250))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(dest('./css'));
}

function watchFiles(cb) {
    watch(['./js/*.js', '!./js/*.min.js'], runScripts);
    watch('./scss/*.scss', runStyles);
}
exports.runScripts = runScripts;
exports.runStyles = runStyles;
exports.watch = watchFiles;

exports.default = series(runScripts, runStyles);