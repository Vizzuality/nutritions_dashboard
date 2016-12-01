(function(App) {

  'use strict';

  App.Controller = App.Controller || {};

  App.Controller.Countries = App.Controller.Page.extend({

    show: function(params) {
      //Init here the views for the dashboard. Order matters.
      // this.initTitleView();
      this.initGraphsViews();
      // this.initMapViews();
      // this.initSelectorsViews(params);
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

      this.countryDonorsView = new App.View.CountryDonorsView({
        el: '#currentCountryDonor'
      });

      this.countryGovernmentView = new App.View.CountryGovernmentView({
        el: '#currentCountryGovernment'
      });
    }

  });
})(this.App);
