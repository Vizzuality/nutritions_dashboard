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
      console.log('Hi Ed, some notes here!!!')
      // We need to fix the scale of the bubbles. Now, as we are rendering gov and donor data separately, they have different scale.
      // We can solve this in two different ways: Adjusting the scale in d3, you can ask Gerardo or we can merge  all the data in one object and draw all at a time.
      // Chat also with Juan Carlos to see what he thinks about having the data in two parts or everything together.

      this.countryDonorsView = new App.View.CountryDonorsView({
        el: '#currentCountryDonor'
      });

      this.countryGovernmentView = new App.View.CountryGovernmentView({
        el: '#currentCountryGovernment'
      });
    }
  });
})(this.App);
