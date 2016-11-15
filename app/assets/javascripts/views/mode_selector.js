(function(App) {

  'use strict';

  App.View = App.View || {};

  App.View.ModeSelectorView = Backbone.View.extend({

    events: {
      'change .js--mode-selector' : '_onclickChangeMode'
    },

    initialize: function() {
      this.status = new Backbone.Model();
      this._setListeners();
    },

    setParams: function(obj) {
      this.$el.find('#'+ obj.mode)
        .attr('checked', true)
        .trigger('change');
    },

    _setListeners: function() {
      this.status.on('change:mode', this._updateMode.bind(this));
    },

    _onclickChangeMode: function(e) {
      var mode = $(e.currentTarget).val();
      this._setStatus({mode: mode});
    },

    _setStatus: function(obj) {
      this.status.set(obj);
    },

    _updateMode: function() {
      App.Events.trigger('mode:selected', { mode: this.status.get('mode') });
    }
  });

})(this.App);
