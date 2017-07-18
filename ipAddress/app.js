// packages AKA dependencies
var express    = require('express');    // call express
var app        = express();         // define our app using express
var bodyParser = require('body-parser');
var path     = require('path');
var router = express.Router();
var session    = require('express-session');
var exphbs  = require('express-handlebars');
// var User   = require('./app/models/user.js');

// app config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}))

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));


// set up sessions
// app.use(session({
//   key: 'session',
//   secret: 'doggy',
//   resave: false,
//   saveUninitialized: true,
// }));


// route section
require( './routes' )( router );

// Register router, to prefix all routes w/ '/api' use: app.use('/api', router);
app.use(router);

var port = process.env.PORT || 8000;
app.listen(port);
console.log('now serving on port ' + port);