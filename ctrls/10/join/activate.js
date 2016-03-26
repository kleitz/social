
/**
 * 
	 query = {
	 	phone: '79118190050',
		secret: 12345
	 }
 */

var services = require('../../services/10');

module.exports = function (req, res) {

	var query = req.body,
		user = req.user;

	if (user && user.authorized && user.id)
		return res.send({
			error: 'USER.ALREADY_LOGGED_IN',
			user: trasformUser(user)
		});

	if (!query.phone)
		return res.send({
			error: 'USER.PHONE_NUMBER_REQUIRED'
		});

	query.phone = query.phone.replace(/[\+\s()-]/g , '');

	if (!CHECK.phone(query.phone))
		return res.send({
			error: 'USER.PHONE_NUMBER_INVALID'
		});

	if (!query.secret)
		return res.send({
			error: 'USER.SECRET_REQUIRED'
		});

	if (query.secret.length != 5)
		return res.send({
			error: 'USER.WRONG_SECRET'
		});

	services.join.activate(query, function (error, user) {

		user = trasformUser(user);

		/**
		 * The maxAge option is a convenience option for setting “expires” relative to the current time in milliseconds
		 */

		if (user && user.session)
			res.cookie('session', user.session, { 
				path: '/',
				// maxAge: (1000 * 60 * 60 * 24), 
				expires: new Date(Date.now() + (1000 * 60 * 60 * 24)),
				httpOnly: true 
			});

		res.send({
			error: error,
			user: user
		});

	});

}

function trasformUser (user) {

	if (!user)
		return;

	user.id = user.id.toUpperCase();

	return user;

}


