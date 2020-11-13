var gulp = require('gulp');
var gulpNgConfig = require('gulp-ng-config');
var fs = require('fs');
var colors = require('colors');
var rename = require('gulp-rename');
var minimist = require('minimist');

/*
 * Environment setup
 */
var knownOptions = {
  string: 'env',
  default: {
    // Default environment is production
    env: process.env.APPLICATION_ENV || 'test'
  }
};
var options = minimist(process.argv.slice(2), knownOptions);
var env = options.env;

gulp.task('constants', function () {
  var file = 'constants-'+env+'.json';

  fs.stat('constants-local.json', function (err) {
    // Default env file is local
    if (err == null) {
      file = 'constants-local.json';
    }

    console.log(colors.black.bgGreen(file));

    gulp.src('./'+file)
      .pipe(gulpNgConfig('ZN.core'))
      .pipe(rename('constants.js'))
      .pipe(gulp.dest('./app/Application/core/'));
  });
});
