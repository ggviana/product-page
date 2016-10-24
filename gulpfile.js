const gulp        = require('gulp')
const concat      = require('gulp-concat')
const htmlmin     = require('gulp-htmlmin')
const postcss     = require('gulp-postcss')
const uglify      = require('gulp-uglify')
const stylus      = require('gulp-stylus')
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

  gulp
    .watch('src/javascript/*.js', ['javascript'])
    .on('change', reload)

  gulp
    .watch('src/stylus/*.styl', ['css'])
    .on('change', reload)

  gulp
    .watch('src/*.html', ['html'])
    .on('change', reload)
})

gulp.task('build', () => 
  runSequence(['css', 'javascript', 'html', 'copy-assets']))

gulp.task('copy-assets', () => gulp
  .src('node_modules/chico/dist/assets/*')
  .pipe(gulp.dest('dist/assets')))

gulp.task('html', () => gulp
  .src('src/*.html')
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest('dist/')))

gulp.task('javascript', () => gulp
  .src([
    'node_modules/chico/dist/ui/chico.js',
    'src/javascript/*.js'
  ])
  .pipe(concat('app.js'))
  .pipe(uglify())
  .pipe(gulp.dest('dist/')))

gulp.task('css', () => gulp
  .src('src/stylus/_index.styl')
  .pipe(stylus({
    paths: ['node_modules'],
    'include css': true
  }))
  .pipe(concat('styles.css'))
  .pipe(postcss([
    autoprefixer({ browsers: ['last 1 version'] }),
    cssnano()
  ]))
  .pipe(gulp.dest('dist/')))

