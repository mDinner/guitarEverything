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
        		$('#guitar').append('<div class="guitarDetail"><h2>Details: </h2> Brand: ' +  guitar.brand + ' <br /> Type: ' + guitar.guitarType + ' <br />Model: ' + guitar.model + '</div>');
           }
       });

      clearInterval(interval)
    }, 500)
  }

})(jQuery);
