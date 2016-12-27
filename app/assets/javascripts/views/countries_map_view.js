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
      'change .js--target-selector' : '_onChangeSetCountry'
    },

    initialize: function() {
      if (!this.el) {
        return;
      }
      this.status = new Backbone.Model({
        country: '',
      });
      this.collection = new App.Collection.CountriesCollection({});
      this._cached();
      this._initMap();
      this.$el.find('select').select2({
        minimumResultsForSearch: Infinity
      });
      this._setListeners();
      App.View.MapCountriesView.__super__.initialize.apply(this);
    },

    _setListeners: function() {
      $(window).on('resize', this._resizeMap.bind(this));
      this.status.on('change:country', this._triggerSelectedCountry.bind(this));
    },

    _fetchData: function() {
      var country = this.status.get('country');

      this.collection.getTotalByCountry(country).done(function(){
        this._updateMap();
      }.bind(this));
    },

    _onChangeSetCountry: function() {
      var country = this.$el.find('.js--country-selector').val();
      this.status.set({ 'country': country });
    },

    _triggerSelectedTarget: function() {
      this._fetchData();
    },

    _parseData: function(data) {
      var summedData = {};
      _.each(data, function(country) {
        var sum = country['per_' + this.status.get('country')];
        summedData[country.iso_code] = {
          fillKey: this._setBucket(sum),
          numberofThings: country.sum
        }
      }.bind(this));
      return summedData;
    }

  });

})(this.App);
