const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//  订单
const orderSchema = new Schema({
	pId: {
		type: String,
		required: true,
	},
	orderNo: '',
	orderName: '',
	orderState: '',
	orderIntro: '',
	orderCreateMan: '',
	orderTotalPrice: '',
	orderSum: '',
	orderFreight: '',   //  运费
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
}, {collection: 'wen_orders'});

module.exports = orderSchema;