const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//  广告结构
const adSchema = new Schema({
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
}, {collection: 'wen_ads'});

module.exports = adSchema;