(function(App) {

  'use strict';

  App.View = App.View || {};

  App.View.MapCountriesView = App.View.D3Map.extend({

    defaults: {
      buckets: {
        active: '#009da7',
        defaultFill: 'rgba(216, 216, 216,0.5)'
      },
    },

    events: {
      'change .js--country-selector' : '_onChangeSetCountry'
    },

    initialize: function() {
      if (!this.el) {
        return;
      }

      this.collection = new App.Collection.CountriesCollection();

      this._drawMap();
      this._setListeners();
      this._fetchData();
      App.View.MapCountriesView.__super__.initialize.apply(this);
    },

    _setListeners: function() {
      $(window).on('resize', this._resizeMap.bind(this));
    },

    _cached: function() {
      this.countryData = this._parseData(this.collection.toJSON());
    },

    _onChangeSetCountry: function() {
      var country = this.$el.find('.js--country-selector').val();
      var data = this.countryData;
      var keys = Object.keys(data)
      if ( country.length > 1 ) {
        _.each(keys, function(iso){
          if ( country === iso ) {
            data[iso].fillKey = 'active'
          } else {
            data[iso].fillKey = 'defaultFill'
          }
        })
      } else {
        _.each(keys, function(iso){
          data[iso].fillKey = 'active'
        })
      }
      this._updateMap(data);
    },

    _fetchData: function() {
      this.collection.getCountries().done(function(){
        this._cached();
        this._updateMap(this.countryData);
      }.bind(this));
    },

    _updateMap: function(data) {
      this.map.updateChoropleth(data, {reset: true});
    },

    _parseData: function(data) {
      var parsedData = {};
      _.each(data, function(country) {
        parsedData[country.iso_code] = {
          fillKey: 'active'
        }
      }.bind(this));
      return parsedData;
    }

  });

})(this.App);
