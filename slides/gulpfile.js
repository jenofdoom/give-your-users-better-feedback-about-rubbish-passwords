// Include gulp & plugins
const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const minifyCSS = require('gulp-clean-css');
const nodesass = require('gulp-sass');

// Paths setup
const PATHS = {
  'src': {
    'css': './css/theme/source/*.scss'
  },
  'dist': {
    'css': './css/theme/'
  }
}

// Turn sass into css, autoprefix and minify
gulp.task('scss', () => {
  return gulp.src(PATHS.src.css)
    .pipe(nodesass({
      includePaths: [] // any node_modules css file paths can be included here so they are available for @import statements in .scss files
    })
    .on('error', nodesass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false,
      remove: false
    }))
    .pipe(minifyCSS())
    .pipe(gulp.dest(PATHS.dist.css));
});

// Watch files for changes
gulp.task('watch', () => {
  gulp.watch('css/**/*', ['scss']);
});

// Build
gulp.task('build', ['scss']);

// Default task (build before watching)
gulp.task('default', ['build', 'watch']);
