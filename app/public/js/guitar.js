(function($){

	console.log('hey!!')

	var path = window.location.pathname.split('/')
	path = path[2]

	$.ajax({
      type: 'GET',
      dataType: "json",
      url: '/guitarsData/api/' + path, 
      success: function(guitar) {

      	console.log('guitar: ', guitar)

		$('#guitar').append('<div class="guitarDetail"><h2>Details: </h2> Brand: ' +  guitar.brand + ' <br /> Type: ' + guitar.guitarType + ' <br />Model: ' + guitar.model + '</div>');      	

        // guitar.forEach(function(guitar) {

        //   $('#guitar').append('<div class="guitarDetail"><h2>Details: </h2> Brand: ' +  guitar.brand + ' <br /> Type: ' + guitar.guitarType + ' <br />Model: ' + guitar.model + '</div>');
        // });
        
     }
   });
	


	//$('a.delete-show').attr('href', '/');


})(jQuery);