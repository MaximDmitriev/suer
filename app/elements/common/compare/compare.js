$('.compare__full-btn').on('click', function() {
    $('.compare').toggleClass('compare_active');
});

$('.compare__input')
  .on('input', function() {
      $('.compare__input').each(function() {
          var value = $(this).val();
          if(value.length > 15) {
              $('.compare').addClass('compare_active');
          }
      });
  })
  .on('focus blur', function() {
     var windowWidth = $(window).outerWidth();
     if(windowWidth < 992) {
         $('.compare').addClass('compare_active');
     }
  });
