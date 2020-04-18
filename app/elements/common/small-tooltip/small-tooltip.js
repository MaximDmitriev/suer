let smallTooltipInterval;

$('body').on('mouseenter', '[data-role="small-tooltip"]', function(e) {
    e.stopPropagation();
    let
      text = ($(this).attr('data-tooltip-text') === undefined) ? 'Нет подсказки' : $(this).attr('data-tooltip-text'),
      tpl = '<div class="small-tooltip">' + text + '</div>';

    $('.small-tooltip').remove();

    $(tpl).appendTo($('body'));

    let item = $('.small-tooltip');

    console.log($(this).offset().top);
    item.css({
        top: $(this).offset().top + item.outerHeight() + 10,
        left: $(this).offset().left - (item.outerWidth() / 2) + ($(this).outerWidth() / 2)
    });
})
  .on('mouseleave', '.small-tooltip, [data-role="small-tooltip"]', function() {
      $('.small-tooltip').remove();
  });
