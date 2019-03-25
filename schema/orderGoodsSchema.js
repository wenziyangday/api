const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//  订单商品 todo
const orderGoodSchema = new Schema({
	orderId: '',
	orderGoodName: '',
	orderGoodPrice: '',

}, {collection: 'wen_orderGoods'});

module.exports = orderGoodSchema;