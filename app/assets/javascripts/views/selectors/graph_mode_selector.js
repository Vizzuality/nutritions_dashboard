(function(App) {

  'use strict';

  App.View = App.View || {};

  App.View.GraphModeSelectorView = Backbone.View.extend({

    events: {
      'click .js--graph-switcher' : '_onclickChangeMode'
    },

    initialize: function() {
      this.status = new Backbone.Model({
        default: {
          graphMode: 'full'
        }
      });
      this._setListeners();
    },

    _setListeners: function() {
      this.status.on('change:graphMode', this._updateMode.bind(this));
    },

    _onclickChangeMode: function(e) {
      var mode = $(e.currentTarget).attr('mode');

      $('.js--graph-switcher').removeClass('-is-active');
      $(e.currentTarget).addClass('-is-active');

      $('.switch-text').html('(' + $(e.currentTarget).html() + ')');

      this._setStatus({graphMode: mode});
    },

    _setStatus: function(obj) {
      this.status.set(obj);
    },

    _updateMode: function() {
      App.Events.trigger('graphMode:selected', { graphMode: this.status.get('graphMode') });
    }
  });

})(this.App);
