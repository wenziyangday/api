const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: String,
	sex: String,
	age: Number
}, {collection: 'api'});

//  栏目数据结构

const columnSchema = new Schema({
	parentId: String,
	columnName: String,
	enName: String,
	intro: String,
	state: Number,
}, {collection: 'columns'});

const infoSchema = new Schema({
	parentId: {
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
		default: 0
	},
	author: String,
	createTime: {
		type: Date,
		default: Date.now()
	}
}, {collection: 'infos'});


module.exports = {
	column: columnSchema, user: userSchema, info: infoSchema
};