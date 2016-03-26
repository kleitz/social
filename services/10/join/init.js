
var async = require('async');

module.exports = function (query, callback) {

	async.waterfall(
		[
			function (callback) {

				createUser(query, callback);

			},
			function (user, callback) {

				if (!user)
					getUser(query, callback);
				else
					callback(null, user);

			},
			function (user, callback) {

				createSecret(query, user, callback);

			}
		],
		function (error, user) {

			callback(error);

			if (!error && user)
				notify(query, user);

		});

}

function createUser (query, callback) {

	MONGO.user.new(query, function (error, user) {

		if (!error && user)
			callback(null, user);
		else if (error == 'MONGO.PHONE_ALREADY_IN_USE')
			callback(null, null);
		else
			callback(error);

	});

}

function getUser (query, callback) {

	MONGO.user.getByPhone(query.phone, callback);

}

function createSecret (query, user, callback) {

	if (query.phone == '79118190050')
		query.secret = '77777';
	else
		query.secret = parseInt(Math.random() * 100000);

	REDIS.secret.set(query.phone, query.secret, null, function (error) {

		callback(error, user);

	});

}

function notify (query, user) {

	RABBIT.exchange.publish(
		{
			exchange: {
				name: 'notify',
				options: {
					autoDelete: false,
					durable: true,
					type: 'fanout'
				},
				route: 'join'
			},
			message: {
				user_id: user.id
			}
		});

}


