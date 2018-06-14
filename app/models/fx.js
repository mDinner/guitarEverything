var mongoose = require('mongoose');

var fxSchema = new mongoose.Schema({
	fxType: String,
	brand: String,
	fxName: String,
	link: String
});

module.exports = mongoose.model('Fx', fxSchema);

