const bannerSlider = new Swiper('[data-slider="banner"]', {
    slidesPerView: 1,
    speed: 800,
    simulateTouch: false,
    loop: true,
    navigation: {
        prevEl: $('[data-banner-nav="prev"]'),
        nextEl: $('[data-banner-nav="next"]')
    },
    autoplay: {
        delay: 6000,
    },
    on: {
        slideChange: function() {
            $('.banner-ctrl__item').removeClass('banner-ctrl__item_active');
            $('.banner-ctrl__item').eq(this.realIndex).addClass('banner-ctrl__item_active');

            let color = $(this.slides[this.activeIndex]).attr('data-slide-color');
            if(color === 'white') {
                $('.header').addClass('header_black');
                $('.banner').addClass('banner_black');
            } else {
                $('.header').removeClass('header_black');
                $('.banner').removeClass('banner_black');
            }
        }
    },
    thumbs: {
        swiper: {
            el: '.banner-ctrl__slider-container',
            slidesPerView: 5,
            breakpoints: {
                991: {
                    slidesPerView: 3
                },
                767: {
                    slidesPerView: 2
                }
            }
        }
    }
});