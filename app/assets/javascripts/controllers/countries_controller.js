(function(App) {

  'use strict';

  App.Controller = App.Controller || {};

  App.Controller.Countries = App.Controller.Page.extend({

    show: function(params) {
      //Init here the views for the countries profile. Order matters.
      // this.initTitleView();
      this.initGraphsViews();
      // this.initMapViews();
      this.initSelectorsViews(params);
    },

    initTitleView: function() {
      this.title = new App.View.TitleView({
        el: '#titleView'
      })
    },

    initSelectorsViews: function(params) {
      this.countrySelector = new App.View.CountrySelectorView({
        el: '#countrySelectorView'
      });

      // this.countrySelector.setParams({mode: params[0]});
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
