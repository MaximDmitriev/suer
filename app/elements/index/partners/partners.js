const partnersSlider = new Swiper('[data-slider="partners"]', {
    slidesPerView: 4,
    navigation: {
        prevEl: $('[data-partners-nav="prev"]'),
        nextEl: $('[data-partners-nav="next"]')
    },
    breakpoints: {
        767: {
            slidesPerView: 3
        },
        575: {
            slidesPerView: 2
        },
        450: {
            slidesPerView: 1
        }
    }
});