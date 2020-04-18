let tooltipInterval;

$('body')
  .on('click mouseenter', '.alike__question-wrap, .info__question-wrap, .optional__question-wrap, .input-form__question-wrap, .selection__question-wrap, .res__question-wrap, .alike__question-wrap', function(e) {
      e.stopPropagation();
      let
        title = ($(this).attr('data-tooltip-title') === undefined) ? 'Заголовок тултипа' : $(this).attr('data-tooltip-title'),
        fullText = ($(this).attr('data-tooltip-text') === undefined) ? 'По данному параметру нет информации' : $(this).attr('data-tooltip-text'),
        shortText = fullText.slice(0, 160) + '...',
        text = fullText,
        btn = '';

      if(fullText.length > 160) {
          text = shortText;
          btn = '<div class="tooltip__btn" data-modal="#tooltip" data-tooltip-text="' + fullText + '" data-tooltip-title="' + title + '">Подробнее</div>'
      }

      let
        tpl = '<div class="tooltip"><div class="tooltip__title">' + title + '</div><div class="tooltip__desc">' + text + '</div>' + btn + '<div class="tooltip__close"></div></div>',
        question = $(this),
        windowWidth = $(window).outerWidth(),
        windowHeight = $(window).outerHeight(),
        windowTop = $(window).scrollTop() + $('.header').outerHeight(),
        windowBottom = windowTop + windowHeight,
        questionTop = question.offset().top,
        questionLeft = question.offset().left,
        questionHeigt = question.outerHeight();

      $('.tooltip').remove();
      $(tpl).appendTo($('body'));

      let item = $('.tooltip'),
        itemWidth = item.outerWidth(),
        itemHeight = item.outerHeight(),
        itemTop = questionTop - itemHeight - 15,
        itemLeft = questionLeft - 257;


      if(itemLeft < 0) {
          item.removeClass('tooltip_right').addClass('tooltip_left');
          itemLeft = questionLeft - 26;
      } else {
          item.addClass('tooltip_right').removeClass('tooltip_left');
      }
      if(windowTop > itemTop) {
          item.removeClass('tooltip_bottom').addClass('tooltip_top');
          itemTop = questionTop + questionHeigt + 15;
      } else {
          item.addClass('tooltip_bottom').removeClass('tooltip_top');
      }
      item.css({
          top: itemTop,
          left: itemLeft
      });
  })
  .on('mouseleave', '.tooltip, .icon-question', function() {
      tooltipInterval = setInterval(function() {
          $('.tooltip').remove();
      }, 500);
  });

$('body').on('mouseenter', '.icon-question, .tooltip', function() {
    clearInterval(tooltipInterval);
    tooltipInterval = '';
});

$('body').on('click', '.tooltip__btn', function() {
    tooltipModal.open();
    $('.tooltip-modal__title').text($(this).attr('data-tooltip-title'));
    $('.tooltip-modal__text').text($(this).attr('data-tooltip-text'));
});

$('*').on('scroll mousewheel wheel DOMMouseScroll  click', function(e) {
    if($('.tooltip').length) {
        if(e.type === 'click') {
            if(!$('.tooltip').is(e.target) && !$('.tooltip').has(e.target).length) {
                $('.tooltip').remove();
            }
        } else {
            $('.tooltip').remove();
        }
    }
});

$('body').on('click', '.tooltip__close', function() {
    $(this).parents('.tooltip').remove();
});