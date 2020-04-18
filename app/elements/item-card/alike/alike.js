const alike = () => {
    const alikeScroll = new PerfectScrollbar('#alikeScroll', {
        maxScrollbarLength: 200,
        useBothWheelAxes: true,
        // wheelPropagation: false,
    });
    const btnText = {
        deploy: 'Смотреть все параметры',
        rollup: 'Свернуть'
    };
    const className = 'hidden',
      cardBtns = document.querySelectorAll;

    $('.alike__card-footer').on('click', function() {
        if($('[data-name="add"]').hasClass('hidden')) {
            $('.alike__card-footer-txt').text(btnText.rollup);
            $('.alike__arrow-svg').css('transform', 'rotateZ(180deg)');
            $('[data-name="add"]').removeClass('hidden');
        } else {
            $('.alike__card-footer-txt').text(btnText.deploy);
            $('.alike__arrow-svg').css('transform', '');
            $('[data-name="add"]').addClass('hidden');
        }
    });


    const cards = document.querySelectorAll('.alike__card'),
      scrollPart = document.querySelector('.alike__container'),
      fixedPart = document.querySelector('.alike__container-pinned'),
      switcher = document.querySelector('.alike__switch-btn'),
      switcherTxt = document.querySelector('.alike__switch-btn-text'),
      activeClass = 'alike__card-icon_active',
      hiddenClass = 'alike__card_hidden';
    const text = {
        show: 'Список исключенных',
        hide: 'Список неисключенных'
    };
    let cardsCounter = 0;

    switcher.addEventListener('click', () => {
        cards.forEach(card => card.classList.toggle(hiddenClass));
        if(switcher.getAttribute('data-show') === 'true') {
            switcherTxt.textContent = text.hide;
            switcher.setAttribute('data-show', 'false');
            $('.alike__switch-btn-count').text($('[data-alike-card-status="show"]').length);
        } else {
            switcherTxt.textContent = text.show;
            switcher.setAttribute('data-show', 'true');
            $('.alike__switch-btn-count').text($('[data-alike-card-status="hide"]').length);
        }
    });

    cards.forEach(card => {
        const btns = card.querySelectorAll('.alike__card-icon');

        btns.forEach(btn => btn.addEventListener('click', () => {
            btn.classList.toggle(activeClass);
            if(btn.getAttribute('data-state') && btn.getAttribute('data-state') === 'unpinned' && cardsCounter < 3 && switcher.getAttribute('data-show') === 'true') {
                fixedPart.append(card);
                btn.setAttribute('data-state', 'pinned');
                cardsCounter++;

            } else if(btn.getAttribute('data-state') && btn.getAttribute('data-state') === 'pinned') {
                scrollPart.prepend(card);
                btn.setAttribute('data-state', 'unpinned');
                cardsCounter--;

            } else if(btn.getAttribute('data-state') && btn.getAttribute('data-state') === 'unpinned' && (cardsCounter >= 3 || switcher.getAttribute('data-show') === 'false')) {
                btn.classList.remove(activeClass);

            } else if(btn.getAttribute('data-state') && btn.getAttribute('data-state') === 'show') {
                card.classList.toggle(hiddenClass);
                if($(card).attr('data-alike-card-status') === 'show') {
                    $(card).attr('data-alike-card-status', 'hide');
                } else {
                    $(card).attr('data-alike-card-status', 'show');
                }
                if($('.alike__card[data-alike-card-status="hide"]').length > 0 && $('.alike__card[data-alike-card-status="show"]').length !== 0) {
                    switcher.classList.remove('alike__switch-btn_hidden');
                } else if($('.alike__card[data-alike-card-status="hide"]').length === 0 && switcher.getAttribute('data-show') === 'false') {
                    switcher.click();
                    switcher.classList.add('alike__switch-btn_hidden');
                } else if($('.alike__card[data-alike-card-status="show"]').length === 0 && switcher.getAttribute('data-show') === 'true') {
                    switcher.click();
                    switcher.classList.add('alike__switch-btn_hidden');
                }
                const pinBtn = [...btns].find(btn => btn.getAttribute('data-state') === 'pinned');
                if(pinBtn) {
                    scrollPart.prepend(card);
                    pinBtn.setAttribute('data-state', 'unpinned');
                    pinBtn.classList.remove(activeClass);
                    cardsCounter--;
                }
            }
            if($('[data-alike-card-status="hide"]').length) {
                $('.alike__switch-btn').fadeIn(0);
            } else {
                $('.alike__switch-btn').fadeOut(0);
            }
            if(switcher.getAttribute('data-show') === 'true') {
                $('.alike__switch-btn-count').text($('[data-alike-card-status="hide"]').length);
            } else {
                $('.alike__switch-btn-count').text($('[data-alike-card-status="show"]').length);
            }
        }));
    });
};

document.querySelector('.alike') && alike();