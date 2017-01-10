var gulp = require('gulp');
var path = require('path');
var express = require('express');
var php = require('php-proxy-middleware');
var wordpressInstaller = require('wordpress-installer');

var paths = {
  wordpress: path.join(__dirname, 'wordpress')
};

var options = {
	php: {
		root: paths.wordpress
		,port: 11000
		,address: '127.0.0.1'
		,execPath: 'php' // path to php
	},
	wordpress: {
		rootPath: paths.wordpress
		,dbName: 'wordpress'
		,dbUser: 'user'
		,dbPassword: 'password'
		,tablePrefix: 'wp_'
	}
};

var files = {
};

gulp.task('ensure-wordpress', function() {
	wordpressInstaller(options.wordpress).ensure();
});

gulp.task('build', []);

gulp.task('startPhp', ['ensure-wordpress'], function(cb) {
	var app = express();

	app.use(php(options.php));

	app.listen(10000);
})
