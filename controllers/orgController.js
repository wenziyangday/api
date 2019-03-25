const org = require('../service/orgService');
const utils = require('../utils/utils');


module.exports = {

	//  获取组织列表
	fetchOrg: function (req, res, next) {
		let rule = ['', undefined, null];
		let {orgName, state, createTime, isPaging, pageNum, pageSize} = req.body;
		let params = {};
		if (!rule.includes(orgName)) {
			params.orgName = orgName;
		}
		if (!rule.includes(state)) {
			params.state = state;
		}
		if (!rule.includes(createTime)) {
			params.createTime = createTime;
		}

		let fetchTotal = org.fetchTotal(params);
		let fetch = org.fetch({...params, isPaging, pageNum, pageSize});

		Promise.all([fetchTotal, fetch]).then(response => {
			res.json({
				code: 200,
				message: '组织列表获取成功。',
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

	//  创建组织
	createOrg: (req, res, next) => {
		let params = req.body;
		org.create(params).then(response => {
			res.json({
				code: 200,
				message: '组织创建成功',
				data: response
			})
		}).catch(e => {
			res.json({
				code: 1000,
				data: e
			})
		})
	},

	//	修改组织
	editOrg: (req, res, next) => {
		let {_id} = req.body;
		let params = utils.filterKey(req.body, '_id');
		if (_id) {
			org.update(params, _id).then(response => {
				res.json({
					code: 200,
					message: '组织修改成功。'
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
				message: '组织_id是必填项。'
			});
		}

	},

	//	单个删除、批量删除组织 todo 判断 _id 是不是存在的。
	deleteOrg: (req, res, next) => {
		let {_id} = req.body;
		if (_id) {
			if (Array.isArray(_id)) {
				let pArr = [];
				_id.map(x => {
					let p = org.delete({state: 100}, {_id: x});
					pArr.push(p);
				});
				Promise.all(pArr).then(response => {
					res.json({
						code: 200,
						message: '组织删除成功。'
					})
				}).catch(e => {
					res.json({
						code: 1000,
						data: e
					});
				});

			} else {
				org.delete({state: 100}, _id).then(response => {
					res.json({
						code: 200,
						message: '组织删除成功。'
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
				message: '组织_id是必填项。'
			});
		}

	}
};
