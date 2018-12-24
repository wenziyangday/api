const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new Schema({
	name: String,
	enName: String,
	auth: Number,
	state: {
		type: Number,
		default: 1
	},
	sortNum: Number,
	createTime: {
		type: Date,
		default: Date.now()
	}
}, {collection: 'role'});

module.exports = roleSchema;
