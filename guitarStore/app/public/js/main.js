$(document).ready(function(){



 $.ajax({
      type: 'GET',
      dataType: "json",
      url: '../guitarsData', 
      success: function(guitars) {

        guitars.forEach(function(guitar) {

          $('#result').append( guitar._id, '<h2>Details: </h2><div>brand: ',  guitar.brand , ' <br /> Scale: ', guitar.scale, ' <br />Year: ' , guitar.year,'</div>');
        });
        
     }
   });



});