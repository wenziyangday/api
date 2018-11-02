/*
*
* 生成token
*
* */

let jwt = require('jsonwebtoken');
let config = require('../config');

module.exports = function (id) {
	let expire = new Date();
	expire.setDate(expire.getDate() + 7);

	return jwt.sign({
		id: id,
		exp: parseInt(expire.getTime())
	}, config.jwtSecret);
};