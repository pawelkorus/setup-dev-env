var spawn = require('child_process').spawn;
var fs = require('fs');
var path = require('path');
var promise = require('promise');

module.exports = exports = {
	init: function(options) { return wrap.bind(null, options, init); }
	,up: function(options) { return wrap.bind(null, options, up); }
	,suspend: function(options) { return wrap.bind(null, options, suspend); }
	,destroy: function(options) { return wrap.bind(null, options, destroy); }
}

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

function up(options, resolve, reject) {
	var process = spawn('vagrant', ['up']);

	process.on('exit', function(code) {
		if(code == 0) {
			console.log('Vagrant instance is up.');
			resolve();
		} else {
			reject('Can\'t bring vagrant instance up.');
		}
	});

	process.stdout.on('data', function(data) {
		console.log(data.toString());
	});
}

function suspend(options, resolve, reject) {
	spawn('vagrant', ['suspend']).on('exit', function(code) {
		if(code == 0) {
			console.log('Vagrant instance is suspended.');
			resolve();
		} else {
			reject('Can\'t suspend vagrant instance.');
		}
	});
}

function destroy(options, resolve, reject) {
	spawn('vagrant', ['destroy', '-f']).on('exit', function(code) {
		if(code == 0) {
			console.log('Vagrant instance has been destroyed.');
			resolve();
		} else {
			reject('Can\'t destroy vagrant instance.');
		}
	});
}
