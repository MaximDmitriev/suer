const contactsSlider = new Swiper('[data-slider="contacts"]', {
    slidesPerView: 1,
    loop: true,
    navigation: {
        prevEl: $('[data-contacts-nav="prev"]'),
        nextEl: $('[data-contacts-nav="next"]')
    },
    autoplay: {
        delay: 5000,
    },
});

const MobilecontactsSlider = new Swiper('[data-slider="mobile-contacts"]', {
    slidesPerView: 1,
    loop: true,
    navigation: {
        prevEl: $('[data-mobile-contacts-nav="prev"]'),
        nextEl: $('[data-mobile-contacts-nav="next"]')
    }
});

$(window).on('scroll', function() {
    var scrollTop = $(window).scrollTop(),
      headerHeight = 200;
    $('.header').css('top', -scrollTop);
    if(scrollTop > headerHeight) {
        $('.header').addClass('header_fixed');
        $('.header').css('top', '');
    } else {
        $('.header').removeClass('header_fixed');
    }
});

$('[data-role="hamburger"]').on('click', function() {
    $(this).toggleClass('hamburger_open');
    $('.mobile-menu').toggleClass('mobile-menu_active');
    $('body').toggleClass('modal-open menu-open');
});

$('[data-role="mobile-lang"]').on('click', function() {
    $('.mobile-menu__lang-dropdown').toggleClass('mobile-menu__lang-dropdown_active');
});