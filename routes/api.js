const express = require('express');
const router = express.Router();
const ApiModel = require('../model/apiModel');
const ObjectId = require('mongodb').ObjectId;
const pagingInfo = {
	isPaging: true,
	pageSize: 30,
	pageNum: 1
};

const utils = require('../utils/utils');

router.get('/', (req, res, next) => {
	res.send('api');
});

router.post('/tests', (req, res, next) => {
	res.send('test');
});

//  序号处理
router.get('/countColumn', (req, res, next) => {
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
router.post('/columnPost', (req, res, next) => {
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
router.get('/columnGet', (req, res, next) => {
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
				total: resq.length
			};
			res.send(jsonS);
		}
	});
});

//  改 栏目
router.post('/columnPut', (req, res) => {
	ApiModel.column.update({_id: req.body._id}, req.body).then(resq => {
		if (resq) {
			let jsonS = {
				code: res.statusCode,
				message: '更新成功',
				data: resq
			};
			res.json(jsonS);
		}
	});
});

//  删 栏目
router.post('/columnDelete', (req, res) => {
	let _ids = [];
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
router.get('/countInfo', (req, res, next) => {
	let {subClassId, baseClassId} = req.query;
	ApiModel.info.aggregate([
		{$match: {subClassId, baseClassId}}
	]).sort({sortNum: -1}).then(resq => {
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
router.post('/infoPost', (req, res, next) => {
	console.log(req.body._id);
	if (req.body._id) {
		ApiModel.info.find({_id: ObjectId(req.body._id)}).then(resId => {
				if (resId) {
					ApiModel.info.update({_id: ObjectId(req.body._id)}, req.body).then(resq => {
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
		let parentId = req.body.subClassId;
		ApiModel.info.create({parentId, ...req.body}).then(resq => {
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

//  删除栏目所属信息
router.post('/deleteInfo', (req, res, next) => {
	console.log(req.body, 'asdf')
	//  删除 支持批量删除，支持单id删除，
	//  条件：[], 不能为空，{ids: ['1', '2', '3', '4']}
	let {ids} = req.body;
	let objIds = [];

	//  判断条件的标志符
	let isSuccess = false;

	if (Array.isArray(ids) && ids.length > 0) {
		isSuccess = true;
		ids.map(x => {
			let objID = ObjectId(x);
			objIds.push(objID);
		})
	} else {
		res.json({
			code: 400,
			message: '检查参数是否正确.'
		})
	}

	if (isSuccess) {
		let resArr = [];
		objIds.map((x, index) => {
			let createTime = Date.now();
			ApiModel.info.update({_id: x}, {$set: {state: 999, createTime}}, true, (err, raw) => {
				console.log(err, raw);
				resArr.push(index);
			})
		})

		if (resArr.length === objIds.length) {
			res.json({
				code: 200,
				message: '删除成功。'
			});
		}

	}

});

//  查询栏目所属信息
router.get('/getInfo', (req, res, next) => {

	let pareamsd = {
		title: '',
		baseClassId: '',
		subClassId: '',
		state: '',
		createTime: ''
	}

	//  查询 根据所属的栏目id查询、支持
	let obj = req.query;
	let filteredObj = utils.filterSpace(obj);

	//  限定查询 隐藏、正常、置顶
	let inState = {state: {$in: [0, 1, 2]}};

	//  根据状态查询 当有状态变量时 直接用该变量 查询
	let params = {...inState, ...filteredObj};
	let newParms = params;

	//  分页信息
	let limit = 0, skip = 0;
	if (params.isPaging) {
		limit = params.pageSize ? params.pageSize : pagingInfo.pageSize;
		skip = (params.pageNum - 1) * limit;

		delete newParms.isPaging;
		delete newParms.pageNum;
		delete newParms.pageSize;
	}
	console.log(limit, skip, params);
	ApiModel.info.find(newParms).sort({sortNum: -1}).skip(skip).limit(limit).then(resq => {
		let countTotal = 0;
		let jsonS = {};
		if (resq.length !== 0) {
			ApiModel.info.find(params).sort({sortNum: -1}).count().then(count => {
				countTotal = count;
				if (resq) {
					jsonS = {
						code: res.statusCode,
						message: '获取数据成功',
						data: resq,
						total: countTotal
					};
					res.send(jsonS);
				}
			});
		} else {
			jsonS = {
				code: res.statusCode,
				message: '获取数据成功',
				data: resq,
				total: countTotal
			};
			res.send(jsonS);
		}
	});

});

//  更新状态
router.post('/updateState', (req, res, next) => {
	console.log(req.body, 'asdf')
	let jsonS = {};
	if (Object.is(String(req.body), '{}')) {
		let filterSpaces = utils.filterSpace(req.body);
		let {_id, state} = filterSpaces;
		console.log(_id, state);
		if (_id !== 'undefined' && state !== 'undefined') {
			let objId = ObjectId(_id);
			let createTime = Date.now();
			ApiModel.info.update({_id: objId}, {$set: {state, createTime}}).then(x => {
				jsonS = {
					code: res.statusCode,
					message: '状态更新成功。',
				};
			})
		} else {
			jsonS = {
				code: 400,
				message: '状态更新失败。',
			};
		}
	} else {
		jsonS = {
			code: 600,
			message: '_id、state是必传字段。',
		};
	}

	res.send(jsonS);
});

//  创建基本设置信息
router.post('/createBaseInfo', (req, res, next) => {
	if (req.body._id) {
		let objId = ObjectId(req.body._id);
		let createTime = Date.now();
		ApiModel.baseInfo.updateOne({_id: objId}, {...req.body, createTime}).then(resd => {
			if (resd) {
				res.send({
					code: res.statusCode,
					message: '基础信息修改成功'
				})
			}
		})
	} else {
		ApiModel.baseInfo.create(req.body).then(resd => {
			if (resd) {
				res.send({
					code: res.statusCode,
					message: '基础信息创建成功'
				})
			}
		})
	}

	// res.send(jsonS);
});

//  查询基本设置信息
router.get('/fetchBaseInfo', (req, res, next) => {
	ApiModel.baseInfo.find({}).sort({createTime: 1}).then(resd => {
		if (resd) {
			res.send({
				code: res.statusCode,
				message: '数据获取成功',
				data: resd
			});
		}
	});
});

//  todo 创建时间查询处理 时间差的问题
module.exports = router;
