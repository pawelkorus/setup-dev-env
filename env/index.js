var vagrant = require('../vagrant');
var Promise = require('promise');
var fs = require('fs');
var path = require('path');

module.exports = exports = function(gulp, env) {
  gulp.task('env:init', wrap.bind(null, {env: env}, init));
  gulp.task('vagrant:up', vagrant.up());
  gulp.task('vagrant:suspend', vagrant.suspend());
  gulp.task('vagrant:destroy', vagrant.destroy());
}
Object.assign(exports, {
  init: function(options) { return wrap.bind(null, options, init); }
  ,up: vagrant.up
  ,down: vagrant.suspend
})

function wrap(options, func) {
	return new Promise(function(resolve, reject) {
		func(options, resolve, reject);
	});
}

function init(options, resolve, reject) {
	options = options || {};
	if(!options.env) throw new Error("Vagrant environment not selected.");
	var reader = fs.createReadStream(path.join(__dirname, options.env, 'Vagrantfile'));
	var writer = fs.createWriteStream('Vagrantfile');
	reader.pipe(writer);
	writer.on('finish', resolve);
	writer.on('error', reject);
}
