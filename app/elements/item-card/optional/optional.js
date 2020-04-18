const optional = () => {
    const optionalSlider = new Swiper(document.querySelector('.swiper-container[data-slider="optional"]'), {
        slidesPerView: 4,
        loop: true,
        spaceBetween: 30,
        navigation: {
            prevEl: $('[optional-nav="prev"]'),
            nextEl: $('[optional-nav="next"]')
        }
    });
    new Kmodal('#optional-modal');
};

const select = $('.optional__item-select');

if(select.length) {
    const options = $('.optional__item-dropdown-item');

    $(options).on('click', function(e) {
        e.stopPropagation();
        $('.optional_open').find('.optional__input-select').val($(this).attr('data-value'));
        $('.optional_open').find('.optional__item-select-btn-txt').text($(this).text());
        $(options).removeClass('optional__item-dropdown-item_active');
        $(this).addClass('optional__item-dropdown-item_active');
        select.removeClass('optional_open');
    });

    $(select).on('click', function(e) {
        if(!e.target.classList.contains('info___question-wrap') && !e.target.classList.contains('optional__question')) {
            e.stopPropagation();
            select.removeClass('optional_open');
            $(this).toggleClass('optional_open');
        }
    });

    $(document).on('click', function(e) {
        if($('.optional_open').length) {
            if(!$('.optional_open').is(e.target) && $('.optional_open').has(e.target).length === 0) {
                select.removeClass('optional_open');
            }
        }
    });
}

document.querySelector('.optional') && optional();