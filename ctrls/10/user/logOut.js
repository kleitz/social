
var services = require('../../../services/10');

module.exports = function (req, res) {

	var headers = req.headers,
		user = req.user;

	if (!headers.session)
		return res.send({
			error: 'USER.REQUIRED_SESSION_HEADER'
		});

	user.session = headers.session;

	services.user.logOut(user, function (error) {

		res.clearCookie('session');

		res.send({
			error: error
		});

	});

}


