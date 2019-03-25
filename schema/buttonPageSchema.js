const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//  按钮/页面
const buttonPageSchema = new Schema({
	pId: {
		type: String,
		required: true,
	},
	name: String,
	pageId: String,
	sortNum: Number,
	state: {
		type: Number,
		default: 1
	},
	createTime: {
		type: Date,
		default: Date.now()
	},
	updateTime: {
		type: Date,
		default: Date.now()
	}
}, {collection: 'wen_buttonPages'});

module.exports = buttonPageSchema;