/*global $: true*/
const buildFilter = () => {
    const selectionTab = () => {
        const tabs = document.querySelectorAll('.selection__control'),
          subtitle = document.querySelector('.selection__subtitle'),
          searchBar = document.querySelector('.selection__search'),
          btnGroup = document.querySelector('.selection__btn-group'),
          props = document.querySelector('.selection__props'),
          wrapper = document.querySelector('.selection__controls'),
          contentBlock = document.querySelector('.selection__content'),
          title = document.querySelector('.selection__title'),
          analitycs = document.querySelector('.selection__analytics'),
          closeBtn = document.querySelector('.selection__close-svg'),
          preview = document.querySelector('#preview'),
          elements = [subtitle, searchBar, btnGroup, props],
          className = 'selection__control_active';

        closeBtn.addEventListener('click', () => {
            title.classList.remove('hidden');
            wrapper.classList.remove('hidden');
            wrapper.parentElement.classList.remove('hidden');
            analitycs.classList.add('hidden');
            elements.forEach(item => item.classList.add('hidden'));
            contentBlock.classList.add('hidden');
        });

        tabs.forEach((item) => {
            item.addEventListener('click', () => {
                if(document.body.clientWidth > 575) {
                    const img = item.querySelector('img').getAttribute('src'),
                      text = item.querySelector('.selection__control-text').textContent;
                    if(!$(item).hasClass('selection__control_active')) {
                        $(tabs).css('display', '');
                        $(item).css('display', 'none');
                    }
                    preview.querySelector('img').setAttribute('src', img);
                    preview.querySelector('.selection__control-text').textContent = text;

                } else {
                    title.classList.add('hidden');
                    wrapper.classList.add('hidden');
                    wrapper.parentElement.classList.add('hidden');
                    elements.forEach(item => item.classList.remove('hidden'));
                    contentBlock.classList.remove('hidden');
                }
            });
        });

        let currentSize, prevSize;

        if(document.body.clientWidth > 575) {
            elements.forEach(item => item.classList.remove('hidden'));
            currentSize = 'desctop';
            prevSize = currentSize;
        } else {
            elements.forEach(item => item.classList.add('hidden'));
            preview.classList.add('hidden');
            contentBlock.classList.add('hidden');
            currentSize = 'mobile';
            prevSize = currentSize;
        }

        window.addEventListener('resize', () => {
            if(document.body.clientWidth > 575) {
                currentSize = 'desctop';
            } else {
                currentSize = 'mobile';
            }

            setTimeout(() => {
                if(currentSize === 'desctop' && currentSize !== prevSize) {
                    if(!subtitle.classList.contains('hidden')) {
                        title.classList.remove('hidden');
                        wrapper.classList.remove('hidden');
                        wrapper.parentElement.classList.remove('hidden');
                    }
                    elements.forEach(item => item.classList.remove('hidden'));
                    preview.classList.remove('hidden');
                    prevSize = currentSize;
                    contentBlock.classList.remove('hidden');
                }
                if(currentSize === 'mobile' && currentSize !== prevSize) {
                    const btnMore = document.querySelector('.selection__props-more-text');
                    if(btnMore.textContent === 'Скрыть дополнительные свойства') {
                        btnMore.click();
                    }
                    elements.forEach(item => item.classList.add('hidden'));
                    preview.classList.add('hidden');
                    contentBlock.classList.add('hidden');
                    prevSize = currentSize;
                }
            }, 10);
        });
    }

    selectionTab();


    //показать все свойства

    const toggleProps = (tab) => {
        const txtBtn = tab.querySelector('.selection__props-more-text'),
          btn = tab.querySelector('.selection__props-more-btn'),
          switcher = [txtBtn, btn],
          lowerPart = [
              tab.querySelector('.selection__radio-wrap'),
              // tab.querySelector('.selection__selected-wrap'),
              tab.querySelector('.selection__analytics')
          ],
          wrapper = document.querySelector('.selection__controls'),
          textShow = 'Скрыть дополнительные свойства',
          textHide = 'Показать дополнительные свойства';

        lowerPart.forEach(item => item.classList.add('hidden'));

        const hide8 = (num) => {
            const boxes = tab.querySelectorAll('.selection__props-wrap > .selection__property-wrap');
            boxes.forEach((item, i) => {
                if(i > num) {
                    item.classList.add('hidden');
                } else {
                    item.classList.remove('hidden');
                }
            });
        }

        //изначально формируем список элементов
        document.body.clientWidth > 991 && document.body.clientWidth < 1200 ? hide8(8) : hide8(7);


        //перестроить видимый список до 9 элементов

        const moveEl = () => {
            const list = tab.querySelectorAll('.selection__props-wrap > .selection__property-wrap'),
              more = tab.querySelector('.selection__props-more-wrap');

            if(document.body.clientWidth > 991 && document.body.clientWidth < 1200) {
                if(txtBtn.textContent === textHide) {
                    if(tab.querySelector('.selection__content-view').classList.contains('hidden')) {
                        tab.querySelector('.selection__props-wrap').insertBefore(list[8], more);
                        hide8(8);
                    } else {
                        hide8(7);
                        tab.querySelector('.selection__props-wrap').insertBefore(list[8], list[9]);
                    }
                } else {
                    if(tab.querySelector('.selection__content-view').classList.contains('hidden')) {
                        tab.querySelector('.selection__props-wrap').insertBefore(list[8], more);
                    } else {
                        tab.querySelector('.selection__props-wrap').insertBefore(list[8], list[9]);
                    }
                }
            } else {
                if(txtBtn.textContent === textHide) {
                    if(!tab.querySelector('.selection__content-view').classList.contains('hidden')) {
                        hide8(8);
                        tab.querySelector('.selection__props-wrap').insertBefore(list[8], more);
                    } else {
                        hide8(7);
                        tab.querySelector('.selection__props-wrap').insertBefore(list[8], list[9]);
                    }
                } else {
                    if(!tab.querySelector('.selection__content-view').classList.contains('hidden')) {
                        tab.querySelector('.selection__props-wrap').insertBefore(list[8], more);
                    } else {
                        tab.querySelector('.selection__props-wrap').insertBefore(list[8], list[9]);
                    }
                }
            }
        }

        window.addEventListener('resize', () => {
            moveEl();
        });

        moveEl();

        switcher.forEach((item) => {
            item.addEventListener('click', () => {
                const btnSvg = document.querySelector('.selection__props-more-svg');
                if(txtBtn.textContent === textHide) {
                    btnSvg.style.transform = 'rotateZ(180deg)';
                    txtBtn.textContent = textShow;
                    document.querySelector('.selection__mouse-wrap').classList.add('hidden');
                    tab.querySelectorAll('.selection__props-wrap > .selection__property-wrap').forEach(item => item.classList.remove('hidden'));
                    document.querySelector('.selection__controls').classList.remove('full-visual');
                    document.querySelector('.selection__controls').classList.remove('full-add');
                } else {
                    btnSvg.style.transform = 'rotateZ(0deg)';
                    txtBtn.textContent = textHide;
                    document.querySelector('.selection__mouse-wrap').classList.remove('hidden');
                    if(tab.querySelector('.selection__content-view').classList.contains('hidden')) {
                        document.body.clientWidth > 991 && document.body.clientWidth < 1200 ? hide8(8) : hide8(7);
                        document.querySelector('.selection__controls').classList.remove('full-add');
                    } else {
                        document.body.clientWidth > 991 && document.body.clientWidth < 1200 ? hide8(7) : hide8(8);
                        document.querySelector('.selection__controls').classList.add('full-visual');
                        document.querySelector('.selection__controls').classList.remove('full-add');
                    }
                }

                wrapper.classList.toggle('full');
                wrapper.parentElement.classList.toggle('full');
                lowerPart.forEach(item => item.classList.toggle('hidden'));
            });
        });
    }


    //показать все параметры (окно с иконками)

    const toggleParams = () => {
        const openBtn = document.querySelector('.selection__body-btn '),
          closeBtn = document.querySelector('.selection__params-btn '),
          params = document.querySelector('.selection__params');

        openBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            params.classList.remove('hidden');
        });
        closeBtn.addEventListener('click', () => params.classList.add('hidden'));
    }

    toggleParams();


    // визуализация фильтра

    const visual = (tab) => {
        const btn = document.querySelector('.selection__search-btn'),
          div = tab.querySelector('.selection__content-view'),
          img = tab.querySelector('.selection__content-img'),
          list = tab.querySelectorAll('.selection__props-wrap > .selection__property-wrap'),
          more = tab.querySelector('.selection__props-more-wrap');
        let onOff = false;

        btn.addEventListener('mousedown', () => {
            onOff = !onOff;
            if(document.body.clientWidth > 1199) {
                if(div.classList.contains('hidden')) {
                    tab.querySelector('.selection__props-wrap').insertBefore(list[8], more);
                    list[8].classList.remove('hidden');
                } else {
                    tab.querySelector('.selection__props-wrap').insertBefore(list[8], list[9]);
                    list[8].classList.add('hidden');
                }
            }
            if(document.body.clientWidth > 991 && document.body.clientWidth < 1200) {
                if(div.classList.contains('hidden')) {
                    tab.querySelector('.selection__props-wrap').insertBefore(list[8], list[9]);
                    list[8].classList.add('hidden');
                } else {
                    tab.querySelector('.selection__props-wrap').insertBefore(list[8], more);
                    list[8].classList.remove('hidden');
                }
            }
            div.classList.toggle('hidden');
            if(onOff && document.querySelector('.selection__props-more-text').textContent === 'Показать дополнительные свойства') {
                document.querySelector('.selection__controls').classList.add('full-visual');
            } else if(!onOff && document.querySelector('.selection__props-more-text').textContent === 'Показать дополнительные свойства') {
                document.querySelector('.selection__controls').classList.remove('full-visual');
            } else if(!onOff && document.querySelector('.selection__props-more-text').textContent !== 'Показать дополнительные свойства') {
                document.querySelector('.selection__controls').classList.add('full-add');
                document.querySelector('.selection__controls').classList.remove('full-visual');
            }
            setTimeout(() => img.classList.toggle('transparent'), 10);

        });
    }

    const allTabs = document.querySelectorAll('.selection__content');


    //слайдер и выпадающий поиск в верхней части фильтра

    const onSearch = () => {
        const searchSlider = new Swiper(document.querySelector('.swiper-container[data-slider="search-slider"]'), {
            init: false,
            slidesPerView: 4,
            spaceBetween: 5,
            roundLengths: true,
            navigation: {
                nextEl: '.selection__nav-btn_next',
                prevEl: '.selection__nav-btn_prev',
            },
            breakpoints: {
                1199: {
                    slidesPerView: 3,
                    spaceBetween: 5
                },
                991: {
                    slidesPerView: 2,
                    spaceBetween: 5
                }
            }
        });

        const input = document.querySelector('.selection__search-input'),
          checkWrap = document.querySelectorAll('.selection__options-wrap'),
          nav = document.querySelector('.selection__nav'),
          slider = document.querySelector('.selection__search-select'),
          btn = document.querySelector('.selection__select-btn');
        let sliderOn = false;

        const deploy = () => {
            nav.classList.remove('hidden');
            slider.classList.remove('hidden');
            if(!sliderOn) {
                searchSlider.init();
                sliderOn = true;
            }
        }

        const rollUp = () => {
            nav.classList.add('hidden');
            slider.classList.add('hidden');
            sliderOn = false;
        }

        input.addEventListener('input', (event) => {
            if(document.body.clientWidth > 767) {
                event.target.value ? deploy() : rollUp();
            }
        });

        btn.addEventListener('click', () => {
            rollUp();
            input.value = '';
        });
    }

    onSearch();


    //модалки со свойствами

    const propsToggle = (tab) => {
        const boxes = tab.querySelectorAll('.selection__property'),
          btnTune = tab.querySelector('.selection__btn-tune'),
          btnClear = tab.querySelector('.selection__btn-clear'),
          btnTuneTxt = tab.querySelectorAll('.selection__btn-tune-text')[1],
          btnShowDev = tab.querySelector('.selection__btn-show'),
          tunes = tab.querySelector('.selection__tunes'),
          addonText = tab.querySelector('.selection__options-addtext'),
          btnTxtClose = 'закрыть настройки',
          btnTxtOpen = 'настроить фильтр';

        //нажатие на кнопку с настройками фильтра

        let sort = false;
        btnTune.addEventListener('mousedown', () => {
            sort = !sort;
            boxes.forEach(item => item.classList.toggle('selection__property_select'));
            btnShowDev.classList.toggle('hidden');
            btnClear.classList.toggle('hidden');
            tunes.classList.toggle('hidden');
            addonText.classList.toggle('hidden');
            btnTuneTxt.textContent === btnTxtOpen ? btnTuneTxt.textContent = btnTxtClose : btnTuneTxt.textContent = btnTxtOpen;
            if(sort) {
                (function() {
                    var droppableParent;
                    $('#sortable .selection__property').draggable({
                        disabled: false,
                        revert: 'invalid',
                        revertDuration: 200,
                        start: function() {
                            droppableParent = $(this).parent();

                            $(this).addClass('being-dragged');
                        },
                        stop: function() {
                            $(this).removeClass('being-dragged');
                        }
                    });

                    $('#sortable .selection__property-wrap').droppable({
                        hoverClass: 'drop-hover',
                        drop: function(event, ui) {
                            var draggable = $(ui.draggable[0]),
                              draggableOffset = draggable.offset(),
                              container = $(event.target),
                              containerOffset = container.offset();

                            $('.selection__property', event.target).appendTo(droppableParent).css({
                                opacity: 0
                            }).animate({
                                opacity: 1
                            }, 200);

                            draggable.appendTo(container).css({
                                left: draggableOffset.left - containerOffset.left,
                                top: draggableOffset.top - containerOffset.top
                            }).animate({
                                left: 0,
                                top: 0
                            }, 200);
                        }
                    });
                }());
            } else {
                $('#sortable .selection__property').draggable({
                    disabled: true
                });
            }
        });

        boxes.forEach((item, i) => {
            const popup = item.querySelector('.props');

            if(popup) {

                //синие подсказки

                const createTooltip = (num) => {
                    if(document.querySelector('.props__tooltip')) {
                        document.querySelector('.props__tooltip').remove();
                    }
                    const tooltip = document.createElement('div'),
                      content = document.createElement('div'),
                      title = document.createElement('div'),
                      text = document.createElement('div'),
                      btn = document.createElement('div');

                    tooltip.classList.add('props__tooltip');
                    content.classList.add('props__tooltip-content');
                    title.classList.add('props__tooltip-title');
                    text.classList.add('props__tooltip-text');
                    btn.classList.add('props__tooltip-btn');

                    content.appendChild(title);
                    content.appendChild(text);
                    tooltip.appendChild(content);
                    tooltip.appendChild(btn);

                    title.textContent = 'Найдено: ';
                    text.textContent = ` ${num} моделей`;
                    btn.textContent = 'показать';

                    return tooltip;
                }

                const addTooltip = () => {
                    const checkboxes = popup.querySelectorAll('.props__checkbox-real');

                    if(checkboxes.length > 0) {
                        checkboxes.forEach((item) => {
                            item.addEventListener('change', () => {
                                if(document.body.clientWidth > 575) {
                                    const tooltip = createTooltip(7);
                                    const y = item.parentElement.getBoundingClientRect().top - popup.parentElement.getBoundingClientRect().top - 17;
                                    tooltip.style.top = y + 'px';
                                    popup.appendChild(tooltip);
                                    setTimeout(() => {
                                        tooltip.remove();
                                    }, 1500);
                                }
                            });
                        });
                    }
                }

                addTooltip();

                //вывод кол-ва выбранных пунктов и смена стиля
                const changeStyle = (el) => {
                    const box = el.parentElement.parentElement,
                      num = box.querySelector('.selection__property-num'),
                      checks = el.querySelectorAll('.props__checkbox-real');
                    if(checks.length > 0) {
                        let count = 0;

                        for(let i = 0; i < checks.length; i++) {
                            if(checks[i].checked === true) {
                                count++;
                            }
                        }
                        if(count > 0) {
                            box.classList.add('selection__property_active');
                            num.textContent = ` (${count})`;
                            num.classList.remove('hidden');
                            selection();
                        } else {
                            box.classList.remove('selection__property_active');
                            num.classList.add('hidden');
                            selection();
                        }
                    }
                }

                // кнопка очистить фильтр

                const clearFilterBtn = tab.querySelector('.selection__btn-clear');

                clearFilterBtn.addEventListener('mousedown', () => {
                    tab.querySelectorAll('.selection__checkbox-real').forEach(item => item.checked = false);
                    tab.querySelectorAll('.props__checkbox-real').forEach(item => item.checked = false);
                    tab.querySelectorAll('.props').forEach(item => changeStyle(item));
                    selection();
                });

                //показать/скрыть всплывашку

                const chooseEdge = (item, i) => {
                    const totalWidth = document.querySelector('.selection__props-wrap').getClientRects()[0].width,
                      itemWidth = boxes[0].getClientRects()[0].width,
                      itemsInRow = totalWidth / itemWidth | 0;

                    //по какому краю выравнивать
                    if((i + 1) % itemsInRow === 0) {
                        item.querySelector('.props').parentElement.classList.add('props_right');
                        item.querySelector('.props').classList.add('props_right');
                    } else {
                        item.querySelector('.props').parentElement.classList.remove('props_right');
                        item.querySelector('.props').classList.remove('props_right');
                    }
                }


                const closeBtn = popup.querySelector('.props__close-svg');
                item.addEventListener('mousedown', (event) => {
                    console.log(item);
                    if(!popup.parentElement.parentElement.classList.contains('selection__property_select')) {
                        event.stopPropagation();
                    }
                    document.querySelectorAll('.props').forEach(item => item.classList.add('hidden-props'));
                    if(!popup.parentElement.parentElement.classList.contains('selection__property_select')) {
                        popup.classList.remove('hidden-props');
                        if(document.body.clientWidth < 576) {
                            item.scrollIntoView({
                                block: "start",
                                behavior: "smooth"
                            });
                        }
                    }
                    chooseEdge(item, i);
                });
                const prevBtn = popup.querySelector('.props__footer-btn_left'),
                  nextBtn = popup.querySelector('.props__footer-btn_right');
                // навигация по модалкам
                prevBtn.addEventListener('mousedown', (e) => {
                    const allPopups = document.querySelectorAll('.props');
                    e.stopPropagation();
                    const index = [...allPopups].findIndex((item) => item === popup);
                    allPopups.forEach(item => item.classList.add('hidden-props'));
                    setTimeout(() => {

                        if(index === 0) {
                            chooseEdge(allPopups[allPopups.length - 1].parentElement.parentElement, i - 1);
                            allPopups[allPopups.length - 1].classList.remove('hidden-props');
                        } else {
                            chooseEdge(allPopups[index - 1].parentElement.parentElement, i - 1);
                            allPopups[index - 1].classList.remove('hidden-props');
                        }
                    }, 10);
                });
                nextBtn.addEventListener('mousedown', (e) => {
                    const allPopups = document.querySelectorAll('.props');
                    e.stopPropagation();
                    const index = [...allPopups].findIndex((item) => item === popup);
                    allPopups.forEach(item => item.classList.add('hidden-props'));

                    setTimeout(() => {
                        if(index === allPopups.length - 1) {
                            chooseEdge(allPopups[0].parentElement.parentElement, i + 1);
                            allPopups[0].classList.remove('hidden-props');
                        } else {
                            chooseEdge(allPopups[index + 1].parentElement.parentElement, i + 1);
                            allPopups[index + 1].classList.remove('hidden-props');
                        }
                    }, 10);
                });
                closeBtn.addEventListener('click', (event) => {
                    event.stopPropagation();
                    popup.classList.add('hidden-props');
                });


                //выделить/очистить чекбоксы

                const checks = popup.querySelectorAll('.props__checkbox-real');

                if(checks.length) {
                    const selectBtn = popup.querySelector('.props__btn[data-role="select"]'),
                      clearBtn = popup.querySelector('.props__btn[data-role="clear"]'),
                      fakeCheck = popup.querySelectorAll('.props__list-item');
                    fakeCheck.forEach((item) => {
                        item.addEventListener('click', () => changeStyle(popup));
                    });

                    selectBtn.addEventListener('click', () => {
                        checks.forEach((item) => {
                            if(!item.disabled) {
                                item.checked = true;
                            }
                        });
                        changeStyle(popup);
                    });
                    clearBtn.addEventListener('click', () => {
                        checks.forEach(item => item.checked = false);
                        changeStyle(popup);
                    });


                    //список второго уровня с чекбоксами

                    const inspect = (el, array, sublist) => {
                        const isChecked = [...array].includes(sublist.querySelector('.props__checkbox-real:checked'));
                        isChecked ? el.classList.add('props__checkbox-fake_checked') : el.classList.remove('props__checkbox-fake_checked');
                    }

                    const rollupItem = popup.querySelectorAll('.props__list-item_sublist');

                    if(rollupItem.length > 0) {
                        rollupItem.forEach((item) => {
                            const list = item.querySelector('.props__list_sublist'),
                              arrowIcon = item.querySelector('.selection__property-svg'),
                              checkboxes = list.querySelectorAll('.props__checkbox-real'),
                              customBox = item.querySelector('.props__checkbox-fake');

                            customBox.addEventListener('click', (event) => {
                                event.stopPropagation();
                                if(customBox.classList.contains('props__checkbox-fake_checked')) {
                                    checkboxes.forEach((item) => {
                                        item.checked = false;
                                        changeStyle(popup);
                                        inspect(customBox, checkboxes, list);
                                    });
                                } else {
                                    checkboxes.forEach((item) => {
                                        item.checked = true;
                                        changeStyle(popup);
                                        inspect(customBox, checkboxes, list);
                                    });
                                }
                                if(list.classList.contains('hidden')) {
                                    list.classList.remove('hidden');
                                }

                            });
                            checkboxes.forEach((item) => {
                                item.addEventListener('click', () => {
                                    inspect(customBox, checkboxes, list);
                                });
                            });

                            selectBtn.addEventListener('click', () => inspect(customBox, checkboxes, list));
                            clearBtn.addEventListener('click', () => inspect(customBox, checkboxes, list));

                            item.addEventListener('click', () => {
                                list.classList.toggle('hidden');
                                if(list.classList.contains('hidden')) {
                                    arrowIcon.style.transform = 'rotateZ(0deg)';
                                } else {
                                    arrowIcon.style.transform = 'rotateZ(180deg)';
                                }
                            });
                        });
                    }
                }


                //скрыть недоступные

                const emptyList = popup.querySelector('.props__list_empty');
                if(emptyList) {
                    const btns = popup.querySelectorAll('.props__btn[data-role="rollup"]'),
                      textOn = 'скрыть недоступные',
                      textOff = 'показать недоступные';

                    btns.forEach((item) => {
                        item.addEventListener('click', () => {
                            item.parentElement.querySelector('.props__list_empty').classList.toggle('hidden');
                            item.textContent === textOn ? item.textContent = textOff : item.textContent = textOn;
                        });
                    });
                }

                //показать все чекбоксы
                const toggleLowPart = (className) => {
                    const lowerList = popup.querySelector(className);
                    if(lowerList) {
                        const btns = popup.querySelectorAll('.props__btn[data-role="show"]'),
                          textOn = 'скрыть',
                          textOff = 'Показать все';

                        btns.forEach((item) => {
                            item.addEventListener('click', () => {
                                item.parentElement.querySelector(className).classList.toggle('hidden');
                                item.textContent === textOn ? item.textContent = textOff : item.textContent = textOn;
                            });
                        });
                    }
                }
                toggleLowPart('.props__list_lower');
                toggleLowPart('.props__radio-btns_lower');
            }
        });
    }

    allTabs.forEach((item) => {
        toggleProps(item);
        visual(item);
        propsToggle(item);
    });


    // для попапа с кастомным инпутом типа рендж

    const rangeSlider = () => {
        const inputFrom = document.querySelector('#props-from'),
          inputTo = document.querySelector('#props-to'),
          modal = document.querySelector('.props_pressure').parentElement,
          box = modal.parentElement;
        let paramsFrom = false,
          paramsTo = false;

        if(inputFrom) {
            $(".js-range-slider").ionRangeSlider({
                skin: "nutrition-calc",
                type: "double",
                min: -13790,
                max: 250000,
                from: -13790,
                to: 250000,
                postfix: ' кПа',
                onChange: function() {
                    inputFrom.value = document.querySelector('.irs-from').textContent;
                    inputTo.value = document.querySelector('.irs-to').textContent;
                },
                onFinish: function() {
                    let max = document.querySelector('.irs-to').textContent,
                      min = document.querySelector('.irs-from').textContent;
                    const regExp = / /g;
                    max = max.replace(k, '');
                    max = +max.replace(regExp, '');
                    min = min.replace(k, '');
                    min = +min.replace(regExp, '');
                    if(this.max === max && this.min === min) {
                        box.classList.remove("selection__property_active");
                        paramsFrom = false;
                        paramsTo = false;
                        setTimeout(() => selection(), 10);
                    } else {
                        box.classList.add("selection__property_active");
                        setTimeout(() => selection(), 10);
                    }
                }
            });

            let sliderPressure = $(".js-range-slider").data('ionRangeSlider');

            let k = ' кПа';
            const pressureBtns = document.querySelectorAll('.props__radio-btn');
            pressureBtns.forEach((item) => {
                item.addEventListener('click', () => {
                    k = ' ' + item.querySelector('.radio__text').textContent;
                    inputFrom.value = '-13 790 ' + k;
                    inputTo.value = '250 000 ' + k;
                    sliderPressure.update({
                        from: -13790,
                        to: 250000,
                        postfix: k
                    });
                    paramsFrom = false;
                    paramsTo = false;
                    box.classList.remove("selection__property_active");
                    setTimeout(() => selection(), 10);
                });
            });

            const prepareData = (input) => {
                input.addEventListener('focus', (event) => {
                    const space = / /g;
                    event.target.value = event.target.value.replace(k, '');
                    event.target.value = event.target.value.replace(space, '');
                });
                input.addEventListener('input', (event) => {
                    event.target.value = event.target.value.replace(/[^-]\D/g, '');
                });
            }
            prepareData(inputFrom);
            prepareData(inputTo);

            inputFrom.addEventListener('blur', (event) => {
                let value = event.target.value;
                if(value < sliderPressure.options.min) {
                    value = sliderPressure.options.min;
                }
                if(value > sliderPressure.old_to) {
                    value = sliderPressure.old_to;
                }
                +value <= -13790 ? paramsFrom = false : paramsFrom = true;

                if(!paramsFrom && !paramsTo) {
                    box.classList.remove("selection__property_active");
                    setTimeout(() => selection(), 10);
                } else {
                    box.classList.add("selection__property_active");
                    setTimeout(() => selection(), 10);
                }
                event.target.value = value + ' ' + k;
                document.querySelector('.irs-from').textContent = value + ' ' + k;
                sliderPressure.update({
                    postfix: k,
                    from: value,
                });
            });
            inputTo.addEventListener('blur', (event) => {
                let value = event.target.value;
                if(value > sliderPressure.options.max) {
                    value = sliderPressure.options.max;
                }
                if(value < sliderPressure.old_from) {
                    value = sliderPressure.old_from;
                }
                +value >= 250000 ? paramsTo = false : paramsTo = true;

                if(!paramsFrom && !paramsTo) {
                    box.classList.remove("selection__property_active");
                    setTimeout(() => selection(), 10);
                } else {
                    box.classList.add("selection__property_active");
                    setTimeout(() => selection(), 10);
                }
                event.target.value = value + ' ' + k;
                document.querySelector('.irs-to').textContent = value + ' ' + k;
                sliderPressure.update({
                    postfix: k,
                    to: value,
                });
            });
            document.querySelector('.selection__btn-clear').addEventListener('click', () => {
                box.classList.remove('selection__property_active');
                pressureBtns[0].click();
                setTimeout(() => selection(), 10);
            });
        }
    }


    //подсказки (из знаков вопросов)

    // const tooltips = () => {
    //     const quests = document.querySelectorAll('.selection__question-wrap');
    //     quests.forEach((item) => {
    //         item.addEventListener('mousedown', (event) => {
    //             event.stopPropagation();
    //             if (!item.querySelector('.selection__tooltip')) {
    //                 document.querySelectorAll('.selection__tooltip').forEach(item => item.remove());
    //                 const tooltip = document.createElement('div'),
    //                     title = document.createElement('div'),
    //                     desc = document.createElement('div'),
    //                     close = document.createElement('div'),
    //                     loading = document.createElement('div'),
    //                     pos = item.getAttribute('data-pos');
    //                 tooltip.classList.add('selection__tooltip');
    //                 title.classList.add('selection__tooltip-title');
    //                 desc.classList.add('selection__tooltip-desc');
    //                 close.classList.add('selection__tooltip-close');
    //                 loading.classList.add('selection__tooltip-loading');

    //                 if (pos === 'left') {
    //                     tooltip.classList.add('selection__tooltip_left');
    //                 }
    //                 tooltip.appendChild(title);
    //                 tooltip.appendChild(desc);
    //                 tooltip.appendChild(close);
    //                 tooltip.appendChild(loading);
    //                 item.appendChild(tooltip);
    //                 close.addEventListener('click', (event) => {
    //                     event.stopPropagation();
    //                     tooltip.remove();
    //                 });

    //                 const type = item.getAttribute('data-type');

    //                 const addContent = (type, data, divTitle, divText, spinner) => {
    //                     const index = data.findIndex(item => item.type === type);
    //                     if (index > -1) {
    //                         spinner.remove();
    //                         const {
    //                             title,
    //                             text
    //                         } = data[index];
    //                         divTitle.textContent = title;
    //                         divText.textContent = text;
    //                     } else {
    //                         throw new Error('Unknown type of tooltip');
    //                     }
    //                 };

    //                 fetch('./data.json')
    //                     .then((res) => {
    //                         if (!res.ok) {
    //                             return (res);
    //                         }
    //                         res.json()
    //                             .then((res) => {
    //                                 addContent(type, res.tooltips, title, desc, loading);
    //                             });
    //                     })
    //                     .catch((res) => {
    //                         console.error(res.message);
    //                         document.querySelectorAll('.selection__tooltip').forEach(item => item.remove());
    //                     });
    //             }
    //         });
    //     });
    // };

    document.body.addEventListener('mousedown', (event) => {
        if(!document.querySelector('.selection__params').contains(event.target)) {
            document.querySelector('.selection__params').classList.add('hidden');
        }
        if(event.target === document.querySelector('.props') ||
          event.target === document.querySelector('.selection__property') ||
          event.target === document.querySelector('.selection__tooltip')) {
            return;
        }
        document.querySelectorAll('.props').forEach(item => item.classList.add('hidden-props'));
        if(document.querySelector('.selection__tooltip')) {
            document.querySelector('.selection__tooltip').remove();
        }
    });

    const mouseAction = () => {
        const mouse = document.querySelector('.selection__mouse-wrap'),
          controls = document.querySelector('.selection__controls'),
          mouseArrows = document.querySelector('.selection__mouse-arrows');

        const showIcon = (element) => {
            element.addEventListener('mouseenter', () => mouse.classList.add('hidden'));
            element.addEventListener('mouseleave', () => {
                if(document.querySelector('.selection__controls').classList.contains('full')) {
                    mouse.classList.remove('hidden');
                }
            });
        }
        showIcon(controls);
        showIcon(mouse);

        $(controls).scrollbar({
            "onScroll": function(y, x) {
                if(y.scroll == 0) {
                    mouse.style.top = 'initial';
                    mouse.style.bottom = '30px';
                    mouseArrows.style.transform = 'rotateZ(0deg)';
                }
                if(y.scroll == y.maxScroll) {
                    mouse.style.top = '90px';
                    mouse.style.bottom = 'initial';
                    mouseArrows.style.transform = 'rotateZ(180deg)';
                }
            }
        });
    }

    mouseAction();
    // tooltips();
    rangeSlider();


    const selection = () => {
        const dataText = {
              active: 'Показать выбранные',
              nonactive: 'Показать пропущенные параметры',
              all: 'Показать все свойства'
          },
          props = $('.selection__content').find('.selection__property'),
          choise = $('.selection__selected-btn-txt').text();

        switch(choise) {
            case dataText.active:
                $(props).each(function() {
                    if(!$(this).hasClass('selection__property_active')) {
                        $(this).addClass('selection__property_unselected');
                    } else {
                        $(this).removeClass('selection__property_unselected');
                    }
                })
                break;

            case dataText.nonactive:
                $(props).each(function() {
                    if($(this).hasClass('selection__property_active')) {
                        $(this).addClass('selection__property_unselected');
                    } else {
                        $(this).removeClass('selection__property_unselected');
                    }
                })
                break;

            case dataText.all:
                $(props).each(function() {
                    $(this).removeClass('selection__property_unselected');
                })
                break;
        }
    }

    const select = $('.selection__selected-btn');

    if(select.length) {
        const options = $('.selection__selected-dropdown-item');

        $(options).on('mousedown', function(e) {
            e.stopPropagation();
            $('.selection_open').find('.select__input').val($(this).attr('data-value'));
            $('.selection_open').find('.selection__selected-btn-txt').text($(this).text());
            $(options).removeClass('selection__selected-dropdown-item_active');
            $(this).addClass('selection__selected-dropdown-item_active');
            select.removeClass('selection_open');

            selection();
        });

        $(select).on('mousedown', function(e) {
            e.stopPropagation();
            select.removeClass('selection_open');
            $(this).toggleClass('selection_open');
        });

        $(document).on('mousedown', function(e) {
            if($('.selection_open').length) {
                if(!$('.selection_open').is(e.target) && $('.selection_open').has(e.target).length === 0) {
                    select.removeClass('selection_open');
                }
            }
        });
    }
}

$.ajax({
    url: './ajax/filter-conten.html',
    success: function(data) {
        $(data).prependTo('.selection__content');
        document.querySelector('.selection') && buildFilter();
    }
});

// document.querySelector('.selection') && buildFilter();