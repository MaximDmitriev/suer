/*global $: true*/
function changeComparsionStatus() {
    const $this = $('.comparison'),
      status = $this.attr('data-status');
    if(status === 'closed') {
        $this
          .attr('data-status', 'open')
          .addClass('comparison_active');
    } else {
        $this
          .attr('data-status', 'closed')
          .removeClass('comparison_active');
    }
}
$('[data-action="comparison"]').on('click', (e) => {
  e.stopPropagation();
  changeComparsionStatus();
});

$(document).on('click', function (e) {
  if ($('.comparison_active').length) {
      if (!$('.comparison_active').is(e.target) && $('.comparison_active').has(e.target).length === 0) {
        $('.comparison').removeClass('comparison_active');
        $('.comparison').attr('data-status', 'closed');
      }
  }
});