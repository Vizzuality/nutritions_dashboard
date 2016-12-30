(function(App) {

  'use strict';

  App.View = App.View || {};

  App.View.FundingProgressView = App.View.Chart.extend({

    initialize: function() {
      this.status = new Backbone.Model({});
      this.model = new App.Model.FundingProgressModel();

      this._fetchData();

      App.View.FundingProgressView.__super__.initialize.apply(this);
    },

    _fetchData: function() {
      // this.ajaxStart('#costGoalsSection');
      var params = {
        target: 'composite',
      };

      this.model.getFundingProgress(params).done(function(){
        console.log(this.model.toJSON())
      }.bind(this));
    },

  });

})(this.App);
