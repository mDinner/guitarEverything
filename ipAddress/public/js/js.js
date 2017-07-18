window.onload = function(){
$.getJSON("http://jsonip.com?callback=?", function (data) {
    alert("Your ip: " + data.ip);
});
}