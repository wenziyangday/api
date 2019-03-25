//  组织

const orgModel = require('../model/orgModel');
const bFunc = require('../utils/businessFunc');
const ObjectId = require('mongodb').ObjectId;


module.exports = {
	//  获取总数
	fetchTotal: (obj) => {
		let newObj = bFunc.filterSpace(obj);
		let {newParams} = bFunc.page(newObj);
		return orgModel.find(newParams).sort({sortNum: -1, createTime: -1}).countDocuments();
	},

	//  获取
	fetch: (obj) => {
		let newObj = bFunc.filterSpace(obj);
		let {limit, skip, newParams} = bFunc.page(newObj);
		return orgModel.find(newParams).sort({sortNum: -1, createTime: -1}).skip(limit).limit(skip);
	},

	//  创建
	create: (obj) => {
		return orgModel.create(obj);
	},

	//	修改
	update: (obj, _id) => {
		let id = ObjectId(_id._id);
		return orgModel.findByIdAndUpdate({_id: id}, obj);
	},

	//	删除
	delete: (obj, _id) => {
		let id = ObjectId(_id._id);
		return orgModel.findByIdAndUpdate({_id: id}, obj);
	}
};
