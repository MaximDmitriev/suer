const input = $('.input-item__input');

$(input).focus(function() {
    $(this).prev('label').addClass('input-item__placeholder_active');
    $(this).prev('label').addClass('input-item__placeholder_focus');
});
$(input).focusout(function() {
    $(this).prev('label').removeClass('input-item__placeholder_focus');
    if(!$(this).val()) {
        $(this).prev('label').removeClass('input-item__placeholder_active');
    }
});

$('.fast-help__head').on('click touch', function() {
    const windowWidth = $(window).outerWidth();
    if(windowWidth < 768) {
        const form = $('.fast-help');
        form.toggleClass('fast-help_active');
        if(form.hasClass('fast-help_active')) {
            $('html, body').animate({scrollTop: form.position().top}, 500);
        }
    }
});


function autoHeight (textarea) {
    const divAuto = $(textarea).find($('.auto-height')),
          text = $(textarea).find($('textarea'));
    let check = false;
    $(textarea).on('input', function() {
        switch (true) {
            case $(this).height() < $(divAuto).height() && !check:
                $(textarea).css('height', 'auto');
                break;
            case $(text).outerHeight() >= 118 && !check:
                check = true;
                $(divAuto).addClass('scrollbar-inner');
                $(divAuto).scrollbar();
                $(divAuto).focus();
                break;
            case !$(text).parent().hasClass('scroll-scrolly_visible') && check:
                check = false;
                $(divAuto).removeClass('scrollbar-inner');
                $(divAuto).scrollbar('destroy');
                $(textarea).css('height', '118px');
                $(divAuto).focus();
                break;
            case $(divAuto).val() === '' :
                check = false;
                $(divAuto).removeClass('scrollbar-inner');
                $(divAuto).scrollbar('destroy'); 
                $(textarea).css('height', '45px'); 
                $(divAuto).blur();
                break;
        }
    });
}

autoHeight($('.consultation__input_text')[0]);
autoHeight($('.consultation__input_text')[1]);
autoHeight($('.fast-help__input_text'));