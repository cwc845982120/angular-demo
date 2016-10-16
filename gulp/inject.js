var gulp = require('gulp');
var inject = require('gulp-inject');
var wiredep = require('wiredep').stream;

//给index.html引入css与js文件
//如果是要在<!-- bower:js -->
//          <!-- endinject -->中引入文件则替换代码（加name属性）
//          .pipe(inject(gulp.src('src/js/bower_components/*/*.min.js', {read: false}), {name: 'bower', relative: true}))
gulp.task('devIndex', function () {
    // It's not necessary to read the files (will speed up things), we're only after their paths:
    return gulp.src('src/index.html')
        .pipe(inject(gulp.src('src/css/*.css', {read: false}), {relative: true}))
        .pipe(inject(gulp.src(['src/js/controllers/*.js','src/js/services/*.js'] ,{read: false}), {relative: true}))
        .pipe(gulp.dest('src/'));
});

gulp.task('bower', function () {
    gulp.src('src/index.html')
        .pipe(wiredep({
            optional: 'configuration',
            goes: 'here'
        }))
        .pipe(gulp.dest('src'));
});