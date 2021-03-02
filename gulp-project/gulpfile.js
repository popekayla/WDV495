const { src, dest, watch, parallel, series } = require("gulp");
const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require("browser-sync").create();
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const useref = require('gulp-useref');
const cleanCSS = require('gulp-clean-css');
const gulpIf = require('gulp-if');
const del = require('del');


//Spins up a local sever to display the index page of 'app' and refreshes when scss, js, html files are updated
function sync() {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
    
    
    watch('app/js/**/*.js').on('change', browserSync.reload);
    watch('app/scss/**/*.scss', generateCSS);
    watch('app/*.html').on('change', browserSync.reload);
}

//Converts SCSS files to CSS files
function generateCSS(cb) {
    src('app/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream()); //Allows browserSync to inject new CSS styles into browser when task is run
    cb()
}

//Optimizes Images
function imageMinify(cb) {
    src('/images/**/*')
        .pipe(imagemin())
        .pipe(dest('/dist/images'))
    cb();
}

//Optimizes JS and CSS files
function minify (cb) {
    src('app/*.html')
        .pipe(useref())
        .pipe(dest('dist'))
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', cleanCSS()))
        .pipe(dest('dist'))
    cb();
};

//Moves font files to dist folder
function fonts(cb) {
    src('app/fonts/*')
        .pipe(dest('dist/fonts'))
    cb();
}

//Deletes the 'dist' folder to prevent previously generated but now unused files from sticking around
async function cleanDist() {
    return del.sync('dist');
}

//Command that watches for scss changes to convert to css and refreshes the browser on change of css, js, html files
exports.default = parallel(sync, generateCSS);

//Command that optimizes and bundles all files into a dist folder
exports.build = series(
    cleanDist, generateCSS, 
    parallel(
        minify, imageMinify, fonts)
);