$(document).ready(function(){



 $.ajax({
      type: 'GET',
      dataType: "json",
      url: '../guitarsData', 
      success: function(guitars) {

        guitars.forEach(function(guitar) {

          $('#result').append('<div class="guitarDetail"><h2>Details: </h2> Brand: ' +  guitar.brand + ' <br /> Type: ' + guitar.guitarType + ' <br />Model: ' + guitar.model + '</div>');
        });
        
     }
   });



});