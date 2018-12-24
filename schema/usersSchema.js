/**
 *
 *  用户相关的信息
 *
 **/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
	userName: String,
	password: String,
	role: {
		name: String,
		enName: String,
		auth: Number
	},
	state: {
		type: Number,
		default: 1
	},
	sortNum: Number,
	createTime: {
		type: Date,
		default: Date.now()
	}
}, {collection: 'user'});

module.exports = usersSchema;