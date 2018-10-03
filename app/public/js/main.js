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

			// clear old results from page
			$('#result .details').remove();
			
			// get search results & display them
			$.ajax({
		    type: 'POST',
		    dataType: "json",
				url: '../guitarSearchData',
				data: {
					brand: e.target.brand.value,
					guitarType: e.target.guitarType.value,
					model: e.target.model.value,
				},
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