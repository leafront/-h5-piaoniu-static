var gulp = require('gulp')
var sass = require('gulp-sass')


gulp.task('sass', function () {
	return gulp.src('./sass/**/*.scss')
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(gulp.dest('./dist/static/css'))
})
gulp.task('default');





