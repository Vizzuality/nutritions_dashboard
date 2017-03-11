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

    ajaxStart: function(view){
        $(view).addClass('-loading');
    },

    ajaxComplete: function(view){
        $(view).removeClass('-loading');
    },

    _fetchData: function() {
      this.ajaxStart('.title-section');
      this.collection.getGroupInfo(this.status.get('mode'), this.status.get('group')).done(function() {
        this.render();
        this.ajaxComplete('.title-section');
      }.bind(this));
    },

    _setStatus: function(params) {
      this.status.set(params);
    }

  });

})(this.App);
