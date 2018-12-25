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
	sortNum: Number,
	columnName: {
		type: String,
		required: true
	},
	enName: String,
	intro: String,
	state: {
		type: Number,
		default: 1
	},
	picUrl: String,
	createTime: {
		type: Date,
		default: Date.now()
	}
}, {collection: 'columns'});

//  信息
const infoSchema = new Schema({
	baseClassId: {
		type: String,
		required: true
	},
	subClassId: {
		type: String,
		required: true
	},
	sortNum: Number,
	title: {
		type: String,
		required: true
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
	}
}, {collection: 'info'});


//  商品
const goodSchema = new Schema({
	baseClassId: {
		type: String,
		required: true
	},
	subClassId: {
		type: String,
		required: true
	},
	sortNum: Number,
	title: {
		type: String,
		required: true
	},
	subTitle: String,
	author: String,
	state: {
		type: Number,
		default: 1
	},
	// transport: String,
	// price: Number,
	// size: String,
	//
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
	}
}, {collection: 'goods'});


module.exports = {
	column: columnSchema, user: userSchema, info: infoSchema, goods: goodSchema
};