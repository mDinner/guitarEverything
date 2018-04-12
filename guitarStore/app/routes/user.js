var express = require('express');
var router = express.Router();
var User = require('../models/user.js')
var bcrypt = require('bcrypt');
	
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
		console.log('hello')
		res.render('login')
	})


	// login/out engines


	function loginAttempt (req, res, user) {

		console.log('loginAttempt, req.body: ', req.body)

		/* Compare password entered against password in db */
		bcrypt.compare(req.body.password, user.password, function(err, result) {

			if (err) {
				/* if mongo error */
			 	console.log('mongo err: ', err)
			}


     if(result == true){

     		/* if password correct */
				req.session.loggedIn = true;
				req.session.user = user.fname;
				req.session.userEmail = user.email;
				req.session.save();
				res.render('/membersHome');

			} else {

			 	/* if password wrong */
				console.log('wrong password!')
				res.render('login');
			} 


		});
		
	}




	/* handle login attempt */
	router.route('/logUserIn')
	.post(function(req, res) {

		console.log('req.body.email: ', req.body.email)
		/* try finding user by email */
		User.findOne ({'email': req.body.email}, function (err, u) {

				if (err) { console.log('err: ', err) }

				if (u) {
					/* Successfully found user by email */
					loginAttempt(req, res, u)
				}
		});


		/* No user with entered email found, try looking by username */
		User.findOne({'username': req.body.email}, function (err, u) {

			if (err) { console.log('err: ', err) }

			if (u) {
				loginAttempt(req, res, u)
			}
		})


		console.log('user not found!');

		
	});



	router.route('/logOut')
	.get(function(req, res) {
	  req.session.loggedIn = null;
  	  res.render('logout');
	});










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