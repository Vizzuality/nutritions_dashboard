(function(App) {

  'use strict';

  App.Helper = App.Helper || {};

  App.Helper.SmoothScrollView = Backbone.View.extend({

    el: '.smooth-scroll',

    events: {
      'click .js-btn-smooth-scroll' : '_smoothScroll',
    },

    _smoothScroll: function(e) {
      var event = e.currentTarget;
      if (location.pathname.replace(/^\//,'') == event.pathname.replace(/^\//,'') && location.hostname == event.hostname) {
        var target = $(event.hash);
        target = target.length ? target : $('[name=' + event.hash.slice(1) +']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 500);
          return false;
        }
      }
    }
  });

})(this.App);
