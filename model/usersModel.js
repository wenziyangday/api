const mongoose = require('mongoose');
const usersSchema = require('../schema/usersSchema');
const UsersModel = mongoose.model('UsersModel', usersSchema);

module.exports = UsersModel;