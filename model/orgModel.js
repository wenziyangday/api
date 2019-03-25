const mongoose = require('mongoose');
const orgSchema = require('../schema/orgSchema');
const orgModel = mongoose.model('orgModel', orgSchema);

module.exports = orgModel;