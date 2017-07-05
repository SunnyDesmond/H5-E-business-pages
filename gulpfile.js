var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass'),
  minifyCss = require('gulp-clean-css'),
  livereload = require('gulp-livereload'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer')


// 默认路径
var paths = {
  src: 'src/',
  dist: 'dist/'
}


//复制文件
gulp.task('copy', function() {

  gulp.src([paths.src + 'img/*.{jpg,png,gif,ico}'])
    .pipe(gulp.dest(paths.dist + 'img'))
    .pipe(livereload());

  gulp.src([paths.src + 'lib/*/*.*'])
    .pipe(gulp.dest(paths.dist + 'lib/'))
    .pipe(livereload());

  gulp.src([paths.src + 'fonts/*.*'])
    .pipe(gulp.dest(paths.dist + 'fonts/'))
    .pipe(livereload());

});



// 压缩js
gulp.task('uglifyRename', function() {
  gulp.src(paths.src + 'js/*.js')
    .pipe(uglify()) //压缩
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.dist + 'js'))
    .pipe(livereload());
});

//编译sass并且压缩
gulp.task('sass2css', function() {
  //postcss plugin
  var plugins = [
    autoprefixer({ browsers: ['> 1%'], cascade: false })
  ];
  gulp.src(paths.src + 'sass/*.scss')
    .pipe(sass())
    .pipe(postcss(plugins)) //带上厂商前缀，对相关css做兼容处理
    .pipe(minifyCss())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.dist + 'css'))
    .pipe(livereload());
});

//copy html 文件
gulp.task('copyHtml', function() {
  gulp.src(paths.src + 'html/*.html')
    .pipe(gulp.dest(paths.dist + 'html'))
    .pipe(livereload());

});

//copy img 文件
gulp.task('copyImg', function() {
  gulp.src(paths.src + 'img/*.*')
    .pipe(gulp.dest(paths.dist + 'img'))
    .pipe(livereload());
})


//创建监听任务
gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(paths.src + 'js/*.js', ['uglifyRename']); //监听js文件
  gulp.watch(paths.src + 'sass/*.scss', ['sass2css']); //监听 css
  gulp.watch(paths.src + 'html/*.html', ['copyHtml']); //监听html
  gulp.watch(paths.src + 'img/*.*', ['copyImg']); //监听img
});

gulp.task('default', ['watch', 'copyHtml', 'uglifyRename', 'sass2css', 'copy'], function() {
  console.log("--finish all--")
});