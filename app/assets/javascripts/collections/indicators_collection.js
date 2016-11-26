(function(App) {

  'use strict';

  App.Controller = App.Controller || {};

  App.Collection.IndicatorsCollection = App.Collection.CartoCollection.extend({

    queries: {
      cost_meeting_targets: HandlebarsTemplates['queries/cost_meeting_targets'],
      cost_packages: HandlebarsTemplates['queries/cost_packages'],
      current_burden: HandlebarsTemplates['queries/current_burden'],
      scenario_comparison: HandlebarsTemplates['queries/scenario_comparison']
    },

    getDataForCurrentBurden: function(params) {
      var query = this.queries['current_burden']({
        mode: params.mode,
        group: params.group
      });

      var url = this._urlForQuery(query);
      return this.fetch({url: url});
    },

    getDataForCostMeetingPackages: function(params) {
      var query = this.queries['cost_meeting_targets']({
        mode: params.mode,
        group: params.group
      });

      var url = this._urlForQuery(query);
      console.log('cost meeting targets', query)
      return this.fetch({url: url});
    },

    getDataForCostPackages: function(params) {
      var query = this.queries['cost_packages']({
        mode: params.mode,
        group: params.group
      });

      var url = this._urlForQuery(query);
      console.log('cost packages', query)
      return this.fetch({url: url});
    },

    getDataForScenarios: function(params) {
      var query = this.queries['scenario_comparison']({
        mode: params.mode,
        group: params.group
      });

      var url = this._urlForQuery(query);
      console.log('scenario_comparison', query)
      return this.fetch({url: url});
    }

  });

})(this.App);
