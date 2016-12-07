(function(App) {

  'use strict';

  App.View = App.View || {};

  App.View.TitleView = Backbone.View.extend({

    initialize: function(settings) {
      if (!this.el) {
        return;
      }

      var opts = settings && settings.options ? settings.options : {};

      this.status = new Backbone.Model();
      this.collection = new App.Collection.GroupsCollection();

      this._addListeners();
    },

    _addListeners: function() {
      //Internal
      this.status.on('change', this._fetchData.bind(this));

      //External
      App.Events.on('group:selected', this._setStatus.bind(this));
    },

    _fetchData: function() {
      this.collection.getGroupInfo(this.status.get('mode'), this.status.get('group')).done(function() {
        this.render();
      }.bind(this));
    },

    _setStatus: function(params) {
      this.status.set(params);
    }

  });

})(this.App);
