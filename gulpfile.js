var gulp = require('gulp')
	,path = require('path')
	,express = require('express')
	,php = require('php-proxy-middleware')
	,paths = {
    wordpress: path.join(__dirname, 'wordpress')
	}
	,options = {
		php: {
			root: paths.wordpress
			,port: 11000
			,address: '127.0.0.1'
		}
	}
	,files = {
	}
	;

gulp.task('build', []);

gulp.task('startPhp', [], function(cb) {
	var app = express();

	app.use(php(options.php));

	app.listen(10000);
})
