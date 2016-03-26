
var services = require('../../../services/10'),
	_ = require('lodash');

var genders = [1, 0],
	languages = ['en', 'ru'];

module.exports = function (req, res) {

	var query = req.body,
		user = req.user,
		cookies = req.cookies;

	if (!query)
		return res.send({
			error: 'USER.CHECK_REQUEST'
		});

	if (!user.authorized)
		return res.send({
			error: 'USER.NOT_AUTHORIZED'
		});

	query.id = user.id;

	/**
	 * Pick only acceptable fields to change
	 */

	query = _.pick(query, [
		'id', 
		'country',
		'email',
		'firstname',
		'lastname',
		'gender'
	]);

	if (query.country && !REF.countries[query.country])
		return res.send({
			error: 'USER.UNKNOWN_COUNTRY'
		});

	if (query.email && !CHECK.email(query.email))
		return res.send({
			error: 'USER.EMAIL_INVALID'
		});

	if (query.firstname && !CHECK.name(query.firstname))
		return res.send({
			error: 'USER.FIRSNAME_INVALID'
		});

	if (query.lastname && !CHECK.name(query.lastname))
		return res.send({
			error: 'USER.FIRSNAME_INVALID'
		});

	if (query.gender && CHECK.int(query.gender) && genders.indexOf(parseInt(query.gender)) < 0)
		return res.send({
			error: 'USER.GENDER_INVALID'
		});

	query.id = query.id.toLowerCase();
	query.country = query.country && query.country.toUpperCase();
	query.email = query.email && query.email.toLowerCase();
	query.firstname = query.firstname && query.firstname.toLowerCase();
	query.lastname = query.lastname && query.lastname.toLowerCase();
	query.gender = parseInt(query.gender);
	query.lang = cookies.lang && languages.indexOf(cookies.lang) > -1 && cookies.lang;

	services.user.updateById(query, function (error) {

		res.send({
			error: error
		});

	});

}


