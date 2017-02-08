module.exports = exports = {
	php: function(options) { php.bind(null, options); }
}

var url = require('url');
var express = require('express');
var proxy = require('proxy-middleware');

function php(options, cb) {
	var port = options.port || 10000;
	var app = express();
	app.use(proxy(url.parse('http://127.0.0.1:17999')));
	app.listen(port);
}
