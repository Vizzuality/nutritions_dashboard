(function(App) {

  'use strict';

  App.Controller = App.Controller || {};

  App.Controller.Dashboards = App.Controller.Page.extend({

    show: function(params) {
      //Init here the views for the dashboard.
      this.initSelectorsViews();
      this.initMapViews();
      this.initGraphsViews();
    },

    initSelectorsViews: function() {
      this.modeSelector = new App.View.ModeSelectorView({
        el: '#modeSelectorView'
      });
      this.groupSelector = new App.View.GroupSelectorView({
        el: '#groupSelectorView'
      });
    },

    initMapViews: function() {
    },

    initGraphsViews: function() {
      this.currentBurdenView = new App.View.CurrentBurdenView({
        el: '#currentBurdenView'
      });

      this.costMeetingTargetsView = new App.View.CostMeetingTargetsView({
        el: '#costMeetingPackagesView'
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
