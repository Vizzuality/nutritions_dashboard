(function(App) {

  'use strict';

  App.Controller = App.Controller || {};

  App.Collection.IndicatorsCollection = App.Collection.CartoCollection.extend({

    queries: {
      cost_meeting_targets: {
        region: HandlebarsTemplates['queries/cost_meeting_targets_region'],
        income_group: HandlebarsTemplates['queries/cost_meeting_targets_income_group']
      },
      cost_packages: HandlebarsTemplates['queries/cost_packages']
      scenario_comparison: HandlebarsTemplates['queries/scenario_comparison']
    },

    getDataForCostMeetingPackages: function(params) {
      var query = this.queries['cost_meeting_targets'][params.mode]({
        'group': params.group
      });

      var url = this._urlForQuery(query);

      return this.fetch({url: url});
    },

    getDataForCostPackages: function(params) {
      var query = this.queries['cost_packages']({
        mode: params.mode,
        group: params.group
      });

      var url = this._urlForQuery(query);

      return this.fetch({url: url});
    },

    getDataForScenarios: function(params) {
      var query = this.queries['scenario_comparison']({
        mode: params.mode,
        group: params.group
      });

      var url = this._urlForQuery(query);

      return this.fetch({url: url});
    }

  });

})(this.App);
