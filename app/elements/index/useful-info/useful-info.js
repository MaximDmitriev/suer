const usefulInfo = () => {
    const usefulInfoSlider = new Swiper('[data-slider="useful-info"]', {
        autoHeight: true,
        slidesPerView: 'auto',
        simulateTouch: false,
        navigation: {
            prevEl: $('[data-useful-info-nav="prev"]'),
            nextEl: $('[data-useful-info-nav="next"]')
        },
        pagination: {
            el: '.useful-info__pagination',
            type: 'bullets',
            bulletElement: 'div',
            bulletClass: 'useful-info__pagination-item',
            bulletActiveClass: 'useful-info__pagination-item_active',
            clickable: true
        },
        breakpoints: {
            991: {
                spaceBetween: 30,
                slidesPerView: 2,
            },
            767: {
                spaceBetween: 30,
                slidesPerView: 1,
            }
        }
    });
    
    window.addEventListener('resize', () => {
        if (document.body.clientWidth > 991) {
            usefulInfoSlider.updateSlides();
            usefulInfoSlider.updateSlidesClasses();
        }
    });
}
document.querySelector('div[data-slider="useful-info"]') && usefulInfo();