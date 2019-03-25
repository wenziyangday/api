const mongoose = require('mongoose');
const columnSchema = require('../schema/columnSchema');
const ColumnModel = mongoose.model('columnModel', columnSchema);

module.exports = ColumnModel;
