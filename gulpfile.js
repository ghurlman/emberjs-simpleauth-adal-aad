/// <binding Clean='clean' />
/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp'),
    shell = require('gulp-shell'),
    del = require('del'),
    dnx = require('gulp-dnx');

gulp.task('clean', function(cb) {
  return del(['wwwroot/**/*','tmp/**'], cb);
});

gulp.task('embercleanbuild', ['emberbuild'], function() {
	del('tmp/**');
})

gulp.task('emberbuild', shell.task([
	'ember build'
]));

gulp.task('emberwatch', shell.task([
  'ember build -w'
]));

gulp.task('dnx-run', dnx('web'));

gulp.task('watch', function() {
  gulp.watch(['app/**/*', 'config/**/*', 'public/**/*', 'vendor/**/*', 'tests/**/*'], ['embercleanbuild']);
  
  //gulp.watch(['*.json', '*.cs', 'ApiControllers/**/*.cs'], ['clrbuild']);
});

gulp.task('prodbuild', ['embercleanbuild'], function() {
	dnx.build();
})

gulp.task('default', ['embercleanbuild', 'watch', 'dnx-run']);

