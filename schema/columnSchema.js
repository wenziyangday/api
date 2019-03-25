const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//  栏目数据结构
const columnSchema = new Schema({
	pId: {
		type: String,
		required: true,
		default: '-1'
	},
	sortNum: {
		type: Number,
		required: true,
		default: 0,
	},
	columnName: {
		type: String,
		required: true,
		default: ''
	},
	state: {
		type: Number,
		default: 1
	},
	enName: String,
	intro: String,
	picUrl: String,
	createTime: {
		type: Date,
		default: Date.now()
	},
	updateTime: {
		type: Date,
		default: Date.now()
	}
}, {collection: 'wen_columns'});

module.exports = columnSchema;
