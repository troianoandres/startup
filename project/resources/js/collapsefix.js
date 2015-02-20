$(document).on('click', '[data-toggle]', function(event) {
  event.stopPropagation();
  var $this = $(this);

  var parent = $this.data('parent');
  var actives = parent && $(parent).find('.collapse.in');

  // From bootstrap itself
  if (actives && actives.length) {
    hasData = actives.data('collapse');
    //if (hasData && hasData.transitioning) return;
    actives.collapse('hide');
  }

  var target = $this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, ''); //strip for ie7

  $(target).collapse('toggle');
})