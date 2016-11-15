(function(App) {

  'use strict';

  App.Controller = App.Controller || {};

  App.Collection.GroupsCollection = App.Collection.CartoCollection.extend({

    queries: {
      'regions': HandlebarsTemplates['queries/regions'],
      'income-groups': HandlebarsTemplates['queries/income-groups'],
    },

    getGroups: function(mode) {
      var query = this.queries[mode]();
      var url = this._urlForQuery(query);

      return this.fetch({url: url});
    }

  });

})(this.App);
