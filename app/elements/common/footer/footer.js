const footerContactsSlider = new Swiper('[data-slider="footer-contacts"]', {
    slidesPerView: 1,
    loop: true,
    navigation: {
        prevEl: $('[data-footer-contacts-nav="prev"]'),
        nextEl: $('[data-footer-contacts-nav="next"]')
    },
    autoplay: {
        delay: 5000,
    }
});