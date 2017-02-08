module.exports = exports = {
	init: function(options) { return init.bind(null, options); }
	,up: function(options) { return wrap.bind(null, options, up); }
	,suspend: function(options) { return suspend.bind(null, options); }
	,destroy: function(options) { return wrap.bind(null, options, destroy); }
}

var spawn = require('child_process').spawn;
var fs = require('fs');
var path = require('path');
var promise = require('promise');

function wrap(options, func) {
	return new Promise(function(resolve, reject) {
		func(options, resolve, reject);
	});
}

function init(options, cb) {
	options = options || {};
	if(!options.env) throw new Error("Vagrant environment not selected.");
	return fs.createReadStream(path.join(__dirname, options.env, 'Vagrantfile')).pipe(fs.createWriteStream('Vagrantfile'));
}

function up(options, resolve, reject) {
	spawn('vagrant', ['up']).on('exit', function(code) {
		if(code == 0) {
			console.log('Vagrant instance is up.');
			resolve();
		} else {
			reject('Can\'t bring vagrant instance up.');
		}
	});
}

function suspend(options, cb) {
	return new Promise(function(resolve, reject) {
		spawn('vagrant', ['suspend']).on('exit', function(code) {
			if(code == 0) {
				console.log('Vagrant instance is suspended.');
				resolve();
			} else {
				reject('Can\'t suspend vagrant instance.');
			}
		});
	});
}

function destroy(options, resolve, reject) {
	spawn('vagrant', ['destroy']).on('exit', function(code) {
		if(code == 0) {
			console.log('Vagrant instance has been destroyed.');
			resolve();
		} else {
			reject('Can\'t destroy vagrant instance.');
		}
	});
}
