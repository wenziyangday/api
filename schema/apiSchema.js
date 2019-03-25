const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//  用户
const userSchema = new Schema({
	parentId: {
		type: String,
		required: true,
	},
	roleId: String,
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
	},
	updateTime: {
		type: Date,
		default: Date.now()
	}
}, {collection: 'user'});

//  角色 todo
const roleSchema = new Schema({
	parentId: {
		type: String,
		required: true,
	},
	roleName: String,
	roleIntro: String,
	roleRights: {
		type: Array,
		default: []
	},
	orgId: String,
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
}, {collection: 'roles'});

//  组织
const orgSchema = new Schema({
	parentId: {
		type: String,
		required: true,
	},
	orgName: String,
	orgIntro: String,
	orgRights: {
		type: Array,
		default: []
	},
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
}, {collection: 'org'});

//  按钮/页面
const buttonPageSchema = new Schema({
	parentId: {
		type: String,
		required: true,
	},
	name: String,
	pageId: String,
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
}, {collection: 'buttonPages'});

//  栏目数据结构
const columnSchema = new Schema({
	parentId: {
		type: String
	},
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
	},
	updateTime: {
		type: Date,
		default: Date.now()
	}
}, {collection: 'columns'});

//  信息（最终还是希望将该数据设计成为id，pid的形式）
const infoSchema = new Schema({
	parentId: {
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

}, {collection: 'info'});

//  商品
const goodSchema = new Schema({
	parentId: {
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
}, {collection: 'goods'});

//  订单
const orderSchema = new Schema({
	parentId: {
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
}, {collection: 'orders'});

//  订单商品 todo
const orderGoodSchema = new Schema({
	orderId: '',
	orderGoodName: '',
	orderGoodPrice: '',

}, {collection: 'orderGoods'});

//  基础信息
const baseInfoSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	enName: {
		type: String
	},
	meta: {
		type: String
	},
	icpNo: {
		type: String
	},
	copyright: {
		type: String
	},
	websiteInfo: {
		type: String
	},
	websiteMap: {
		type: String
	},
	createTime: {
		type: Date,
		default: Date.now()
	},
	updateTime: {
		type: Date,
		default: Date.now()
	}
}, {collection: 'baseInfo'});

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
}, {collection: 'ads'});

module.exports = {
	users: userSchema,
	roles: roleSchema,
	org: orgSchema,
	buttonPages: buttonPageSchema,
	columns: columnSchema,
	info: infoSchema,
	goods: goodSchema,
	orders: orderSchema,
	orderGoods: orderGoodSchema,
	baseInfo: baseInfoSchema,
	ads: adSchema
};


/*
*
* 对于每一个数据结构主要考虑：数据的来源、数据的存储、以及数据的出口 （增、删、改、查）
*
* */
