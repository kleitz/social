
var async = require('async');

module.exports = function (query, callback) {

	updateUser(query, callback);

}

function updateUser (query, callback) {

	MONGO.user.updateById(query.id, query, callback);

}


