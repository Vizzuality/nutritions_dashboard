(function(App) {

  'use strict';

  App.Controller = App.Controller || {};

  App.Model.FundingProgressModel = App.Model.CartoModel.extend({

    queries: {
      funding: HandlebarsTemplates['queries/funding_progress'],
    },

    getFundingProgress: function(params) {
      var query = this.queries['funding']({ target: params.target });
      var url = this._urlForQuery(query);

      return this.fetch({url: url});
    }

  });

})(this.App);
