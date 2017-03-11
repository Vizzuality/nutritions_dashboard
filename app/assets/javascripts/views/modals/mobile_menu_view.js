(function(App) {

  'use strict';

  App.View = App.View || {};

  App.View.MobileMenu = Backbone.View.extend({

    el: '.l-header',

    events: {
      'click .js-btn-mobile-menu' : 'onClickChangeStatus',
      'click .js-btn-close' : 'onClickChangeStatus',
    },

    initialize: function() {
      this.status =  new (Backbone.Model.extend({
        defaults: {
          hidden: true
        }
      }));
      this._listeners();
    },

    _listeners: function() {
      this.status.on('change:hidden', this.toggleMenuPanel, this);
    },

    onClickChangeStatus: function() {
      var hidden = this.status.get('hidden');
      this.status.set('hidden', !hidden);
    },

    toggleMenuPanel: function() {
      var hidden = !!this.status.get('hidden');
      this.$('.c-mobile-menu').toggleClass('-is-open', !hidden);
      this.$('.mobile').toggleClass('-is-open', !hidden);
      $('.l-header').toggleClass('-is-open', !hidden);
    }
  });

})(this.App);
