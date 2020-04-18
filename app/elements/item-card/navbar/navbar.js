let sections = $('[data-section]'), nav = $('.navbar');

$(window).on('scroll', function () {
    let cur_pos = $(this).scrollTop();
    sections.each(function() {
        let top = $(this).offset().top,
          bottom = top + $(this).outerHeight();

        if (cur_pos + 87 >= top && cur_pos <= bottom) {
            $('.navbar__navitem').removeClass('navbar__navitem_active');
            sections.removeClass('active');
            $(this).addClass('active');

            let active = $('[data-url="'+$(this).attr('data-section')+'"]');
            $('.navbar__nav-active').css({
                left: active.position().left,
                width: active.outerWidth()
            })
        }
    });
});

$('.navbar__navitem').on('click', function () {
    let section = $(this).attr('data-url');
    $('html, body').animate({
        scrollTop: $('[data-section="'+section+'"]').offset().top - 86
    }, 500);
    return false;
});