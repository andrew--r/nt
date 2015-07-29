/**
*
* The packages we are using
* Not using gulp-load-plugins as it is nice to see whats here.
*
* npm link gulp && npm link browser-sync && npm link gulp-stylus && npm link gulp-autoprefixer && npm link gulp-uglify && npm link gulp-rename && npm link gulp-concat && npm link gulp.spritesmith && npm link gulp-htmlmin && npm link gulp-imagemin && npm link imagemin-pngquant && npm link gulp-zip
**/
var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var stylus       = require('gulp-stylus');
var prefix       = require('gulp-autoprefixer');
var uglify       = require('gulp-uglify');
var rename       = require("gulp-rename");
var concat       = require('gulp-concat');
var spritesmith  = require('gulp.spritesmith');
var htmlmin      = require('gulp-htmlmin');
var imagemin     = require('gulp-imagemin');
var pngquant     = require('imagemin-pngquant');
var zip          = require('gulp-zip');


/**
  ### Разработка ###
**/

// стили
gulp.task('compile:stylus', function() {
  gulp.src('./assets/stylus/main.styl')
  .pipe(stylus({ compress:  true }))
  .on('error', function (err) {
    console.error('Error!', err.message);
  })
  .pipe(prefix('last 3 versions', '> 1%', 'ie 8', 'Android 2', 'Firefox ESR'))
  .pipe(gulp.dest('./static/css'));
});

// скрипты
gulp.task('scripts', function() {
  gulp.src('./assets/js/**/*.js')
  .pipe(gulp.dest('./static/js'))
});

// спрайты
gulp.task('sprites', function () {
  var spriteData = gulp.src('./static/images/icons/*.*').pipe(spritesmith({
    imgName: 'sprite.png',
    imgPath: '../images/sprite.png',
    cssName: '_sprite.styl',
    cssFormat: 'stylus',
    algorithm: 'binary-tree',
    padding: 4,
    cssVarMap: function(sprite) {
      sprite.name = 'icon-' + sprite.name
    }
  }));
  spriteData.img.pipe(gulp.dest('./static/images/'));
  spriteData.css.pipe(gulp.dest('./assets/stylus/'));
});

// локальный сервер и live reload
gulp.task('browser-sync', function() {
  browserSync.init(['static/css/*.css', 'static/js/**/*.js', '*.html'], {
    server: {
      baseDir: './'
    }
  });
});

/**
  ### Сборка проекта для продакшена ###
**/
gulp.task('minify:markup', function() {
  return gulp.src('./*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./build'));
});

gulp.task('copy:images', function() {
  return gulp.src(['./static/images/**/*.*', '!./static/images/icons/*.*'])
    .pipe(gulp.dest('./build/static/images'));
});

gulp.task('copy:css', function() {
  return gulp.src('./static/css/**/*.*')
    .pipe(gulp.dest('./build/static/css'));
});

gulp.task('copy:scripts', function() {
  return gulp.src('./static/js/**/*.js')
    .pipe(gulp.dest('./build/static/js'));
});


gulp.task('build', ['sprites', 'compile:stylus', 'copy:css', 'copy:images', 'scripts', 'copy:scripts', 'minify:markup'], function() {
  return gulp.src(['./build/**/*', '!build/build.zip'])
    .pipe(zip('build.zip'))
    .pipe(gulp.dest('./build'));
});


// по умолчанию
gulp.task('default', ['browser-sync', 'compile:stylus', 'scripts', 'sprites'], function () {
  gulp.watch('assets/stylus/**/*.styl', ['compile:stylus']);
  gulp.watch('assets/js/**/*.js', ['scripts']);
  gulp.watch('static/images/icons/*.*', ['sprites']);
});