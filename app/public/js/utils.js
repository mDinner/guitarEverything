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