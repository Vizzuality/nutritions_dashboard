(function(App) {

  'use strict';

  App.Controller = App.Controller || {};

  App.Collection.CountriesCollection = App.Collection.CartoCollection.extend({

    queries: HandlebarsTemplates['queries/countries'],

    getCountries: function() {
      var query = this.queries();
      var url = this._urlForQuery(query);

      return this.fetch({url: url});
    }
  });

})(this.App);
