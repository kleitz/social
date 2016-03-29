
var express = require('express'),
	router = express.Router();

var ctrls = require('../ctrls/10');

router
	.route('/join/init')
	.post(ctrls.join.init);

router
	.route('/join/activate')
	.post(ctrls.join.activate);

router
	.route('/user/isLoggedIn')
	.get(ctrls.user.isLoggedIn);

router
	.route('/user/logOut')
	.get(ctrls.user.logOut);

router
	.route('/user/:id')
	.get(ctrls.user.getById)
	.put(ctrls.user.updateById);

module.exports = router;