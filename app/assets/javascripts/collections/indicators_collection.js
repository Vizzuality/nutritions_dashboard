(function(App) {

  'use strict';

  App.Controller = App.Controller || {};

  App.Collection.IndicatorsCollection = App.Collection.CartoCollection.extend({

    scenarioQueryTPL: HandlebarsTemplates['queries/scenario'],
    costPackagesQueryTPL: HandlebarsTemplates['queries/cost_packages'],
    table: 'nutritions',

    getDataForScenarios: function(mode, group) {

      var query = this.scenarioQueryTPL({
        'table': this.table,
        'mode': mode || 'region',
        'group': group || 'Sub-Saharan Africa'
      });

      var url = this._urlForQuery(query);

      return this.fetch({url: url});
    },

    getDataForCostPackages: function(mode, group) {

      var query = this.costPackagesQueryTPL({
        'table': this.table,
        'mode': mode || 'region',
        'group': group || 'Sub-Saharan Africa'
      });

      var url = this._urlForQuery(query);

      return this.fetch({url: url});
    }

  });

})(this.App);
