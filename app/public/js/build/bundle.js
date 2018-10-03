(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var utils = require('./utils')

$(document).ready(function(e) {

  var path = window.location.pathname;

  // add fx page
  utils.post("form#addFx", '/fx/all')

  // all fx page
  if (path === '/fx/all') {
    var displayedFx = [];

    $.ajax({
      type: 'GET',
      dataType: "json",
      url: 'fxData',
      success: function(fxs) {
        var elements = '';
        fxs.forEach(function(fx) {
          console.log('fx: ', fx)
          elements += '<div class="details fx"><div class="fxBrand">' + 'Brand: ' + fx.brand + '</div><div class="fxType"> Type: ' + fx.fxType + '</div><div class="fxName"> Name: ' + fx.fxName + '</div></div>';
          displayedFx.push({
            fxType: fx.fxType,
            data: fx
          });
        });
        $('#fx').append(elements);
      }
    });

    // init select input    
    $('.fx-select').select2();

    $('.guitarSearchTitle').on('click', function(e) {
      var selectedTypes = $('.fx-select').val();

      // clear content
      $('#fx').empty();

      // loop thru displayedFx, show any if type exists in value
      var elements = '';
      displayedFx.forEach(function (fx) {
        // if element is in selected types, add it
        if (selectedTypes.indexOf(fx.fxType) !== -1) {
          elements += '<div class="details"><div class="fxBrand">' + 'Brand: ' + fx.brand + '</div><div class="fxType"> Type: ' + fx.fxType + '</div><div class="fxName"> Name: ' + fx.fxName + '</div></div>';        
        }
      }); 
      $('#fx').append(elements);
    });
  }
});  


},{"./utils":5}],2:[function(require,module,exports){
(function($){
	var path = window.location.pathname.split('/')

  // get individual guitar, ex: http://localhost:8000/guitarsData/5b2836ea657f0d4d4537c563
  if (path[1] === 'guitarsData' && path[2]) {

    var interval = setInterval(function() {
    	$.ajax({
          type: 'GET',
          dataType: "json",
          url: '/guitarsData/api/' + path[2], 
          success: function(guitar) {
        		$('#guitar').append('<div class="guitarDetail"><h2>Details: </h2> Brand: ' +  guitar.brand + ' <br /> Type: ' + guitar.guitarType + ' <br />Model: ' + guitar.model + '</div>' + guitar.imageUrl);
           }
       });

      clearInterval(interval)
    }, 500)
  }

})(jQuery);

},{}],3:[function(require,module,exports){
$(document).ready(function(){

	if (window.location.pathname === '/') {
		console.log('home page');

		// load guitars onto homepage
		var interval1 = setInterval(function() {
			$.ajax({
		    type: 'GET',
		    dataType: "json",
		    url: '../guitarsData', 
		    success: function(guitars) {
		      guitars.forEach(function(guitar) {
		        $('#result').append('<div class="details col-md-3" id="' + guitar._id + '"><h2>Details: </h2> Brand: ' +  guitar.brand + ' <br /> Type: ' + guitar.guitarType + ' <br />Model: ' + guitar.model + '</div>');
		      });
		    }
			});
			clearInterval(interval1)
		}, 500);
	
		// set clicks on guitars to take you to their detail pages
	  var interval2 = setInterval(function() {
			var guitarDetail = document.querySelectorAll('.guitarDetail');
			if (guitarDetail.length > 0) {
				for (var i = 0; i < guitarDetail.length; i++) {
					guitarDetail[i].addEventListener('click', clickHandle)
					function clickHandle(e) {
						window.location = 'guitarsData/' + e.target.getAttribute('id');
					}
				}
				clearInterval(interval2)
			}
		}, 100);
		
		function guitarSearch (e) {
			e.preventDefault();
			e.stopPropagation();
			console.log('clicked, removing!');

			// clear old results from page
			$('#result .details').remove();

			var dataObj = {
				brand: e.target.brand.value,
				guitarType: e.target.guitarType.value,
				model: e.target.model.value,
			}
			
			console.log('dataObj: ', dataObj);
			// get search results & display
			$.ajax({
		    type: 'POST',
		    dataType: "json",
				url: '../guitarSearchData',
				data: dataObj,
		    success: function(guitars) {
		      guitars.forEach(function(guitar) {
		        $('#result').append('<div class="details col-md-3" id="' + guitar._id + '"><h2>Details: </h2> Brand: ' +  guitar.brand + ' <br /> Type: ' + guitar.guitarType + ' <br />Model: ' + guitar.model + '</div>');
		      });
		    }
			});

		}

		$('#searchGuitars').on('submit', guitarSearch);





	}


 var dropzoneTarget = "div#dropzoneInput";
 var dropZoneElem = $(dropzoneTarget);
 if (dropZoneElem.length === 0) {
	 var myDropzone = new Dropzone(dropzoneTarget);
 }

});
},{}],4:[function(require,module,exports){
(function($) {

	$(document).ready(function(e) {
	  console.log('POOP');
	  $('button').on('click', function(e){
	    console.log('stain');
	  })
	})

})(jQuery)


function plusOne(){
  let val = 0
  return function(){
  	val = val + 1
    return val
  }
} 
let test = plusOne();
console.log('test: ', test())
console.log('test: ', test())
console.log('test: ', test())
console.log('test: ', test())
console.log('test: ', test())
},{}],5:[function(require,module,exports){
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
},{}]},{},[1,2,3,4,5]);
