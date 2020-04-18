let tooltipScrollbar;

if($('.tooltip-modal__text').length) {
    tooltipScrollbar = new PerfectScrollbar('.tooltip-modal__text', {
    });
}

let tooltipModal = new Kmodal('#tooltip', {
    on: {
        open: function() {
            $('.tooltip').remove();

            setTimeout(function() {
                tooltipScrollbar.update();

            }, 100);
        }
    }
});