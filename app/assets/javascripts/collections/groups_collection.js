(function(App) {

  'use strict';

  App.Controller = App.Controller || {};

  App.Collection.GroupsCollection = App.Collection.CartoCollection.extend({

    queries: {
      info: {
        region: HandlebarsTemplates['queries/region_info'],
        'income_group': HandlebarsTemplates['queries/income_group_info']
      },
      region: HandlebarsTemplates['queries/regions'],
      'income_group': HandlebarsTemplates['queries/income-groups'],
    },

    getGroups: function(mode) {
      var query = this.queries[mode]();
      var url = this._urlForQuery(query);

      return this.fetch({url: url});
    },

    getGroupInfo: function(mode, group) {
      var query = this.queries['info'][mode]({group: group});
      var url = this._urlForQuery(query);

      return this.fetch({url: url});
    }

  });

})(this.App);
