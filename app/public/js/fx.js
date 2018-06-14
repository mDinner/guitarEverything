var utils = require('./utils')

$(document).ready(function(e) {

  var path = window.location.pathname

  // add fx page
  utils.post("form#addFx", '/fx/all')

  // all fx page
  if (path === '/fx/all') {
    console.log('hello')

    var displayedFx = [];

    $.ajax({
      type: 'GET',
      dataType: "json",
      url: 'fxData',
      success: function(fxs) {
        var elements = '';
        fxs.forEach(function(fx) {
          console.log('fx: ', fx)
          elements += '<div class="fxAll"><div class="fxBrand">' + 'Brand: ' + fx.brand + '</div><div class="fxType"> Type: ' + fx.fxType + '</div><div class="fxName"> Name: ' + fx.fxName + '</div></div>';
          displayedFx.push({
            fxType: fx.fxType,
            data: fx
          })
        });
        $('#fx').append(elements);
      }
    });

    // init select input    
    $('.fx-select').select2();

    $('.guitarSearchTitle').on('click', function(e) {

      var selectedTypes = $('.fx-select').val()

      selectedTypes.forEach(function(x) {
        x = x.toLowerCase()
      })

      // clear content
      $('#fx').empty()

      var elements = ''

      // loop thru displayedFx, show any if type exists in value
      displayedFx.forEach(function (fx) {
        // if element is in selected types, add it
        if (selectedTypes.indexOf(fx.fxType) !== -1) {
          elements += '<div class="fxAll"><div class="fxBrand">' + 'Brand: ' + fx.brand + '</div><div class="fxType"> Type: ' + fx.fxType + '</div><div class="fxName"> Name: ' + fx.fxName + '</div></div>';        
        }
      }) 
      $('#fx').append(elements);


    })
    console.log('turd sandwhich')

  }
});  

