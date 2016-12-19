(function(App) {

  'use strict';

  App.Controller = App.Controller || {};

  App.Collection.CurrentStatusCollection = App.Collection.CartoCollection.extend({

    queries: {
      // total_spent: HandlebarsTemplates['queries/total_spent'],
      total_by_country: HandlebarsTemplates['queries/total_by_country']
    },

    // getTotalSpent: function() {
    //   var query = this.queries['total_spent'];
    //   var url = this._urlForQuery(query);
    //
    //   return this.fetch({url: url});
    // },

    getTotalByCountry: function(target) {
      var query = this.queries['total_by_country']({target: target});
      var url = this._urlForQuery(query);
      return this.fetch({url: url});
    },

  });

})(this.App);
