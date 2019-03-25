const column = require('../service/columnService');
const utils = require('../utils/utils');


module.exports = {

	//  获取栏目列表
	fetchColumn: function (req, res, next) {
		let rule = ['', undefined, null];
		let {columnName, state, createTime, isPaging, pageNum, pageSize} = req.body;
		let params = {};
		if (!rule.includes(columnName)) {
			params.columnName = columnName;
		}
		if (!rule.includes(state)) {
			params.state = state;
		}
		if (!rule.includes(createTime)) {
			params.createTime = createTime;
		}

		let fetchTotal = column.fetchTotal(params);
		let fetch = column.fetch({...params, isPaging, pageNum, pageSize});

		Promise.all([fetchTotal, fetch]).then(response => {
			res.json({
				code: 200,
				message: '栏目列表获取成功。',
				data: response[1],
				total: response[0],
				currentLen: response[1].length
			})
		}).catch(e => {
			res.json({
				code: 1000,
				data: e
			});
		});
	},

	//  创建栏目  todo 判断必填选项
	createColumn: (req, res, next) => {
		let params = req.body;
		column.create(params).then(response => {
			res.json({
				code: 200,
				message: '栏目创建成功',
				data: response
			})
		}).catch(e => {
			res.json({
				code: 1000,
				data: e
			})
		})
	},

	//	修改栏目    todo 判断必填选项
	editColumn: (req, res, next) => {
		let {_id} = req.body;
		let params = utils.filterKey(req.body, '_id');
		if (_id) {
			column.update(params, _id).then(response => {
				res.json({
					code: 200,
					message: '栏目修改成功。'
				})
			}).catch(e => {
				res.json({
					code: 1000,
					data: e
				});
			})
		} else {
			res.json({
				code: 800,
				message: '栏目_id是必填项。'
			});
		}
	},

	//	单个删除、批量删除栏目 todo 判断 _id 是不是存在的。
	deleteColumn: (req, res, next) => {
		let {_id} = req.body;
		if (_id) {
			if (Array.isArray(_id)) {
				let pArr = [];
				_id.map(x => {
					let p = column.delete({state: 100}, {_id: x});
					pArr.push(p);
				});
				Promise.all(pArr).then(response => {
					res.json({
						code: 200,
						message: '栏目删除成功。'
					})
				}).catch(e => {
					res.json({
						code: 1000,
						data: e
					});
				});

			} else {
				column.delete({state: 100}, _id).then(response => {
					res.json({
						code: 200,
						message: '栏目删除成功。'
					})
				}).catch(e => {
					res.json({
						code: 1000,
						data: e
					});
				});
			}
		} else {
			res.json({
				code: 800,
				message: '栏目_id是必填项。'
			});
		}

	}
};
