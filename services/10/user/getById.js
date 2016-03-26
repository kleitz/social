
module.exports = function (query, callback) {

	getUserById(query, callback);

}

function getUserById (query, callback) {

	MONGO.user.getById(query.id, callback);

}