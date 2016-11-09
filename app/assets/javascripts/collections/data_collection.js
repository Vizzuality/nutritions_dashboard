(function(App) {

  'use strict';

  App.Controller = App.Controller || {};

  App.Collection.DataCollection = Collection.CartoCollection.extend({

    scenarioQueryTPL: HandlebarsTemplates['queries/scenario'],


    getDataForScenarios: function(mode, group) {

      table: 'nutritions',

      var query = scenarioQueryTPL({
        'table': this.table,
        'mode': mode || 'region',
        'group': group || 'Sub-Saharan Africa'
      }),

      url = this._urlForQuery(query);

      return this.fetch({url: url});
    }

  });

})(this.App);
