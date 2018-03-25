var mongoose = require('mongoose');

var guitarSchema = new mongoose.Schema({
	brand: String,
	scale: { type: String, default: ''},
	year: Date,
});

module.exports = mongoose.model('Guitar', guitarSchema);



