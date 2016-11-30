(function(App) {

  'use strict';

  App.Controller = App.Controller || {};

  App.Model.CountriesModel = App.Model.CartoModel.extend({

    queries: {
      current_spending_donors: {
        global: HandlebarsTemplates['queries/current_spending_donors'],
        region: HandlebarsTemplates['queries/cost_meeting_targets'],
        income_group: HandlebarsTemplates['queries/cost_meeting_targets']
      },
      cost_packages: {
        global: HandlebarsTemplates['queries/cost_packages_global'],
        region: HandlebarsTemplates['queries/cost_packages'],
        income_group: HandlebarsTemplates['queries/cost_packages']
      },
      current_burden: {
        global: HandlebarsTemplates['queries/current_burden_global'],
        region: HandlebarsTemplates['queries/current_burden'],
        income_group: HandlebarsTemplates['queries/current_burden']
      },
      scenario_comparison: {
        global: HandlebarsTemplates['queries/scenario_comparison_global'],
        region: HandlebarsTemplates['queries/scenario_comparison'],
        income_group: HandlebarsTemplates['queries/scenario_comparison']
      }
    },

    getDataForCountryDonors: function() {
      var query = this.queries['current_spending_donors']['global']({});
      var url = this._urlForQuery(query);

      return this.fetch({url: url});
    }

  });

})(this.App);
