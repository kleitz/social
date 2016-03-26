
module.exports = function (user, callback) {

	removeSession(user, callback);

}

function removeSession (user, callback) {

	REDIS.session.remove(user.session, callback);

}


