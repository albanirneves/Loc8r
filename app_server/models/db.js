'use strict';

var mongoose = require('mongoose');
var gracefulShutdown;
var dbURI = 'mongodb://localhost/Loc8r';
var debug = require('debug')('loc8r:model:db');

if(process.env.NODE_ENV === 'production'){
	dbURI = process.env.MONGOLAB_URI;
}


mongoose.connect(dbURI);

//para o windows emitir o sinal SIGINT quando o processo Node.js se encerrar, permitindo que possamos 
//encerrar qualquer coisa antes que o processo se extinga.
var readLine = require('readline');
if(process.plataform == "win32"){
	var rl = readLine.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	rl.on("SIGINT", function() {
		process.emit("SIGINT");
	});
}

mongoose.connection.on('connected', function() {
	debug('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', function() {
	debug('Mongoose connection error: ' + dbURI);
});

mongoose.connection.on('disconnected', function() {
	debug('Mongoose disconnected');
});

gracefulShutdown = function(msg, callback) {
	mongoose.connection.close(function(){
		console.log('Mongoose disconnected through ' + msg);
		callback();
	});
};

process.once('SIGUSR2', function() {
	gracefulShutdown('nodemon start', function() {
		process.kill(process.pid, 'SIGUSR2');
	});
});

process.on('SIGINT', function() {
	gracefulShutdown('app termination', function() {
		process.exit(0);
	});
});

process.on('SIGTERM', function() {
	gracefulShutdown('Heroku app shutdown', function() {
		process.exit(0);
	});
});

require('./locations');