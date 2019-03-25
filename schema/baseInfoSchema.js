const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//  基础信息
const baseInfoSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	enName: {
		type: String
	},
	meta: {
		type: String
	},
	icpNo: {
		type: String
	},
	copyright: {
		type: String
	},
	websiteInfo: {
		type: String
	},
	websiteMap: {
		type: String
	},
	createTime: {
		type: Date,
		default: Date.now()
	},
	updateTime: {
		type: Date,
		default: Date.now()
	}
}, {collection: 'wen_baseInfo'});

module.exports = baseInfoSchema;