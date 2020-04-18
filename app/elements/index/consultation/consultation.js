/*global $: true*/
$('.consultation__head').on('click touch', function() {
    const windowWidth = $(window).outerWidth();
    if(windowWidth < 768) {
        const form = $(this).parents('.consultation');
        form.toggleClass('consultation_active');
        if(form.hasClass('consultation_active')) {
            $('html, body').animate({scrollTop: form.position().top}, 500);
        }
    }
});

const onCheckPolitics = (checkbox, button) => {
    $(checkbox).on('change', function() {
        $(checkbox).prop('checked') ? $(button).prop('disabled', false) : $(button).prop('disabled', true);
    });
}

onCheckPolitics($('[name="consultation-politics"]'), $('.consultation__btn')[0]);
onCheckPolitics($('[name="feedback-politics"]'), $('.consultation__btn')[1]);
onCheckPolitics($('[name="fast-help-politics"]'), $('.fast-help__btn'));

const onCheckForm = (form) => {
    const inputs = $(form).find($('.input-item__input')),
        btn = $(form).find($('button'));
    
    btn.on('click', (e) => {
        let check = 0;
        $(inputs).each(function() {
            if ($(this).val().length > 0) {
                $(this).css('borderColor', 'initial');
                check++;
            } else {
                $(this).css('borderColor', 'red');
            }
        });
        if (check !== 3) {
            e.preventDefault();
            console.log('cancel action');
        } else {
            console.log('submit form');
        }
    });
}

onCheckForm($('.consultation__body')[0]);
onCheckForm($('.consultation__body')[1]);
onCheckForm($('.fast-help__body'));