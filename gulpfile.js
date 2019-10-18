var gulp = require('gulp')
var sass = require('gulp-sass')


gulp.task('sass', function () {
	return gulp.src('./sass/**/*.scss')
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(gulp.dest('./target/static/css/1.0.0'))
})
gulp.task('default');





