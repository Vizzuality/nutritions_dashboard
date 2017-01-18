(function(App) {

  'use strict';

  App.Controller = App.Controller || {};

  App.Controller.Countries = App.Controller.Page.extend({

    show: function(params) {
      //Init here the views for the countries profile. Order matters.
      this.initMapView();
      this.initGraphsViews();
      this.initSelectorsViews(params);
    },

    initMapView: function() {
      this.map = new App.View.MapCountriesView({
        el: '#countryMapView'
      });
    },

    initSelectorsViews: function(params) {
      this.countrySelector = new App.View.CountrySelectorView({
        el: '#countrySelectorView'
      });
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
