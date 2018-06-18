var express    = require('express'); 		// call express
var path 	   = require('path');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var monSess    = require('mongoose-session');
var session    = require('express-session');
var secrets    = require('./secrets')
const MongoStore = require('connect-mongo')(session);

var app        = express(); 				// define our app using express


console.log('secrets: ', secrets)

// app config
app.use(bodyParser());
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, './app/views'));
app.use(express.static(__dirname + '/app/public'));

var connectString = 'mongodb://' + secrets.dbUser + ':' + secrets.dbPw + secrets.secrets
var connectStr = 'mongodb://mdinner:duckSauc3@ds261450.mlab.com:61450/guitar'
console.log('connectString: ', connectString)

const connection = mongoose.createConnection(secrets.connectStr);

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
var Fx = require('./app/models/fx.js')
var User = require('./app/models/user.js')
var routes = require('./app/routes/index');
var user = require('./app/routes/user');
var fx = require('./app/routes/fx');
// require( './app/routes' )( router, Guitar );
// require('./app/routes/user')( router, User);
// app.use(router) 

app.use('/', routes);
app.use('/user', user);
app.use('/fx', fx);

mongoose.connect(secrets.connectStr);

var port = process.env.PORT || 8000;
app.listen(port);
console.log('now serving on port ' + port);

module.exports = app;