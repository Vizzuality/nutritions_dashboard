(function(App) {

  'use strict';

  App.Controller = App.Controller || {};

  App.Controller.Welcome = App.Controller.Page.extend({

    index: function() {
      this.map = new App.View.MapHomeView({
        el: '#homeMapView'
      });

      $('.pannel').hide();
      $('.l-tabs > div:first-of-type').show();
      $('.c-tabs-links a').on('click', function(e){
        e.preventDefault();
        var $this = $(this),
            target = $this.attr('href'),
            $links = $('.c-tabs-links a');

        $('.pannel').removeClass('active');
        $links.removeClass('active');
        $this.addClass('active');
        $('.pannel').hide();
        $(target).show();
      })
    }
  });
})(this.App);
