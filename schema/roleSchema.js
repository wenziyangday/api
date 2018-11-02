const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new Schema({
	name: String,
	enName: String,
	auth: Number
}, {collection: 'role'});

module.exports = roleSchema;
