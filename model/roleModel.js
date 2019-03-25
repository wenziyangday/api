const mongoose = require('mongoose');
const roleSchema = require('../schema/roleSchema');
const RoleModel = mongoose.model('RoleModel', roleSchema);

module.exports = RoleModel;