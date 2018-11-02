/**
 *
 *  管理用户登录与注册
 *
 **/

const express = require('express');
const router = express.Router();
const UsersModel = require('../model/usersModel');

const jwt = require('jsonwebtoken');
const config = require('../config');

/* GET users listing. */

router.get('/', function (req, res, next) {
	res.send('用户登录，登出');
});

router.post('/login', function (req, res, next) {

	//  初始化登录用户的基本信息
	// UsersModel.create({userName: 'sAdmin', password: '123456', role: {name: '超级管理员', enName: 'sAdmin', auth: -1}});
	console.log(req.body);
	let {userName, password} = req.body;
	if (!userName) {
		return res.status(400).send('userName is required');
	}

	if (!password) {
		return res.status(400).send('password is required');
	}

	if (userName !== 'admin' && password !== 'password') {
		return res.status(401).send('invalid password || invalid userName');
	}

	let date = new Date();

	date.setDate(date.getDate() + 1);   // 设置7天过期令牌
	let authToken = jwt.sign({
		userName: userName, exp: parseInt(date.getTime() / 1000)
	}, config.jwtSecret);

	// res.cookie('my-cookies', authToken);


	res.json({
		code: 200,
		message: 'token获取成功',
		token: authToken
	});

});

router.post('/loginOut', function (req, res, next) {
	//  初始化登录用户的基本信息
	// UsersModel.create({userName: 'sAdmin', password: '123456', role: {name: '超级管理员', enName: 'sAdmin', auth: -1}});
	res.clearCookie('my-cookies');

});

module.exports = router;
