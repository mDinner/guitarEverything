var express    = require('express'); 		// call express
var path 	   = require('path');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var monSess    = require('mongoose-session');
var session    = require('express-session');
var bcrypt 	   = require('bcrypt');
const MongoStore = require('connect-mongo')(session);

var app        = express(); 				// define our app using express


// app config
app.use(bodyParser());
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, './app/views'));
app.use(express.static(__dirname + '/app/public'));

const connection = mongoose.createConnection('mongodb://localhost/test');

// set up sessions
app.use(session({
  key: 'session',
  secret: 'doggy',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({mongooseConnection: connection})
}));

// route section
var router = express.Router(); 
var Guitar = require('./app/models/guitar.js')
var User = require('./app/models/user.js')
var routes = require('./app/routes/index');
var user = require('./app/routes/user');
// require( './app/routes' )( router, Guitar );
// require('./app/routes/user')( router, User);
// app.use(router) 

app.use('/', routes);
app.use('/user', user);

mongoose.connect('mongodb://localhost/test');

var port = process.env.PORT || 8000;
app.listen(port);
console.log('now serving on port ' + port);

module.exports = app;