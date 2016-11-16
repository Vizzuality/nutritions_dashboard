(function(App) {

  'use strict';

  App.Controller = App.Controller || {};

  App.Controller.Dashboards = App.Controller.Page.extend({

    show: function(params) {
      //Init here the views for the dashboard. Order matters.
      this.initTitleView();
      this.initGraphsViews();
      this.initMapViews();
      this.initSelectorsViews(params);
    },

    initTitleView: function() {
      this.title = new App.View.TitleView({
        el: '#titleView'
      })
    },

    initSelectorsViews: function(params) {
      this.modeSelector = new App.View.ModeSelectorView({
        el: '#modeSelectorView'
      });
      this.groupSelector = new App.View.GroupSelectorView({
        el: '#groupSelectorView'
      });

      this.modeSelector.setParams({mode: params[0]});
      this.groupSelector.setParams({mode: params[0], group: params[1]});
    },

    initMapViews: function() {
    },

    initGraphsViews: function() {
      // ***No data for this yet.***
      // this.currentBurdenView = new App.View.CurrentBurdenView({
      //   el: '#currentBurdenView'
      // });

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
