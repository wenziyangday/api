const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//  信息（最终还是希望将该数据设计成为id，pid的形式）
const infoSchema = new Schema({
	pId: {
		type: String,
		required: true,
		default: '-1'
	},
	sortNum: {
		type: Number,
		required: true,
		default: 0
	},
	title: {
		type: String,
		required: true,
		default: ''
	},
	subTitle: String,
	author: String,
	state: {
		type: Number,
		default: 1
	},
	tags: Array,
	pic: String,
	intro: String,
	content: String,
	remarks: String,
	picsId: {
		type: Array,
		default: [1, 2]
	},
	filesId: {
		type: Array,
		default: [1, 2]
	},
	createTime: {
		type: Date,
		default: Date.now()
	},
	updateTime: {
		type: Date,
		default: Date.now()
	},

}, {collection: 'wen_info'});

module.exports = infoSchema;