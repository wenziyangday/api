const mongoose = require('mongoose');
const usersSchema = require('../schema/usersSchema');

module.exports = mongoose.model('UsersModel', usersSchema);