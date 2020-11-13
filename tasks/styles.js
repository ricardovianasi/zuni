var gulp = require('gulp');
var compass = require('gulp-compass');

//styles
gulp.task('styles', function () {
  gulp.src(['app/assets/css/sass/**/*'])
    .pipe(compass({
      config_file: 'config.rb',
      css: 'app/assets/css/compiled/',
      sass: 'app/assets/css/sass/',
      sourcemap: true
    }))
});
