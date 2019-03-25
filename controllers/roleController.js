const role = require('../service/roleService');
const utils = require('../utils/utils');


module.exports = {

	//  获取角色列表
	fetchRole: function (req, res, next) {
		let rule = ['', undefined, null];
		let {roleName, state, createTime, isPaging, pageNum, pageSize} = req.body;
		let params = {};
		if (!rule.includes(roleName)) {
			params.roleName = roleName;
		}
		if (!rule.includes(state)) {
			params.state = state;
		}
		if (!rule.includes(createTime)) {
			params.createTime = createTime;
		}

		let fetchTotal = role.fetchTotal(params);
		let fetch = role.fetch({...params, isPaging, pageNum, pageSize});

		Promise.all([fetchTotal, fetch]).then(response => {
			res.json({
				code: 200,
				message: '角色列表获取成功。',
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

	//  创建角色
	createRole: (req, res, next) => {
		let params = req.body;
		role.create(params).then(response => {
			res.json({
				code: 200,
				message: '角色创建成功',
				data: response
			})
		}).catch(e => {
			res.json({
				code: 1000,
				data: e
			})
		})
	},

	//	修改角色
	editRole: (req, res, next) => {
		let {_id} = req.body;
		let params = utils.filterKey(req.body, '_id');
		if (_id) {
			role.update(params, _id).then(response => {
				res.json({
					code: 200,
					message: '角色修改成功。'
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
				message: '角色_id是必填项。'
			});
		}

	},

	//	单个删除、批量删除角色 todo 判断 _id 是不是存在的。
	deleteRole: (req, res, next) => {
		let {_id} = req.body;
		if (_id) {
			if (Array.isArray(_id)) {
				let pArr = [];
				_id.map(x => {
					let p = role.delete({state: 100}, {_id: x});
					pArr.push(p);
				});
				Promise.all(pArr).then(response => {
					res.json({
						code: 200,
						message: '角色删除成功。'
					})
				}).catch(e => {
					res.json({
						code: 1000,
						data: e
					});
				});

			} else {
				role.delete({state: 100}, _id).then(response => {
					res.json({
						code: 200,
						message: '角色删除成功。'
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
				message: '角色_id是必填项。'
			});
		}

	}
};
