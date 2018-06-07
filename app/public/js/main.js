$(document).ready(function(){

	var path = window.location.pathname.split('/')
	path = path[2]

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



 console.log('hello!!')
 var piq = $('#pic-upload')
 console.log('piq: ', piq)
 $('#pic-upload').on('change`', function(e) {
 	console.log('e: ', e)
 	console.log('arguments: ', arguments)
 })


});