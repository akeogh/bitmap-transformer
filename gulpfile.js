var gulp = require('gulp');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');

var appFiles = ['index.js', __dirname + '/lib/**/*.js'];
var testFiles = ['gulpfile.js', 'test/**/*.js'];

gulp.task('jshint:apps', function() {
  return gulp.src(appFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('jshint:tests', function() {
  return gulp.src(testFiles)
    .pipe(jshint({node: true,
      globals: {
        describe:true,
        it:true
      }
  })).pipe(jshint.reporter('default'));
});

gulp.task('jshint', ['jshint:apps', 'jshint:tests']);

gulp.task('mocha', function() {
  return gulp.src(__dirname + '/test/tests.js', {read: false})
    .pipe(mocha());
});

gulp.task('watch', function() {
  gulp.watch(appFiles, ['jshint:apps', 'mocha']);
  gulp.watch(testFiles, ['jshint:tests']);
});

gulp.task('default', ['watch']);
