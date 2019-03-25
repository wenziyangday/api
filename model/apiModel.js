const mongoose = require('mongoose');
const apiSchema = require('../schema/apiSchema');
const apiModel = {
	user: mongoose.model('user', apiSchema.users),
	baseInfo: mongoose.model('baseInfo', apiSchema.baseInfo),
	column: mongoose.model('column', apiSchema.columns),
	info: mongoose.model('info', apiSchema.info),
	goods: mongoose.model('goods', apiSchema.goods),
};

module.exports = apiModel;