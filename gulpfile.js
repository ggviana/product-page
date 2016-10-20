const gulp        = require('gulp')
const concat      = require('gulp-concat')
const htmlmin     = require('gulp-htmlmin')
const postcss     = require('gulp-postcss')
const uglify      = require('gulp-uglify')
const sass        = require('gulp-sass')
const browserSync = require('browser-sync')
const runSequence = require('run-sequence')
const reload      = browserSync.reload

// PostCSS plugins
const autoprefixer = require('autoprefixer')
const cssnano      = require('cssnano')

gulp.task('default', ['build'], () => {
  browserSync
    .init({
      port: 8080,
      server: 'dist/'
    })

  gulp.watch('src/javascript/*.js', ['javascript']).on('change', reload)
  gulp.watch('src/sass/*.scss', ['css'])
  gulp.watch('src/*.html', ['html']).on('change', reload)
    
})

gulp.task('build', () => 
  runSequence(['css', 'javascript', 'html']))

gulp.task('html', () => gulp
  .src('src/*.html')
  .pipe(htmlmin())
  .pipe(gulp.dest('dist/')))

gulp.task('javascript', () => gulp
  .src('src/javascript/*.js')
  .pipe(concat('app.js'))
  .pipe(uglify())
  .pipe(gulp.dest('dist/')))

gulp.task('css', () => gulp
  .src('src/sass/_index.scss')
  .pipe(sass())
  .pipe(postcss([
    autoprefixer({ browsers: ['last 1 version'] }),
    cssnano()
  ]))
  .pipe(gulp.dest('dist/'))
  .pipe(browserSync.stream()))

