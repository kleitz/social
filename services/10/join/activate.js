
var async = require('async');

module.exports = function (query, callback) {

	async.waterfall(
		[
			function (callback) {

				getSecret(query, callback);

			},
			function (callback) {

				getUser(query, callback);

			},
			function (user, callback) {

				setSession(query, user, callback);

			}
		],
		function (error, user) {

			deleteSecret(query);

			callback(error, user);

		});

}

function getSecret (query, callback) {

	REDIS.secret.get(query.phone, function (error, secret) {

		if (!error && secret != query.secret)
			return callback('JOIN.INVALID_SECRET');

		callback(error);

	});

}

function getUser (query, callback) {

	MONGO.social.user.getByPhone(query.phone, callback);

}

function setSession (query, user, callback) {

	REDIS.session.set(user.id, CONFIG.social.options.ttl.session, function (error, session) {

		user.session = session;

		callback(error, user);

	});

}

function deleteSecret (query) {

	REDIS.secret.del(query.phone);

}


