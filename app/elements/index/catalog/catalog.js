$('.catalog__item').on('click', function() {
    const windowWidth = $(window).outerWidth();
    $('.catalog__popup').addClass('catalog__popup_active');

    if(windowWidth < 768) {
        setTimeout(function() {
            $('html, body').animate({scrollTop: $('.catalog__container').offset().top}, 500);
        }, 100);

    }
});
$('.catalog__back-btn').on('click', function() {
    $('.catalog__popup').removeClass('catalog__popup_active');
});