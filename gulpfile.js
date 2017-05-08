// 引入gulp模块
// commonjs规范引用模块
var gulp=require('gulp');
var sass=require('gulp-sass');

//这里创建gulp任务
//用来编译sass文件
gulp.task('compileSass',function(){
	// 先查找sass文件所在位置
	gulp.src('src/sass/*.scss')

	// 通过pipe方法导入到gulp的插件实现编译sass     expanded展开
	.pipe(sass({outputStyle:'expanded'}).on('error',sass.logError))

	// 编译后的文件输出
	.pipe(gulp.dest('src/css'));
});

// 监听文件修改
gulp.task('jtSass',function(){
	gulp.watch('src/sass/index.scss',['compileSass']);
});

// 同步任务
var browserSync=require('browser-sync');
gulp.task('server',function(){
	browserSync({
		// server:'./src',
		proxy:'http://localhost/mypj/',


		file:['./src/sass/*.html','./src/sass/*.css']
	});
	gulp.watch('src/sass/*.scss',['compileSass']);

	// browserSync({
	//     server: {
	//       baseDir: ['dist']
	//     },
	// }, 
	// function(err, bs) {
	// 	console.log(bs.options.getIn(["urls", "local"]));
	// });

	// gulp.watch('src/styles/*.less',['style']);
	// gulp.watch('src/scripts/*.js',['script']);
	// gulp.watch('src/images/*.*',['image']);
	// gulp.watch('src/*.html',['html']);
});