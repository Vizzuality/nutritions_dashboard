(function(App) {

  'use strict';

  App.Controller = App.Controller || {};

  App.Collection.CurrentStatusCollection = App.Collection.CartoCollection.extend({

    queries: {
      prevalence_by_country: HandlebarsTemplates['queries/prevalence_by_country']
    },
    
    getTotalByCountry: function(target) {
      var query = this.queries['prevalence_by_country']({target: target});
      var url = this._urlForQuery(query);

      return this.fetch({url: url});
    },

  });

})(this.App);
