var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    // connect = require('gulp-connect'),
    livereload = require('gulp-livereload'),
    stylus = require('gulp-stylus')

// gulp.task('connect', function() {

//     connect.server({
//         root: '',
//         livereload: true
//     })
// })

// Lint JS
// TODO
gulp.task('lint', function() {
    return gulp.src('src/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
})

gulp.task('reload', function() {

    livereload.reload()
})

gulp.task('stylus', function() {

    return gulp.src('stylus/*.styl')
        .pipe(stylus())
        .pipe(gulp.dest('./public/css'))

})

// var server = livereload({ start: true })

// livereload.listen()

// Watch Our Files
// TODO
gulp.task('watch', function() {    

    livereload.listen()

    gulp.watch('**.html', ['reload'])

    gulp.watch('src/*.js', ['lint', 'reload'])

    gulp.watch('stylus/*.styl', ['stylus', 'reload'])
})

// Default
gulp.task('default', ['watch'])
gulp.task('test', ['lint'])

