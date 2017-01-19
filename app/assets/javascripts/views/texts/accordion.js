(function(App) {

  'use strict';

  App.View = App.View || {};

  App.View.AccordionView = Backbone.View.extend({

    events: {
      'click .-open' : '_onClickGrowHeight',
      'click .btn-close-detail' : '_onClickCloseHeight',
    },

    initialize: function(settings) {
      if (!this.el) {
        return;
      }

      this.settings = settings;
      this._cache();
      this._setHeightofDiv();
    },

    _cache: function() {
      this.content = this.$el.find('.accordion-content');
      this.open = this.$el.find('.-open');
    },

    _setHeightofDiv: function() {
      this.height = this.content.outerHeight();
      this.content.css('height', this.height);
      this.content.addClass('-no-height');
    },

    _onClickGrowHeight: function() {
      this.content.removeClass('-no-height');
    },

    _onClickCloseHeight: function() {
      this.content.addClass('-no-height');
      $('html,body').animate({
         scrollTop: this.$el.offset().top
      }, 300);
    },

  });

})(this.App);
