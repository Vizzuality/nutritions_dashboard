(function(App) {

  'use strict';

  App.Helper = App.Helper || {};

  App.Helper.ActionClick = Backbone.View.extend({

    el: 'body',

    events: {
      'click .js-btn-action' : 'onClickAction'
    },

    /*
    * UI EVENTS
    */
    onClickAction: function(e) {
      e && e.preventDefault();
      var action = $(e.currentTarget).data('action');
      App.Events.trigger(action);
    }

  });

})(this.App);
