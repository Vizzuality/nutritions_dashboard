(function(App) {

  'use strict';

  App.View = App.View || {};

  App.View.DownloadData = Backbone.View.extend({

    el: '.c-share-menu',

    events: {
      'click .js-btn-download-data' : '_onClickRequestData',
    },

    initialize: function() {
      this.status =  new (Backbone.Model.extend({
        defaults: {
          hidden: true
        }
      }));
      this.collection = new App.Collection.CountriesCollection();

      this._listeners();
    },

    _listeners: function() {

    },

    _onClickRequestData: function() {
      console.log('hello');
    },

    _fetchData: function() {
      this.collection.getCountries().done(function(){
      }.bind(this));
    },

  });

})(this.App);
