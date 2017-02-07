var gulp = require('gulp');
var url = require('url');
var path = require('path');
var express = require('express');
var proxy = require('proxy-middleware');
var wordpressInstaller = require('wordpress-installer');

var paths = {
  wordpress: path.join(__dirname, 'wordpress')
};

var options = {
	php: {
		root: paths.wordpress
		,port: 17999
		,address: '127.0.0.1'
		,execPath: 'php' // path to php
	},
	wordpress: {
		rootPath: paths.wordpress
		,dbName: 'wordpress'
		,dbUser: 'root'
		,dbPassword: 'root'
		,tablePrefix: 'wp_'
	}
};

var files = {
};

gulp.task('ensure-wordpress', function() {
	wordpressInstaller(options.wordpress).ensure();
});

gulp.task('build', []);

gulp.task('develop', ['ensure-wordpress'], function(cb) {
	var app = express();

	app.use(proxy(url.parse('http://127.0.0.1:17999')));

	app.listen(10000);
})
