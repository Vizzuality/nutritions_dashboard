(function(App) {

  'use strict';

  App.Controller = App.Controller || {};

  App.Controller.Countries = App.Controller.Page.extend({

    show: function(params) {
      this.initMapView();
      this.initGraphsViews();
      this.initModalViews();
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

    initModalViews: function() {
      this.downloadData = new App.View.DownloadDataView({
        collection: new App.Model.CountriesModel(),
        trigger: 'iso',
        graphs: [{
          name: 'Current burden',
          key: 'current_spending_donors'
        }, {
          name: 'Cost of meeting targets',
          key: 'current_spending_government'
        }],
        selectors: ['iso']
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
