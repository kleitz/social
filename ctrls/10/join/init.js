
/**
 * 
	 query = {
		country: 'RU',
		phone: '79118190050'
	 }
 */

var services = require('../../../services/10');

module.exports = function (req, res) {

	var query = req.body,
		user = req.user;

	if (user && user.authorized && user.id)
		return res.send({
			error: 'USER.ALREADY_LOGGED_IN',
			user: trasformUser(user)
		});

	if (!query.country)
		return res.send({
			error: 'USER.COUNTRY_REQUIRED'
		});

	if (!REF.countries[query.country && query.country.toUpperCase()])
		return res.send({
			error: 'USER.COUNTRY_NOT_FOUND'
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

	if (!query.phone_code || !query.phone_number)
		return res.send({
			error: 'USER.PHONE_CODE_AND_PHONE_NUMBER_REQUIRED'
		});

	query.phone_code = query.phone_code.replace(/[\+\s()-]/g , '');
	query.phone_number = query.phone_number.replace(/[\+\s()-]/g , '');

	if (!CHECK.numeric(query.phone_code) || !CHECK.numeric(query.phone_number))
		return res.send({
			error: 'USER.PHONE_CODE_AND_PHONE_NUMBER_MUST_BE_NUMERIC'
		});

	query.country = query.country.toUpperCase();
	query.phones = [];

	query.phones.push({
		code: query.phone_code,
		number: query.phone_number
	});

	services.join.init(query, function (error) {

		res.send({
			error: error
		});

	});

}

function trasformUser (user) {

	if (!user)
		return;

	user.id = user.id.toUpperCase();

	return user;

}


