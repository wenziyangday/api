const express = require('express');
const router = express.Router();
const ApiModel = require('../model/apiModel');

router.get('/', function (req, res, next) {
	res.send('api');
});

router.post('/tests', function (req, res, next) {
	res.send('test');
});

//  增 栏目
router.post('/columnPost', function (req, res, next) {
	ApiModel.column.create(req.body).then(resq => {
		if (resq) {
			let jsonS = {
				code: res.statusCode,
				message: '新增成功',
				data: resq
			};
			res.json(jsonS);
		}
	});
});

//  查 栏目

router.get('/columnGet', function (req, res, next) {

	//  查询栏目：无条件、有条件（指定id, ）
	let {id, parentId} = {}, obj = {};


	if (req.body.id) {
		id = req.body.id;
		obj = {id}
	} else {
		id = '';
	}

	if (req.body.parentId) {
		parentId = req.body.id;
		obj = {parentId}
	} else {
		parentId = '';
	}

	if (parentId !== '' && id !== '') {
		obj = {parentId, id}
	}

	// 初始化数据库
	ApiModel.column.find(obj).then(resq => {
		if (resq) {
			let jsonS = {
				code: res.statusCode,
				message: '获取数据成功',
				data: resq,
				len: resq.length
			};
			res.send(jsonS);
		}
	});
});

//  改 栏目

router.post('/columnPut', function (req, res) {
	ApiModel.column.update({_id: req.body._id}, req.body).then(resq => {
		if (resq) {
			let jsonS = {
				code: res.statusCode,
				message: '更新成功',
				data: resq
			};
			res.json(jsonS);
		}
	})

});

//  删 栏目

router.post('/columnDelete', function (req, res) {
	ApiModel.column.remove({_id: req.body._id}).then(resq => {
		if (resq) {
			let jsonS = {
				code: res.statusCode,
				message: '删除成功',
				data: resq
			};

			res.json(jsonS);
		}
	})
});

//  栏目信息新增

router.post('/infoPost', function (req, res, next) {
	ApiModel.info.create(req.body).then(resq => {
		if (resq) {
			let jsonS = {
				code: res.statusCode,
				message: '新增成功',
				data: resq
			};
			res.json(jsonS);
		}
	})
});

//  栏目信息查询

router.get('/infoGet', function (req, res, next) {
	ApiModel.info.find({}).then(resq => {
		if (resq) {
			let jsonS = {
				code: res.statusCode,
				message: '获取数据成功',
				data: resq,
				len: resq.length
			};
			res.send(jsonS);
		}
	});
});

module.exports = router;