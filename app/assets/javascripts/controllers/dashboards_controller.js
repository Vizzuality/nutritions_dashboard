(function(App) {

  'use strict';

  App.Controller = App.Controller || {};

  App.Controller.Dashboards = App.Controller.Page.extend({

    show: function(params) {
      console.log('Dashboards#index');
      console.log(params);

      //Init here the views for the dashboard.
      this.initSelectorsViews();
      this.initMapViews();
      this.initGraphsViews();
    },

    initSelectorsViews: function() {
    },

    initMapViews: function() {
    },

    initGraphsViews: function() {
      //Burden View
      //Meeting targets View
      //Packages View

      this.currentBurdenView = new App.View.CurrentBurdenView({
        el: '#currentBurdenView'
      });

      this.scenarioComparisionView = new App.View.ScenarioComparisionView({
        el: '#scenarioComparisonView'
      });
    },




  });
})(this.App);
