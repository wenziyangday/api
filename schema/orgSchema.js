const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//  组织
const orgSchema = new Schema({
	pId: {
		type: String,
		required: true,
		default: '-1'
	},
	orgName: {
		type: String,
		required: true,
		default: ''
	},
	sortNum: {
		type: Number,
		required: true,
		default: ''
	},
	roleId: {
		type: String,
		default: ''
	},
	roleName: {
		type: String,
		default: ''
	},
	state: {
		type: Number,
		default: 1
	},
	orgIntro: String,
	orgRights: {
		type: Array,
		default: []
	},
	createTime: {
		type: Date,
		default: Date.now()
	},
	updateTime: {
		type: Date,
		default: Date.now()
	}
}, {collection: 'wen_org'});

module.exports = orgSchema;
