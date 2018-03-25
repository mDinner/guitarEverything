var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	username: String,
	email: { type: String, required: true},
	password: { type: String, required: true}
});

module.exports = mongoose.model('User', userSchema);



