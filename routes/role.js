/**
 *
 *  用户角色添加
 *
 **/

const express = require('express');
const router = express.Router();
const RoleModle = require('../model/roleModel');

router.get('/', function (req, res, next) {
	res.send('roles');
});

router.get('/get', function (req, res, next) {
	//  生成超级管理员
	// RoleModle.create({name: '用户', enName: 'user', auth: 1});
	RoleModle.find().skip(1).then(resq => {
		if (resq) {
			let jsonS = {
				code: res.statusCode,
				message: '获取用户角色成功',
				data: resq
			};
			res.json(jsonS);
		}
	}, err => {
		throw err;
	})
});

module.exports = router;