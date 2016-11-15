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

      this.costPackagesView = new App.View.CostPackagesView({
        el: '#costPackagesView'
      });

      this.globalSolidarityView = new App.View.GlobalSolidarityView({
        el: '#globalSolidarityView'
      });

      this.businessAsUsualView = new App.View.BusinessAsUsualView({
        el: '#businessAsUsualView'
      });
    },

  });
})(this.App);
