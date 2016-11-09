(function(App) {

  'use strict';

  App.Controller = App.Controller || {};

  App.Collection.CartoCollection = Backbone.Collection.extend({

    cartoUser: 'nutritions',
    baseUrl: 'https://{0}.carto.com/api/v2/',

    url: function() {
      return this._urlForQuery(this._getQuery());
    },

    _urlForQuery: function(query) {
      return format(this.baseUrl, this.cartoUser) + "?q=" + query;
    },

    _getQuery: function() {
      var columns = "*";

      if (this.columns !== undefined && this.columns.length > 0) {
        columns = this.columns.join(", ");
      }

      return format("SELECT {0} FROM {1}", columns, this.table);
    },

    parse: function(data) {
      return data.rows;
    }

  });

})(this.App);
