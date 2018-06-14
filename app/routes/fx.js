var express = require('express');
var router = express.Router();
var Fx = require('../models/fx.js')


router.get('/all', function(req, res) {
	res.render('fx');
});

router.get('/compression', (req, res) => {
	res.render('compression');
});

router.get('/addFx', function(req, res) {

	res.render('addFx');
});

router.get('/fxData', function(req, res) {
	Fx.find(function(err, fxs) {
		if (err){
			res.send(err);	
		}else{
			res.json(fxs);	
		}

	})
});

router.post('/fxData', function(req, res, next) {
	var fx = new Fx();
	fx.fxType = req.body.fxType;
	fx.brand = req.body.brand;
	fx.fxName = req.body.fxName;
	fx.link = req.body.link;

	fx.save(function(err) {
		if (err)
			res.send(err);
		res.json({ message: 'Fx Created!' });
	});
});

module.exports = router;