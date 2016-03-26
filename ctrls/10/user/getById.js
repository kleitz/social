
var _ = require('lodash'),
	services = require('../../../services/10');

module.exports = function (req, res) {

	var query = req.params,
		user = req.user;

	query.id = query.id && query.id.toLowerCase();
	query.session_user_id = user.id && user.id.toLowerCase();
	query.authorized = user.authorized;

	services.user.getById(query, function (error, user) {

		res.send({
			error: error,
			user: transformUser(query, user)
		});

	});

}

function transformUser (query, user) {

	if (!user)
		return;

	if (user.id != query.session_user_id)
		user = _.omit(user, ['phone', 'phones']);

	user.isMe = query.session_user_id == user.id;

	user.id = user.id.toUpperCase();

	user.country_name = user.country && REF.countries[user.country].name.en;

	if (user.online && user.online.geo)
		user.online.geo = user.online.geo[0];

	return user;

}


