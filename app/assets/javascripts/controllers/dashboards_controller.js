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
      this.description = new App.View.MapTitleView({
        el: '#mapTitleView'
      })
      this.title = new App.View.ChartTitleView({
        el: '#chartTitleView'
      })
      this.info = new App.View.AdditionalInfoView({
        el: '#additionalInfoView'
      })
      this.cost = new App.View.CostTitleView({
        el: '#costTitleView'
      })
    },

    initSelectorsViews: function(params) {
      this.modeSelector = new App.View.ModeSelectorView({
        el: '#modeSelectorView'
      });
      this.groupSelector = new App.View.GroupSelectorView({
        el: '#groupSelectorView'
      });

      // This is to avoid setting a group as null and have a double trigger at groupSelector  View.
      var urlParams = {};
      params[0] ? urlParams.mode = params[0] : null;
      params[1] ? urlParams.group = params[1] : null;

      this.modeSelector.setParams({mode: params[0]});
      this.groupSelector.setParams(urlParams);
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

      this.ScenarioComparisonView = new App.View.ScenarioComparisonView();
    },

  });
})(this.App);
