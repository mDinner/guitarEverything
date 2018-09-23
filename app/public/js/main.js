$(document).ready(function(){

	if (window.location.pathname === '/') {
		console.log('hey!!!')
		var requestSuccess = false
		var interval1 = setInterval(function() {
			$.ajax({
		    type: 'GET',
		    dataType: "json",
		    url: '../guitarsData', 
		    success: function(guitars) {
		      guitars.forEach(function(guitar) {
			    	console.log(guitar)
		        $('#result').append('<div class="guitarDetail col-md-3" id="' + guitar._id + '"><h2>Details: </h2> Brand: ' +  guitar.brand + ' <br /> Type: ' + guitar.guitarType + ' <br />Model: ' + guitar.model + '</div>');
		      });
		    }
			});
			clearInterval(interval1)
		}, 500)	
	
	  var interval2 = setInterval(function() {
			var guitarDetail = document.querySelectorAll('.guitarDetail');
			// if data, set up and clear interval		
			if (guitarDetail.length > 0) {
				for (var i = 0; i < guitarDetail.length; i++) {
					guitarDetail[i].addEventListener('click', clickHandle)
					function clickHandle(e) {
						window.location = 'guitarsData/' + e.target.getAttribute('id');
					}
				}
				clearInterval(interval2)
			}
	  }, 100)
	}


 var piq = $('#pic-upload')

 $('#pic-upload').on('change`', function(e) {
 	console.log('e: ', e)
 	console.log('arguments: ', arguments)
 });

 var dropzoneTarget = "div#dropzoneInput"
 var dropZoneElem = $(dropzoneTarget)
 if (dropZoneElem.length === 0) {
	 var myDropzone = new Dropzone(dropzoneTarget);
 }

//  var images = 

});