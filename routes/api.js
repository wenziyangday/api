const express = require('express');
const router = express.Router();
const ApiModel = require('../model/apiModel');
var ObjectId = require('mongodb').ObjectId;

router.get('/', function (req, res, next) {
	res.send('api');
});

router.post('/tests', function (req, res, next) {
	res.send('test');
});

//  序号处理
router.get('/countColumn', function (req, res, next) {
	let parentId = req.query.parentId;
	ApiModel.column.aggregate(
		[{$match: {parentId}}]
	).then(resq => {
		if (resq) {
			let jsonS = {
				code: res.statusCode,
				message: '获取数据成功',
				data: resq.length
			};
			res.send(jsonS);
		}
	});
});

//  增 栏目
router.post('/columnPost', function (req, res, next) {
	ApiModel.column.create(req.body).then(resq => {
		console.log(resq);
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
	let parentId = req.query.parentId;
	if (req.query.parentId !== '') {
		parentId = ObjectId(req.query.parentId);
	}
	ApiModel.column.find({parentId}).then(resq => {
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

//  序号处理
router.get('/countInfo', function (req, res, next) {
	let {subClassId, baseClassId} = req.query;
	ApiModel.info.aggregate([
		{$match: {subClassId, baseClassId}}
	]).then(resq => {
		console.log(resq)
		if (resq) {
			let jsonS = {
				code: res.statusCode,
				message: '获取数据成功',
				data: resq.length
			};
			res.send(jsonS);
		}
	});
});

//  栏目所属信息新增
router.post('/infoPost', function (req, res, next) {
	console.log(req.body._id);
	if (req.body._id) {
		ApiModel.info.find({_id: req.body._id}).then(resId => {
				if (resId) {
					//todo
					ApiModel.info.save(req.body).then(resq => {
						if (resq) {
							let jsonS = {
								code: res.statusCode,
								message: '修改成功',
								data: resq
							};
							res.json(jsonS);
						}
					})
				} else {
					let jsonS = {
						code: 400,
						message: '修改失败,id 不存在',
						data: ''
					};
					res.json(jsonS);
				}
			}
		)

	} else {
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
	}

});

//  栏目所属信息查询

router.get('/infoGet', function (req, res, next) {
	let query = {};
	if (req.query) {
		query = {...req.query};
	} else {
		query = {...req.query, state: {$lt: 2}};
	}

	ApiModel.info.find(query).then(resq => {
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

//  todo 创建时间查询处理 时间差的问题


module.exports = router;