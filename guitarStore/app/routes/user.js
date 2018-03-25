var express = require('express');
var router = express.Router();
var User = require('../models/user.js')
	
	router.get('/register', function(req, res) {
		res.render('register');
	});

	router.route('/register')
	.post(function(req, res) {
		var user      = new User();
		user.username = req.body.username;
		user.email    = req.body.email;
		user.password = req.body.password;
		user.save(function(err) {
			if (err)
				res.send(err);
			res.json({message: 'Welcome, ' + user.username});
		})
	})

	router.get('/login', function(req, res) {
		res.render('login')
	})

	router.route('/guitarsData')
	.get(function(req, res) {
		Guitar.find(function(err, guitars) {
		if (err){
			res.send(err);	
		}else{
			res.json(guitars);	
		}

		});
	}).post(function(req, res) {
			var guitar   = new Guitar();
			guitar.brand = req.body.brand;
			guitar.scale = req.body.scale;
			guitar.year  = req.body.year;
			guitar.save(function(err) {
				if (err)
					res.send(err);
				res.json({ message: 'Guitar Created!' });
			});
	});

module.exports = router;