var mongoose = require('mongoose');

var guitarSchema = new mongoose.Schema({
	brand: String,
	guitarType: String,
	model: String,
	scale: { type: String, default: ''},
	year: {type: Date, default: ''}
});

module.exports = mongoose.model('Guitar', guitarSchema);



