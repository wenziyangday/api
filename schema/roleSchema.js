const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//  角色
const roleSchema = new Schema({
	pId: {
		type: String,
		required: true,
		default: '-1',
	},
	roleName: {
		type: String,
		required: true,
		default: '',
	},
	sortNum: {
		type: Number,
		required: true,
		default: 0,
	},
	state: {
		type: Number,
		default: 1
	},
	roleIntro: String,
	roleRights: {
		type: Array,
		default: []
	},
	orgId: String,
	createTime: {
		type: Date,
		default: Date.now()
	},
	updateTime: {
		type: Date,
		default: Date.now()
	}
}, {collection: 'wen_roles'});

module.exports = roleSchema;
