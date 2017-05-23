(function(App) {

  'use strict';

  App.Controller = App.Controller || {};

  App.Model.CountriesModel = App.Model.CartoModel.extend({

    queries: {
      current_spending_donors: HandlebarsTemplates['queries/current_spending_donors'],
      current_spending_government: HandlebarsTemplates['queries/current_spending_government'],
      current_spending_government_download: HandlebarsTemplates['queries/current_spending_government_download'],
      current_spending_donors_download: HandlebarsTemplates['queries/current_spending_donors_download']
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
    },

    getCSV: function(params) {
      var links = {};
      params.graphs.map(function(graph) {
        links[graph.key] = {};
        var query = this.queries[graph.key]({
          iso: params.selectors.iso
        });
        var url = this._urlForQuery(query) + '&format=CSV&filename=' + graph.key + '_' + params.selectors.iso;
        links[graph.key]['link'] = url;
        links[graph.key]['name'] = graph.name;
      }.bind(this));
      return links;
    }

  });

})(this.App);
