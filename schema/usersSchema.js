/**
 *
 *  用户相关的信息
 *
 **/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//  用户
const userSchema = new Schema({
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
	state: {
		type: Number,
		default: 1
	},
	orgId: {
		type: String,
		default: ''
	},
	orgName: {
		type: String,
		default: ''
	},
	sex: String,
	age: Number,
	phone: String,
	createTime: {
		type: Date,
		default: Date.now()
	},
	updateTime: {
		type: Date,
		default: Date.now()
	}
}, {collection: 'wen_user'});

module.exports = userSchema;