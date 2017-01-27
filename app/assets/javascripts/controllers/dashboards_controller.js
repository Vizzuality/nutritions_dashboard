(function(App) {

  'use strict';

  App.Controller = App.Controller || {};

  App.Controller.Dashboards = App.Controller.Page.extend({

    show: function(params) {
      //Init here the views for the dashboard. Order matters.
      this.initTitleView();
      this.initGraphsViews();
      this.initMapViews();
      this.initModalViews();
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
      this.downloadData.setStatus(urlParams);
    },

    initMapViews: function() {
    },

    initModalViews: function() {
      this.modalInfo = new App.View.ModalInfoView({});
      this.downloadData = new App.View.DownloadDataView({
        collection: new App.Collection.IndicatorsCollection(),
        trigger: 'group',
        graphs: [{
          name: 'Prevalence of nutritional conditions',
          key: 'current_burden'
        }, {
          name: 'Cost of meeting targets on top of current spending, 2016-2025',
          key: 'cost_meeting_targets'
        }, {
          name: 'Cost of packages comparison',
          key: 'cost_packages'
        }, {
          name: 'Financing the targets through Business as Usual vs. Global Solidarity',
          key: 'scenario_comparison'
        }],
        selectors: ['mode', 'group']
      });
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

      this.costPackagesViewPrint = new App.View.CostPackagesView({
        el: '#costPackagesViewPrint'
      });

      this.ScenarioComparisonView = new App.View.ScenarioComparisonView();
    },

  });
})(this.App);
