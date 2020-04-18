/* eslint-disable no-inner-declarations */
if($('.res').length > 0) {
    let scrollWidth = 0;

    $('.res__card').each(function() {
        scrollWidth += $(this).outerWidth();
    });

    let resultScroll = new PerfectScrollbar('[data-role="result-scroll"]', {
        wheelSpeed: 1,
        maxScrollbarLength: 200,
        useBothWheelAxes: true,
        scrollXMarginOffset: 20
    });

    $('<div class="res__arrow-left"></div>').appendTo($('.ps__rail-x'));
    $('<div class="res__arrow-right"></div>').appendTo($('.ps__rail-x'));


    const options = $('.res__selected-dropdown-item');
    const select = $('.res__selected-btn');

    $('.res__card').css({
        'padding-top': $('.res__card-top').outerHeight()
    });

    $(window).on('scroll', function() {
        let
          list = $('.res__content'),
          item = $('.res__card-top'),
          windowTop = $(this).scrollTop();

        if(windowTop + 87 > list.offset().top && (windowTop + 87 - list.offset().top < (list.innerHeight() - item.outerHeight()))) {
            item.css('top', windowTop + 86 - list.offset().top);
            $('.res__container .ps__rail-x').css('top', Math.floor(windowTop + 387 - list.offset().top));
        }
        if(windowTop + 87 < list.offset().top) {
            item.css('top', '');
            $('.res__container .ps__rail-x').css('top', '');
        }
    });

    $(options).on('click', function(e) {
        e.stopPropagation();
        $('.res_open').find('.select__input').val($(this).attr('data-value'));
        $('.res_open').find('.res__selected-btn-txt').text($(this).text());
        $(options).removeClass('res__selected-dropdown-item_active');
        $(this).addClass('res__selected-dropdown-item_active');
        select.removeClass('res_open');
    });

    $(select).on('click', function(e) {
        e.stopPropagation();
        select.removeClass('res_open');
        $(this).toggleClass('res_open');
    });

    $('.res__card-row-group-indicator').each(function() {
        let
          indicator = $(this),
          titleHeight = ($('.res__card-row-item_title', indicator.parents('.res__card-row-group')).outerHeight()) / 2 + 12;
        indicator.css('top', titleHeight);
    });

    $(document).on('click', function(e) {
        if($('.res_open').length) {
            if(!$('.res_open').is(e.target) && $('.res_open').has(e.target).length === 0) {
                select.removeClass('res_open');
            }
        }
    });

    $('.res__props-item').each((index) => {
        let heights = [];
        $(`[data-row=${index + 1}]`).each((i, el) => {
            heights.push($(el).innerHeight());
        });
        heights.sort((a, b) => (b - a));
        $(`[data-row=${index + 1}]`).css('height', heights[0]);
    });

    $('.res__card-row-item_title').on('click', function() {
        let
          group = $(this).parents('.res__card-row-group'),
          list = $('.res__card-row-group-list', group),
          h = 0;

        $('.res__card-row-item', list).each(function() {
            h = h + $(this).outerHeight();
        });

        h = h + ($('.res__card-row-item', list).length * 12);

        list.css('max-height', h);

        $('[data-row]').css('height', '');

        group.toggleClass('res__card-row-group_active');
        $('.res__props-item').each((index) => {
            let heights = [];
            $(`[data-row=${index + 1}]`).each((i, el) => {
                heights.push($(el).innerHeight());
            });
            heights.sort((a, b) => (b - a));
            setTimeout(function() {
                $(`[data-row=${index + 1}]`).css('height', heights[0]);
            }, 400)
        });
    });

    const activeClass = 'res__card-icon_active',
      showClass = 'res__card_hidden';

    function writeNumber() {
        const count = $('.res__card_hidden').length;
        $('.res__switch-btn-count').text(count);
        return count;
    }

    writeNumber();

    let counter = 0;
    $('[data-action="pin"]').click(function() {
        const card = ($(this).parentsUntil('[data-name="wrapper"]'))[3];
        if($(card).attr('data-state') === 'unpinned' && counter < 3) {
            $(this).toggleClass(activeClass);
            $(card).appendTo($('.res__container-pinned'));
            $(card).attr('data-state', 'pinned');
            counter++;
        } else if($(card).attr('data-state') === 'pinned') {
            $(this).toggleClass(activeClass);
            $(card).prependTo($('.res__container'));
            $(card).attr('data-state', 'unpinned');
            counter--;
        }
        resultScroll.update();
    });

    $('[data-action="hide"]').click(function() {
        $(this).toggleClass(activeClass);

        const card = ($(this).parentsUntil('[data-name="wrapper"]'))[3];
        if($(card).attr('data-state') === 'pinned') {
            $(card).find('[data-action="pin"]').removeClass(activeClass);
            $(card).prependTo($('.res__container'));
            $(card).attr('data-state', 'unpinned');
            counter--;
        }
        $(card).toggleClass(showClass);

        const num = writeNumber();
        if(num === $('.res__card').length) {
            $('.res__switch-btn').click();
            $('.res__switch-btn').addClass('res__switch-btn_hidden');
        } else {
            $('.res__switch-btn').removeClass('res__switch-btn_hidden');
        }
        resultScroll.update();
    });

    $('[data-action="graph"]').click(function() {
        $(this).toggleClass(activeClass);
    });

    $('[data-action="list"]').click(function() {
        $(this).toggleClass(activeClass);
    });

    $('.res__switch-btn').click(function() {
        const num = writeNumber();
        if(num !== 0) {
            $('.res__card').toggleClass(showClass);

            if($(this).attr('data-show') === 'true') {
                $('.res__switch-btn-text').text('Закрыть исключенные');
                $(this).attr('data-show', 'false');
            } else {
                $('.res__switch-btn-text').text('Открыть исключенные');
                $(this).attr('data-show', 'true');
            }
            writeNumber();
        }
        resultScroll.update();
    });
    $('.selection').addClass('selection_hidden');
    $('.res__btn-tune').click(() => {
        $('.selection').toggleClass('selection_hidden');
        $('.res__btn-tune-content').toggleClass('res__btn-tune-content_active');
    });
}
