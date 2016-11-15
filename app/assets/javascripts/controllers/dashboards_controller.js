(function(App) {

  'use strict';

  App.Controller = App.Controller || {};

  App.Controller.Dashboards = App.Controller.Page.extend({

    show: function(params) {
      //Init here the views for the dashboard.
      this.initSelectorsViews(params);
      this.initMapViews();
      this.initGraphsViews();
    },

    initSelectorsViews: function(params) {
      this.modeSelector = new App.View.ModeSelectorView({
        el: '#modeSelectorView'
      });
      this.groupSelector = new App.View.GroupSelectorView({
        el: '#groupSelectorView',
        params: params
      });

      this.modeSelector.setParams({mode: params[0], group: params[1]]});
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
