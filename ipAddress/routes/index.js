exports = module.exports = function ( router ) {

  router.get('/', function(req, res) {

    res.render('index', {
    	testData: 'sup man'
    });
  });

}