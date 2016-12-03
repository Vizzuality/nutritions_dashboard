(function(App) {

  'use strict';

  App.Controller = App.Controller || {};

  App.Model.CountriesModel = App.Model.CartoModel.extend({

    queries: {
      current_spending_donors: HandlebarsTemplates['queries/current_spending_donors'],
      current_spending_government: HandlebarsTemplates['queries/current_spending_government']
    },

    getDataForCountryDonors: function(params) {
      var query = this.queries['current_spending_donors']({ iso: params.iso });
      var url = this._urlForQuery(query);

      return this.fetch({url: url});
    },

    getDataForCountryGovernment: function(params) {
      var query = this.queries['current_spending_government']({ iso: params.iso });
      var url = this._urlForQuery(query);

      return this.fetch({url: url});
    }
  });

})(this.App);
