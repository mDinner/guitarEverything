(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var utils = require('./utils')

$(document).ready(function(e) {

  var path = window.location.pathname

  // add fx page
  utils.post("form#addFx", '/fx/all')

  // all fx page
  if (path === '/fx/all') {
    console.log('hello')

    var displayedFx = [];

    $.ajax({
      type: 'GET',
      dataType: "json",
      url: 'fxData',
      success: function(fxs) {
        var elements = '';
        fxs.forEach(function(fx) {
          console.log('fx: ', fx)
          elements += '<div class="fxAll"><div class="fxBrand">' + 'Brand: ' + fx.brand + '</div><div class="fxType"> Type: ' + fx.fxType + '</div><div class="fxName"> Name: ' + fx.fxName + '</div></div>';
          displayedFx.push({
            fxType: fx.fxType,
            data: fx
          })
        });
        $('#fx').append(elements);
      }
    });
    
    $('.fx-select').select2();
    $('.guitarSearchTitle').on('click', function(e) {
      var selectedTypes = $('.fx-select').val()
      selectedTypes.forEach(function(x) {
        x = x.toLowerCase()
      })
      console.log('value: ', selectedTypes)

      // clear content
      $('#fx').empty()

      var elements = ''

      // loop thru displayedFx, show any if type exists in value
      displayedFx.forEach(function (fx) {
        console.log('fx: ', fx)
        // if   fx.fxType 
        if (selectedTypes.indexOf(fx.fxType) !== -1) {
            elements += '<div class="fxAll"><div class="fxBrand">' + 'Brand: ' + fx.brand + '</div><div class="fxType"> Type: ' + fx.fxType + '</div><div class="fxName"> Name: ' + fx.fxName + '</div></div>';        
        }
      }) 
      $('#fx').append(elements);


    })
    console.log('turd sandwhich')

  }
});  


},{"./utils":4}],2:[function(require,module,exports){
(function($){

	console.log('hey!!')

	var path = window.location.pathname.split('/')
	path = path[2]

  var fullPath = window.location.pathname



	$.ajax({
      type: 'GET',
      dataType: "json",
      url: '/guitarsData/api/' + path, 
      success: function(guitar) {

      	console.log('guitar: ', guitar)

		$('#guitar').append('<div class="guitarDetail"><h2>Details: </h2> Brand: ' +  guitar.brand + ' <br /> Type: ' + guitar.guitarType + ' <br />Model: ' + guitar.model + '</div>');
        // guitar.forEach(function(guitar)
        //   $('#guitar').append('<div class="guitarDetail"><h2>Details: </h2> Brand: ' +  guitar.brand + ' <br /> Type: ' + guitar.guitarType + ' <br />Model: ' + guitar.model + '</div>');
        // });
     }
   });
	

	//$('a.delete-show').attr('href', '/');


})(jQuery);

},{}],3:[function(require,module,exports){
$(document).ready(function(){

	var path = window.location.pathname.split('/')
	path = path[2]

	var fullPath = window.location.pathname


 $.ajax({
    type: 'GET',
    dataType: "json",
    url: '../guitarsData', 
    success: function(guitars) {
      guitars.forEach(function(guitar) {
	    	console.log(guitar)

        $('#result').append('<div class="guitarDetail" id="' + guitar._id + '"><h2>Details: </h2> Brand: ' +  guitar.brand + ' <br /> Type: ' + guitar.guitarType + ' <br />Model: ' + guitar.model + '</div>');
      });
      
   }
 });



  var interval = setInterval(function() {

		var guitarDetail = document.querySelectorAll('.guitarDetail');

		// if data, set up and clear interval		
		if (guitarDetail.length > 0) {
			for (var i = 0; i < guitarDetail.length; i++) {
				console.log('guitarDetail[i]: ', guitarDetail[i])

				guitarDetail[i].addEventListener('click', clickHandle)
				function clickHandle(e) {

					console.log('click, e: ', e);
					window.tester = e
					window.location = 'guitarsData/' + e.target.getAttribute('id');
				}
			}

			clearInterval(interval)
		}

  }, 50)



 console.log('hello!!3232')
 var piq = $('#pic-upload')
 console.log('piq: ', piq)

 $('#pic-upload').on('change`', function(e) {
 	console.log('e: ', e)
 	console.log('arguments: ', arguments)
 })


});
},{}],4:[function(require,module,exports){
function post(target, nextPath) {
  
  $(target).submit(function(e) {
    console.log('submit fired');
    e.preventDefault();

    // get data
    var form_data = $(this).serialize();
    var form_url = $(this).attr("action");
    var form_method = $(this).attr("method").toUpperCase();

    $.ajax({
      url: form_url,
      type: form_method,
      data: form_data,
      cache: false,
      success: function(returnhtml) {
        console.log('Succesfully added show!');
        window.location.pathname = nextPath;
      }
    });
  });  

}


module.exports = {
	post: post
}
},{}]},{},[1,2,3,4]);
