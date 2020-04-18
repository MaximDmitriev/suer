

$('.props__checkbox').on('change', function() {
    var top = $(this).offset().top,
      propsTop = $(this).parents('.props').offset().top,
      propsLeft = $(this).parents('.props').offset().left,
      tooltipWidth = $('.props__tooltip').outerWidth(),
      left = $(this).offset().left;
    $('.props__tooltip').css({
        top: top - propsTop - 15,
        left: left - propsLeft - tooltipWidth - 30
    })
});