const ENTER_KEY = 13,
  body = $('body');

let afterError = false;

// Включаем скроллбары

if($('[data-js-action="set-scrollbar"]').length) {
    $('[data-js-action="set-scrollbar"]').each(function() {
        new PerfectScrollbar(this, {
            maxScrollbarLength: 56,
            wheelPropagation: false,
        });
    });
}

// Слайдер с фотографиями
let infoSliderOptions = {
      slidesPerView: 1,
      navigation: {
          prevEl: $('[data-info-nav="prev"]'),
          nextEl: $('[data-info-nav="next"]')
      },
      thumbs: {
          swiper: {
              el: $('[data-slider="info-slider-small"]'),
              slidesPerView: 4,
              spaceBetween: 1
          }
      }
  },
  infoSlider = new Swiper($('[data-slider="info-slider"]'), infoSliderOptions);


body.on('click', '[data-js-action="change-slider"]', function() {
    let slider = $(this).data('slider');
    $('[data-js-action="change-slider"]').removeClass('info__slide-tool_active');
    $(this).addClass('info__slide-tool_active');
    if(slider === 'img') {
        $('[data-type="draft"]').removeClass('swiper-slide swiper-slide-thumb-active').addClass('non-swiper-slide');
        $('[data-type="img"]').removeClass('non-swiper-slide').addClass('swiper-slide');
        $('[data-type="img"]').each(function() {
            $(this).prependTo($(this).parents('.swiper-wrapper'));
        });
    }
    if(slider === 'draft') {
        $('[data-type="img"]').removeClass('swiper-slide swiper-slide-thumb-active').addClass('non-swiper-slide');
        $('[data-type="draft"]').removeClass('non-swiper-slide').addClass('swiper-slide');
        $('[data-type="draft"]').each(function() {
            $(this).prependTo($(this).parents('.swiper-wrapper'));
        });
    }
    infoSlider.destroy();
    infoSlider = new Swiper($('[data-slider="info-slider"]'), infoSliderOptions);
});

body.on('click', '[data-js-action="add-to"]', function() {
    $(this).toggleClass('info__slide-tool_active');
});


// Меняем тип докумнетов
body.on('click', '[data-js-action="change-docs-type"]', function() {
    var $clicked = $(this),
      docsType = $clicked.data('docs-type'),
      docsStore = $('[data-js-store="docs"]');
    setLoading($('[data-js-role="docs-loading"]'));
    $.ajax({
        url: 'ajax/docs.html',
        data: {
            type: docsType
        },
        success: function(docs) {
            setTimeout(function() {
                docsStore.html(docs);
                $('.info__docs-tab').removeClass('info__docs-tab_active');
                $clicked.addClass('info__docs-tab_active');
                removeLoading($('[data-js-role="docs-loading"]'));
            }, 500)
        }
    });
});

// Слайдер с выбором опций
let detailsSlider = new Swiper(document.querySelector('.swiper-container[data-slider="details-slider"]'), {
    slidesPerView: 1,
    loop: false,
    init: false,
    autoHeight: true,
    shortSwipes: 0,
    navigation: {
        prevEl: $('[details-info-nav="prev"]'),
        nextEl: $('[details-info-nav="next"]')
    },
    on: {
        slideChange: function() {
            let id = $(this.slides[this.activeIndex]).data('parameter-id');
            $('.info__code-block-cell').removeClass('info__code-block-cell_active');
            $('.info__code-block-cell', $('[data-parameter-id="' + id + '"]')).addClass('info__code-block-cell_active');

            $('.info__full-spec-row').removeClass('info__full-spec-row_active');
            $('.info__full-spec-row[data-parameter-id="' + id + '"]').addClass('info__full-spec-row_active');
            $('.info__full-details-wrap').removeClass('info__full-details-wrap_active');
            $('.info__full-details-wrap[data-parameter-id="' + id + '"]').addClass('info__full-details-wrap_active');
  }
    }
});


// Переключатель режимов
body.on('click', '[data-js-action="switch-mode"]', function() {

    // Меняем состояние кнопки
    $('.info__switchbar-switch-point').toggleClass('info__switchbar-switch-point_left');
    $('.info__switchbar-label').toggleClass('info__switchbar-label_active');

    // Показываем строку заказа
    $('.info__code-block').toggleClass('info__code-block_active');

    // Показываем поиск
    $('.info__speclist').toggleClass('info__speclist_hidden');
    $('.info__config-box').toggleClass('info__config-box_active');

    // Меняем кнопку снизу
    $('.info__reportbar').toggleClass('info__reportbar_left').toggleClass('info__reportbar_right');
});

body.on('click', e => {
    if (e.target && typeof(e.target.className) !== 'object' && e.target.className.indexOf('code-popup') === -1 && !$('.info__code-popup').hasClass('info__code-popup_hidden')) {
        $('.info__code-popup').addClass('info__code-popup_hidden');
        $('.info__cell-wrap').removeClass('info__cell-wrap_tooltip');
    }
});

body.on('click', '[data-parameter-id]', function(e) {
    let id = $(this).data('parameter-id');

    if($('.info__code-block-cell', $('[data-parameter-id="' + id + '"]')).hasClass('info__code-block-cell_error')
      && $(this).hasClass('info__cell-wrap')) {
        e.stopPropagation();
        $('.info__code-popup').attr('data-code', $('.radio__real-input[name="detail-' + id + '"]').attr('value')); //@TODO убрать при автоматическом проставлении при аяксе
        $('.info__code-popup').attr('data-id', id);
        $('.info__cell-wrap').removeClass('info__cell-wrap_tooltip');
        $(this).addClass('info__cell-wrap_tooltip');
        $('.info__code-popup').removeClass('info__code-popup_hidden');
        
        $('.info__configlist').addClass('info__configlist_hidden');
        $('.info__details').addClass('info__details_active');
        detailsSlider.init();
        detailsSlider.slideTo(id - 1, 0);

        $('.info__code-popup-btn_ok').one('click', () => {
            const number = $('.info__code-popup').attr('data-id');
            const val = $('.info__code-popup').attr('data-code');
            const params = [{id: number, value: val}];

            $('.info__cell-wrap').removeClass('info__cell-wrap_tooltip');
            fillInfo(params, true);
            $('.info__code-popup').addClass('info__code-popup_hidden');
        });

        $('.info__code-popup-btn_cancel').one('click', () => {
            const number = $('.info__code-popup').attr('data-id');
            $('.info__cell-wrap').removeClass('info__cell-wrap_tooltip');
            $('.info__code-block-cell', $('[data-parameter-id="' + number + '"]'))
              .removeClass('info__code-block-cell_error')
              .text('');
            $('.info__code-popup').addClass('info__code-popup_hidden');
            $('.info__configlist-item[data-parameter-id="' + number + '"]')
              .find($('.info__configlist-shortname'))
              .text('?');
            $('.info__configlist-item[data-parameter-id="' + number + '"]')
              .find($('.info__configlist-value'))
              .addClass('info__configlist-value_empty')
              .text('Выберите необходимые вам опции');

            $('.swiper-slide[data-parameter-id="' + number + '"]')
              .find($('.info__details-shortname'))
              .text('');
            $('.swiper-slide[data-parameter-id="' + number + '"]')
              .find($('.info__details-value'))
              .text('');

            $(`[name="detail-${number}"]`).prop('checked', false);
            $(`[name="full-detail-${number}"]`).prop('checked', false);
        });

        $('.info__code-popup-link').one('click', function() {
            const number = $('.info__code-popup').attr('data-id');
            $('.info__cell-wrap').removeClass('info__cell-wrap_tooltip');
            $('.info__code-popup').addClass('info__code-popup_hidden');
            $('.info__configlist').addClass('info__configlist_hidden');
            $('.info__details').addClass('info__details_active');

            detailsSlider.init();
            detailsSlider.slideTo(number - 1, 0);
        });
    } else {
        // Делаем дела с ячейкой
        $('.info__code-block-cell').removeClass('info__code-block-cell_active');
        $('.info__code-block-cell', $('[data-parameter-id="' + id + '"]')).addClass('info__code-block-cell_active');

        // Делаем дела для свёрнутого вида
        $('.info__configlist').addClass('info__configlist_hidden');
        $('.info__details').addClass('info__details_active');

        // Делем дела для раскрытого вида
        $('.info__full-spec-row').removeClass('info__full-spec-row_active');
        $('.info__full-spec-row[data-parameter-id="' + id + '"]').addClass('info__full-spec-row_active');
        $('.info__full-details-wrap').removeClass('info__full-details-wrap_active');
        $('.info__full-details-wrap[data-parameter-id="' + id + '"]').addClass('info__full-details-wrap_active');

        detailsSlider.init();
        detailsSlider.slideTo(id - 1, 0);
    }

});

body.on('click', '[data-js-action="back-to-parameters"]', function() {
    $('.info__configlist').removeClass('info__configlist_hidden');
    $('.info__details').removeClass('info__details_active');
});

body.on('click', '[data-js-action="change-config-size"]', function() {
    if(!$(detailsSlider.$el).hasClass('swiper-container-initialized')) {
        $('.info__configlist').addClass('info__configlist_hidden');
        $('.info__details').addClass('info__details_active');
        detailsSlider.init();
        detailsSlider.slideTo(0);
    }

    $('.info__container').toggleClass('info__container_hidden');
    $('.info__full').toggleClass('info__full_active');
});

body.on('click', '[data-js-action="select-value"]', function(e) {
    e.stopPropagation();
    e.preventDefault();

    $('.info__cell-wrap').removeClass('info__cell-wrap_tooltip');
    $('.info__code-popup').addClass('info__code-popup_hidden');

    let radio = $(this), slide, id, cell, abbr, text,
      value = $('.radio__real-input', radio).val(), elId;

    if(radio.hasClass('info__details-radio-btn')) {
        slide = radio.parents('.swiper-slide');
        abbr = $('.info__details-text', radio).text();
        text = $('.info__details-row-value', radio).text();
    }
    if(radio.hasClass('info__full-details-radio-btn')) {
        slide = radio.parents('.info__full-details-wrap');
        abbr = $('.info__full-details-text', radio).text();
        text = $('.info__full-details-value', radio).text();
    }

    id = slide.data('parameter-id');
    cell = $('.info__cell-wrap[data-parameter-id="' + id + '"]');

    elId = $('[data-parameter-id="' + id + '"]');
    if($('.radio__real-input[value="' + value + '"]', elId).prop('type') === 'radio') {
        $('.radio__real-input[value="' + value + '"]', elId).prop('checked', true);
    } else {
        $('.radio__real-input[value="' + value + '"]', elId).each((index, el) => {
            if($(el).prop('checked') === true) {
                $(el).prop('checked', false);
            } else {
                $(el).prop('checked', true);
            }
        });
    }

    // Оформляем шапку слайда, в котором был выбор
    $('.info__details-marker', elId).removeClass('info__details-marker_invalid').addClass('info__details-marker_valid');
    $('.info__details-shortname, .info__configlist-shortname', elId).text(abbr);
    $('.info__details-value, .info__full-spec-note, .info__configlist-value, .info__cell-tooltip', elId).text(text);

    // Добавляем текст под значение в открытом списке
    $('.info__full-spec-marker', elId).removeClass('info__full-spec-marker_invalid').addClass('info__full-spec-marker_valid');

    // Меняем данные в коротком списке
    $('.info__configlist-marker', elId).removeClass('info__configlist-marker_invalid').addClass('info__configlist-marker_valid');
    $('.info__configlist-value', elId).removeClass('info__configlist-value_empty');

    // Помещаем данные в ячейку
    $('.info__code-block-cell', cell)
      .removeClass('info__code-block-cell_invalid')
      .removeClass('info__code-block-cell_error')
      .removeClass('info__code-block-cell_system-select')
      .addClass('info__code-block-cell_valid')
      .addClass('info__code-block-cell_user-select');
    if($('.radio__real-input[value="' + value + '"]', elId).prop('type') === 'radio') {
        $('.info__code-block-cell', cell).text(abbr);
    } else {
        let txt = '';
        $('.radio__real-input[name="detail-' + id + '"]').each(function(index, el) {
            if($(el).prop('checked') === true) {
                const parent = $(el).parent();
                txt = txt + $(parent).find($('.radio__text')).text() + '-';
            }
        });
        txt = txt.slice(0, -1);
        $('.info__code-block-cell', cell).text(txt);
    }

    detailsSlider.updateAutoHeight(50);
    $('.radio__real-input[value="' + value + '"]', elId).prop('type') === 'radio' && setTimeout(function() {
        if(!afterError) {
            detailsSlider.slideTo(id);
        }
        afterError = false;
    }, 400);
});

body.on('click', '[data-js-action="next"]', function(e) {
    e.preventDefault();
    e.stopPropagation();
    let radio = $(this), slide, id,
    value = $('.radio__real-input', radio).val(), elId;

    if(radio.hasClass('info__details-radio-btn')) {
        slide = radio.parents('.swiper-slide');
    }
    if(radio.hasClass('info__full-details-radio-btn')) {
        slide = radio.parents('.info__full-details-wrap');
    }
    id = slide.data('parameter-id');

    elId = $('[data-parameter-id="' + id + '"]');

    if($('.radio__real-input[name="detail-' + id + '"][value="next"]').prop('type') === 'radio') {
        $('.radio__real-input[name="detail-' + id + '"][value="next"]').prop('checked', true);
    }
    if($('.radio__real-input[name="full-detail-' + id + '"][value="next"]').prop('type') === 'radio') {
        $('.radio__real-input[name="full-detail-' + id + '"][value="next"]').prop('checked', true);
    }
    $('.radio__real-input[value="' + value + '"]', elId).prop('type') === 'radio' && setTimeout(function() {
            detailsSlider.slideTo(id);
    }, 400);
});

body.on('keydown', '[data-js-store="config-search"]', function(e) {
    if(e.keyCode === 13) {
        addConfigTag($(this).val());
        $(this).val('');
    }
});

body.on('click', '[data-js-action="remove-tag"]', function() {
    let text = $(this).data('tag-text');
    $('[data-tag-text="' + text + '"]').remove();
    const num = $('.info__options-term').length / 2;
    const h = 558;
    $('.info__configlist').css('maxHeight', h - num * 38);
    if(num === 0) $('.info__configlist').css('maxHeight', '');
});

body.on('click', '[data-js-action="change-code-block"]', function() {
    $('.info__code-block').removeClass('info__code-block_visible');
    $(this).addClass('info__code-block_visible');
});

body.on('click', '[data-js-action="choose-doc-options"]', function() {
    let $this = $(this),
      thisPopup = $('.info__docs-popup', $this);
    thisPopup.toggleClass('info__docs-popup_active');
    $('.info__docs-popup').not(thisPopup).removeClass('info__docs-popup_active');
});

body.on('click', '[data-js-action="select-doc-option"]', function() {
    let $this = $(this),
      select = $this.parents('.info__docs-select'),
      store = $('[data-js-store]', select);

    $('.info__docs-popup-item').removeClass('info__docs-popup-item_active');
    $this.addClass('info__docs-popup-item_active');
    store.attr('data-selected-value', $this.text()).text($this.text());
});

function addConfigTag(tag) {
    let
      shortSearch = $('.info__options-search-labels'),
      fullSearch = $('.info__fulloptions-search-labels');

    $('<div class="info__options-term" data-tag-text="' + tag + '" data-js-action="remove-tag">' + tag + '</div>').prependTo(shortSearch);
    $('<div class="info__options-term" data-tag-text="' + tag + '" data-js-action="remove-tag">' + tag + '</div>').prependTo(fullSearch);

    const num = $('.info__options-term').length / 2;
    const h = 558;
    $('.info__configlist').css('maxHeight', h - num * 38);
}

// счетчики товаров
const priceCounters = [document.querySelector('.info__price-count'), ...document.querySelectorAll('.optional__price-count')];
const priceCounter = elem => {
    const prefix = elem.getAttribute('class').substring(0, elem.getAttribute('class').indexOf('__'));
    const input = elem.querySelector(`.${prefix}__price-count-number`),
      incBtn = elem.querySelector(`.${prefix}__price-btn-up`),
      descBtn = elem.querySelector(`.${prefix}__price-btn-down`);
    let currentMount = +input.textContent;

    incBtn.addEventListener('click', () => input.textContent = ++currentMount);
    descBtn.addEventListener('click', () => {
        currentMount > 1 && currentMount--;
        input.textContent = currentMount;
    });
}

if(priceCounters[0]) priceCounters.forEach(counter => priceCounter(counter));

//заполнение данными
const dataObj = [
    {
        id: 1,
        value: 'E'
    },
    {
        id: 4,
        value: '8'
    },
    {
        id: 9,
        value: 'D'
    }
];

function fillInfo(obj, error = false) {
    const systemClass = 'info__code-block-cell_system-select',
      userClass = 'info__code-block-cell_user-select';
    obj.forEach(el => {
        if(error) {
           afterError = true;
        }
        $(`[name="detail-${el.id}"][value=${el.value}]`)
          .prop('checked', true)
          .click();
        setTimeout(() => {
            $(`.info__cell-wrap[data-parameter-id=${el.id}]`)
              .find($('.info__code-block-cell'))
              .removeClass(userClass)
              .addClass(systemClass);
        }, 0);
    });
}

fillInfo(dataObj);

$('body').on('mousedown', function(e) {
    const classes = ['selection__tooltip', 'selection__tooltip-title', 'selection__tooltip-desc'];
    if(e.target && classes.indexOf(e.target.className) < 0) $('.selection__tooltip').remove();
});