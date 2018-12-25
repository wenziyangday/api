const mongoose = require('mongoose');
const apiSchema = require('../schema/apiSchema');
const apiModel = {
	user: mongoose.model('User', apiSchema.user),
	column: mongoose.model('column', apiSchema.column),
	info: mongoose.model('info', apiSchema.info),
	goods: mongoose.model('goods', apiSchema.goods),
};


module.exports = apiModel;