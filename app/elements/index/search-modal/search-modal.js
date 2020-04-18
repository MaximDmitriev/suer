/*global $: true*/
const searchModal = new Kmodal('#search', {
    overlayClose: false,
    on: {
        open: function() {
            $('.header').css('padding-right', searchModal.scrollBarWidth());
        },
        close: function() {
            $('.header').css('padding-right', '');
        }
    }
});

$('#search .modal__dialog').on('click touch', function(e) {
    const windowWidth = $(window).outerWidth();
    if(windowWidth < 768 && $(e.target).hasClass('modal__dialog')) {
        searchModal.close();
    }
    if (!$(e.target).hasClass('search-modal__input')) {
        searchModal.close();
    }
});