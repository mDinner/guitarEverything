var express    = require('express'); 		// call express
var path 	   = require('path');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var monSess    = require('mongoose-session');
var session    = require('express-session');
var secrets    = require('./secrets')
var app        = express(); 				// define our app using express
var AWS        = require('aws-sdk'); // define aws-sdk and s3 services 
var fs         = require('fs');
var UploadStream = require("s3-stream-upload");
var S3         = require("aws-sdk").S3;

// s3-stream-upload vars
var key = "file.mp3";
var s3 = new S3();

// app config
app.use(bodyParser());
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, './app/views'));
app.use(express.static(__dirname + '/app/public'));

const connection = mongoose.createConnection(secrets.connectStr);
const MongoStore = require('connect-mongo')(session);

// set up sessions
app.use(session({
  key: 'session',
  secret: 'doggy',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({mongooseConnection: connection})
}));

// uploadStream config
// fs.readFileStream(__dirname + "/file.mp3")
//   .pipe(UploadStream(s3, { Bucket: "my-bucket", Key: key }))
//   .on("error", function (err) {
//     console.error(err);
//   })
//   .on("finish", function () {
//     console.log("File uploaded!");
//   });




// route section
var router = express.Router(); 
var Guitar = require('./app/models/guitar.js');
var Fx = require('./app/models/fx.js');
var User = require('./app/models/user.js');
var routes = require('./app/routes/index');
var user = require('./app/routes/user');
var fx = require('./app/routes/fx');

app.use('/', routes);
app.use('/user', user);
app.use('/fx', fx);

mongoose.connect(secrets.connectStr);

var port = process.env.PORT || 8000;
app.listen(port);
console.log('now serving on port ' + port);

module.exports = app;