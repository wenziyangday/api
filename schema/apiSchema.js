const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//  用户
const userSchema = new Schema({
	name: String,
	sex: String,
	age: Number,
	sortNum: Number,
	state: {
		type: Number,
		default: 1
	},
	createTime: {
		type: Date,
		default: Date.now()
	}
}, {collection: 'api'});

//  栏目数据结构
const columnSchema = new Schema({
	parentId: String,
	columnName: String,
	enName: String,
	intro: String,
	state: {
		type: Number,
		default: 1
	},
	sortNum: Number,
	createTime: {
		type: Date,
		default: Date.now()
	}
}, {collection: 'columns'});

//  信息
const infoSchema = new Schema({
	subClassId: {
		type: String,
		required: true
	},
	baseClassId: {
		type: String,
		required: true
	},

	title: {
		type: String,
		required: true
	},
	subTitle: String,
	intro: String,
	content: String,
	pic: String,
	picsId: String,
	filesId: String,
	state: {
		type: Number,
		default: 1
	},
	author: String,
	sortNum: Number,
	createTime: {
		type: Date,
		default: Date.now()
	}
}, {collection: 'info'});


module.exports = {
	column: columnSchema, user: userSchema, info: infoSchema
};