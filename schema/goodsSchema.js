const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//  商品
const goodsSchema = new Schema({
	pId: {
		type: String,
		required: true,
	},
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
	},
	updateTime: {
		type: Date,
		default: Date.now()
	},
}, {collection: 'wen_goods'});

module.exports = goodsSchema;