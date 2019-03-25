const users = require('../service/usersService');
const utils = require('../utils/utils');


module.exports = {

	//  获取用户列表
	fetchUsers: function (req, res, next) {
		let rule = ['', undefined, null];
		let {usersName, state, createTime, isPaging, pageNum, pageSize} = req.body;
		let params = {};
		if (!rule.includes(usersName)) {
			params.usersName = usersName;
		}
		if (!rule.includes(state)) {
			params.state = state;
		}
		if (!rule.includes(createTime)) {
			params.createTime = createTime;
		}

		let fetchTotal = users.fetchTotal(params);
		let fetch = users.fetch({...params, isPaging, pageNum, pageSize});

		Promise.all([fetchTotal, fetch]).then(response => {
			res.json({
				code: 200,
				message: '用户列表获取成功。',
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

	//  创建用户
	createUsers: (req, res, next) => {
		let params = req.body;
		users.create(params).then(response => {
			res.json({
				code: 200,
				message: '用户创建成功',
				data: response
			})
		}).catch(e => {
			res.json({
				code: 1000,
				data: e
			})
		})
	},

	//	修改用户
	editUsers: (req, res, next) => {
		let {_id} = req.body;
		let params = utils.filterKey(req.body, '_id');
		if (_id) {
			users.update(params, _id).then(response => {
				res.json({
					code: 200,
					message: '用户修改成功。'
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
				message: '用户_id是必填项。'
			});
		}

	},

	//	单个删除、批量删除用户 todo 判断 _id 是不是存在的。
	deleteUsers: (req, res, next) => {
		let {_id} = req.body;
		if (_id) {
			if (Array.isArray(_id)) {
				let pArr = [];
				_id.map(x => {
					let p = users.delete({state: 100}, {_id: x});
					pArr.push(p);
				});
				Promise.all(pArr).then(response => {
					res.json({
						code: 200,
						message: '用户删除成功。'
					})
				}).catch(e => {
					res.json({
						code: 1000,
						data: e
					});
				});

			} else {
				users.delete({state: 100}, _id).then(response => {
					res.json({
						code: 200,
						message: '用户删除成功。'
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
				message: '用户_id是必填项。'
			});
		}

	}
};
