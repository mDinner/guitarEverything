var express = require('express');
var router = express.Router();
var Guitar = require('../models/guitar.js')
	

router.get('/',function(req, res){
	res.render('index');
});

router.get('/addGuitar', function(req, res) {
	res.render('addGuitar');
});

router.get('/guitarsData', function(req, res) {
	Guitar.find(function(err, guitars) {
	if (err){
		res.send(err);	
	}else{
		res.json(guitars);	
	}

	})
});

router.post('/guitarsData', function(req, res, next) {
		var guitar = new Guitar();
		guitar.brand = req.body.brand;
		guitar.guitarType = req.body.guitarType;
		guitar.model = req.body.model;
		guitar.scale = req.body.scale;
		guitar.year = req.body.year;
		guitar.save(function(err) {
			if (err)
				res.send(err);
			res.json({ message: 'Guitar Created!' });
		});
});

router.get('/guitarsData/:guitar_id', function(req, res) {
	Guitar.findById(req.params.guitar_id, function(err, guitar) {
		console.log('guitar: ', guitar);
		if (err)
			res.send(err);
		res.render('guitar');
	});
});

router.get('/guitarsData/api/:guitar_id', function(req, res) {
	Guitar.findById(req.params.guitar_id, function(err, guitar) {
		console.log('guitar: ', guitar);
		if (err)
			res.send(err);
		res.json(guitar);
	});
});

router.get('/fx', function(req, res) {
	res.render('fx');
});
// router.post('/guitarData', function(req, res) {
// 	Show.findById(req.params.guitar_id, function(err, show) {
// 		if (err)
// 			res.send(err)
// 		show.title = req.body.title;
// 		show.content = req.body.content;
// 	});
// })


module.exports = router;