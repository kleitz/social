
module.exports = function (req, res) {

	var user = req.user;

	res.send({
		error: !user.authorized && 'USER.NOT_AUTHORIZED',
		user: user.authorized && trasformUser(user)
	});

}

function trasformUser (user) {

	if (!user)
		return;

	user.id = user.id.toUpperCase();

	return user;

}


