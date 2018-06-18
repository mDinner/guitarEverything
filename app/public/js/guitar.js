(function($){
	var path = window.location.pathname.split('/')

  if (path[1] === 'guitarsData' && path[2]) {

    var interval = setInterval(function() {
    	$.ajax({
          type: 'GET',
          dataType: "json",
          url: '/guitarsData/api/' + path[2], 
          success: function(guitar) {
        		$('#guitar').append('<div class="guitarDetail"><h2>Details: </h2> Brand: ' +  guitar.brand + ' <br /> Type: ' + guitar.guitarType + ' <br />Model: ' + guitar.model + '</div>');
            // guitar.forEach(function(guitar)
            //   $('#guitar').append('<div class="guitarDetail"><h2>Details: </h2> Brand: ' +  guitar.brand + ' <br /> Type: ' + guitar.guitarType + ' <br />Model: ' + guitar.model + '</div>');
            // });
           }
       });

      clearInterval(interval)
    }, 500)
  }

})(jQuery);
