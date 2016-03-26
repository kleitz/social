
global.OFF_CR = true;

var express = require('express'),
	cluster = require('cluster'),
	cpus = require('os').cpus().length;

var api10 = '/api/10';

process.setMaxListeners(25);

// cluster.on('exit', function (worker) {
// 	cluster.fork();
// });

// if (cluster.isMaster)
// 	for (var i = 0; i < cpus; i++) cluster.fork();
// else
main();

function main() {

	var moment = require('moment'),
		http = require('http'),
		router = require('./router'),
		exec = require('child_process').exec,
		app = express(),
		flysocial = require('flysocial');

	process.once('config.loaded', onConfigLoaded);

	function onConfigLoaded (message) {

		setTimeout(start, 7000);

	}

	function start() {

		var port = CONFIG.social.options.port;

		app
			.use(MIDDLEWARE.cors('*', ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'], ['Content-Type', 'Content-Length', 'session']))
			.use(MIDDLEWARE.parser('64kb'))
			.use(MIDDLEWARE.cookies)
			.use(MIDDLEWARE.user.isLoggedIn)

			/**
			 * API (10 version)
			 */

			.use(api10, router['10'])

			.listen(port)
			.on('listening', onServerListening)
			.on('close', onServerClose);

	}

	function onServerClose () {

		LOG.error({
			message: 'Failed'
		});

	}

	function onServerListening () {

		LOG.info({
			message: 'Success'
		});

	}

}


