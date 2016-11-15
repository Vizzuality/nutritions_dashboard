(function(App) {

  'use strict';

  App.View = App.View || {};

  App.View.ModeSelectorView = Backbone.View.extend({

    events: {
      'change .js--mode-selector' : '_onclickSetStatus'
    },

    initialize: function() {
      this.status = new Backbone.Model();
      this._setListeners();
    },

    _setListeners: function() {
      this.status.on('change:mode', this._updateMode.bind(this));
    },

    _onclickSetStatus: function(e) {
      var mode = $(e.currentTarget).val();
      this.status.set({ 'mode': mode });
    },

    _updateMode: function() {
      App.Events.trigger('mode:selected', { mode: this.status.get('mode') });
    }
  });

})(this.App);
