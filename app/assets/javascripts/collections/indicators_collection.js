(function(App) {

  'use strict';

  App.Controller = App.Controller || {};

  App.Collection.IndicatorsCollection = App.Collection.CartoCollection.extend({

    queries: {
      cost_meeting_targets: {
        global: HandlebarsTemplates['queries/cost_meeting_targets_global'],
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

    getDataForCurrentBurden: function(params) {
      var query = this.queries['current_burden'][params.mode]({
        mode: params.mode,
        group: params.group
      });

      var url = this._urlForQuery(query);
      return this.fetch({url: url});
    },

    getDataForCostMeetingPackages: function(params) {
      var query = this.queries['cost_meeting_targets'][params.mode]({
        mode: params.mode,
        group: params.group
      });

      var url = this._urlForQuery(query);
      return this.fetch({url: url});
    },

    getDataForCostPackages: function(params) {
      var query = this.queries['cost_packages'][params.mode]({
        mode: params.mode,
        group: params.group
      });

      var url = this._urlForQuery(query);
      return this.fetch({url: url});
    },

    getDataForScenarios: function(params) {
      var query = this.queries['scenario_comparison'][params.mode]({
        mode: params.mode,
        group: params.group
      });

      var url = this._urlForQuery(query);
      return this.fetch({url: url});
    }

  });

})(this.App);
