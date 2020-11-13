var gulp = require('gulp');

//watch
gulp.task('live', function () {
  //watch .scss files
  gulp.watch('app/assets/css/sass/**/*', ['styles']);

  //watch .js files
  gulp.watch('app/tests/unit/**/**/*.js', ['tdd']);
});
