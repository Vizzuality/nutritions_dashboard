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
      var opts = settings && settings.options ? settings.options : {};

      this._cache();
      this._setHeightofDiv();
    },

    _cache: function() {
      this.content = this.$el.find('.accordion-content');
      this.open = this.$el.find('.-open');
    },

    _setHeightofDiv: function() {
      this.height = this.content.outerHeight(true);
      this.content.css('height', 0);
    },

    _onClickGrowHeight: function() {
      this.content.animate({height:this.height},300);
    },

    _onClickCloseHeight: function() {
      this.content.animate({height:0},300);
      $('html,body').animate({
         scrollTop: this.$el.offset().top
      }, 500);
    },

  });

})(this.App);
