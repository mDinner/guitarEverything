(function($) {

	$(document).ready(function(e) {
	  console.log('POOP');
	  $('button').on('click', function(e){
	    console.log('stain');
	  })
	})

})(jQuery)


function plusOne(){
  let val = 0
  return function(){
  	val = val + 1
    return val
  }
} 
let test = plusOne();
console.log('test: ', test())
console.log('test: ', test())
console.log('test: ', test())
console.log('test: ', test())
console.log('test: ', test())