const mongoose = require('mongoose');
const roleSchema = require('../schema/roleSchema');

module.exports = mongoose.model('RoleModel', roleSchema);