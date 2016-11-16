(function(App) {

  'use strict';

  App.Controller = App.Controller || {};

  App.Collection.WorldBankDataCollection = App.Collection.CartoCollection.extend({

    currentBurdenTPL: HandlebarsTemplates['queries/current_burden'],
    table: 'nutritions',

    getDataForCurrentBurden: function(mode, group) {

      var query = this.currentBurdenTPL({
        'table': this.table,
        'mode': mode,
        'group': group
      });

      var url = this._urlForQuery(query);

      return this.fetch({url: url});
    }

  });

})(this.App);
