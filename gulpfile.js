var gulp = require('gulp');
var wrench = require('wrench');
var browserSync = require('browser-sync').create();
var watch = require('gulp-watch');
var eslint = require('gulp-eslint');
var gulpIf = require('gulp-if');

/**
 *  This will load all js or coffee files in the gulp directory
 *  in order to load all gulp tasks
 *  cwc－－将以js|coffee结尾的文件过滤出来
 *  cwc－－ 除了gulp/dev-template中的文件，其余所有的以js｜coffee结尾的文件全部导入
 */
wrench.readdirSyncRecursive('./gulp').filter(function(file) {
    return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
    if (!(file.indexOf('dev-template') == 0)) {
        require('./gulp/' + file);
    }
});

gulp.task('eslint', function() {
    return gulp.src(['src/js/**/*.js','!src/js/lib/**/*.js','!src/js/common/rsa/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
});

/**
 *  Default task clean temporaries directories and launch the
 *  main optimization build task
 */
gulp.task('default',['eslint','inject'],function() {
    gulp.run('serve');
});

//端口3000
gulp.task('serve', function () {
    browserSync.init({
        startPath: '/src',
        server: {
            baseDir: '.'
        }
    });

    gulp.watch('src/**/*.*').on('change', browserSync.reload);
});
