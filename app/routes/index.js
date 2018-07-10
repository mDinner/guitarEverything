var express = require('express');
var router = express.Router();
var Guitar = require('../models/guitar.js')
var AWS        = require('aws-sdk'); // define aws-sdk and s3 services 
var fs = require('fs');
var s3         = new AWS.S3();



var multer = require('multer')
var multerS3 = require('multer-s3')


router.get('/',function(req, res){
	res.render('index');
});

router.get('/about', function(req, res) {
	res.render('about');
})

router.get('/addGuitar', function(req, res) {
	res.render('addGuitar');
});

router.get('/docs', function(req, res) {
	res.render('docs');
});

router.get('/guitarsData', function(req, res) {
	Guitar.find(function(err, guitars) {
		if (err){
			res.send(err);	
		}else{
			res.json(guitars);	
		}
	});
});

// let testfs.readFile('/etc/passwd', (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });



var upload = multer({
	storage: multerS3({
		s3: s3,
		bucket: 'guitardictionary',
		metadata: function (req, file, cb) {
			console.log('file: ', file)
			cb(null, {imageFile: file.imageFile.data});
		},
		key: function (req, file, cb) {
			console.log('file key: ', file)
			cb(null, Date.now().toString())
		}
	})
}).single('photo')

router.post('/guitarsData', function(req, res, next) {
	console.log('req.files: ', req.files);

	var guitar = new Guitar();
	guitar.brand = req.body.brand;
	guitar.strings = req.body.strings;
	guitar.guitarType = req.body.guitarType;
	guitar.soundType = req.body.soundType;
	guitar.model = req.body.model;
	guitar.scale = req.body.scale;
	guitar.year = req.body.year;
	guitar.imageUrl = req.body.imageUrl;
	guitar.imageFile = req.body.imageFile;

	upload(req, res, function(err) {
		console.log('req.files.imageFile.data: ', req.files.imageFile.data)
		if (err) {
			console.log('err: ', err)
		}

		console.log('uploaded!')
	})

	console.log('guitar.imageFile: ', guitar.imageFile);


	guitar.save(function(err) {
		if (err) {
			res.send(err);
		}
		res.redirect('/');
	});
});

router.get('/guitarsData/:guitar_id', function(req, res) {
	Guitar.findById(req.params.guitar_id, function(err, guitar) {
		if (err) {
			res.send(err);
		}
		res.render('guitar');
	});
});

router.get('/guitarsData/api/:guitar_id', function(req, res) {
	Guitar.findById(req.params.guitar_id, function(err, guitar) {
		if (err) {
			res.send(err);
		}
		res.json(guitar);
	});
});

// router.post('/guitarData', function(req, res) {
// 	Show.findById(req.params.guitar_id, function(err, show) {
// 		if (err)
// 			res.send(err)
// 		show.title = req.body.title;
// 		show.content = req.body.content;
// 	});
// })

router.get('/songs', function(req, res) {
	res.render('songs');
});

module.exports = router;






// var express = require('express'), multer = require('multer'), app = express(), port = 5000;
// app.set('port', port); 



// var storage = multer.diskStorage({
//   destination: function (request, file, callback) {
//     callback(null, '/expressTutorial/uploads/');
//   },
//   filename: function (request, file, callback) {
//     console.log(file);
//     callback(null, file.originalname)
//   }
// });


// app.use(express.static(__dirname + '/bower_components/dropzone/dist/' ) );

// var upload = multer({storage: storage}).array('photo', 5);






// app.get('/', function(resuest, response) {
//   response.sendFile('/expressTutorial/index.html');
// });



// app.post('/upload', function(request, response) {
//   upload(request, response, function(err) {
//     if(err) {
//       console.log('Error Occured' + err);
//         return;
//       }
//     console.log(request.files);
//     response.end('Your Files Uploaded');
//     console.log('Photo Uploaded');
//   })
// });

// var server = app.listen(port, function () {
//   console.log('Listening on port ' + server.address().port)
// });