(function(App) {

  'use strict';

  App.Controller = App.Controller || {};

  App.Collection.IndicatorsCollection = App.Collection.CartoCollection.extend({

    queries: {
      cost_meeting_targets: HandlebarsTemplates['queries/cost_meeting_targets'],
      cost_packages: HandlebarsTemplates['queries/cost_packages'],
      scenario_comparison: HandlebarsTemplates['queries/scenario_comparison']
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
