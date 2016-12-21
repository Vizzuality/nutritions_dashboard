(function(App) {

  'use strict';

  App.View = App.View || {};

  App.View.MapHomeView = Backbone.View.extend({

    defaults: {
      buckets: {
        bc1: '#e54935',
        bc2: '#ffa16f',
        bc3: '#ffe6a0',
        bc4: '#fffecc',
        bc5: '#ccebc7',
        bc6: '#66c7bf',
        bc7: '#00a3b7',
        defaultFill: 'rgba(216, 216, 216,0.5)'
      },
    },

    events: {
      'change .js--target-selector' : '_onChangeSetTarget'
    },

    initialize: function() {
      if (!this.el) {
        return;
      }
      this.status = new Backbone.Model({
        target: 'stunting',
      });
      this.collection = new App.Collection.CurrentStatusCollection({});
      this._cached();
      this._initMap();
      this.$el.find('select').select2({
        minimumResultsForSearch: Infinity
      });
      this._setListeners();
      App.View.MapHomeView.__super__.initialize.apply(this);
    },

    _setListeners: function() {
      $(window).on('resize', this._resizeMap.bind(this));
      this.status.on('change:target', this._triggerSelectedTarget.bind(this));
    },

    _initMap: function() {
      this._drawMap();
      this._fetchData();
    },

    _cached: function() {
      this.bucketNum = Object.keys(this.defaults.buckets).length;
    },

    _fetchData: function() {
      var target = this.status.get('target');

      this.collection.getTotalByCountry(target).done(function(){
        this._updateMap();
      }.bind(this));
    },

    _onChangeSetTarget: function() {
      var target = this.$el.find('.js--target-selector').val();
      this.status.set({ 'target': target });
    },

    _triggerSelectedTarget: function() {
      this._fetchData();
    },

    _drawMap: function() {
      this.map = new Datamap({
        scope: 'world',
        element: document.getElementById('map-container'),
        projection: 'robinson',
        responsive: true,
        fills: this.defaults.buckets,
        geographyConfig: {
          dataUrl: null,
          hideAntarctica: true,
          hideHawaiiAndAlaska: true,
          borderWidth: 0,
          highlightOnHover: false,
          popupOnHover: false,
        },
        data: {},
      })
    },

    _updateMap: function() {
      var data = this.collection.toJSON();
      var parsedData = this._parseData(data);
      this.map.updateChoropleth(parsedData);
    },

    _resizeMap: function() {
      console.log('resizing');
      this.map.resize();
    },

    _setBucket: function(sum) {;
      var bucket = ~~(( sum * this.bucketNum ) / 100) + 1;
      return "bc" + bucket;
    },

    _parseData: function(data) {
      var summedData = {};
      _.each(data, function(country) {
        var sum = country['per_' + this.status.get('target')];
        summedData[country.iso_code] = {
          fillKey: this._setBucket(sum),
          numberofThings: country.sum
        }
      }.bind(this));
      return summedData;
    },

    remove: function() {
      $(window).off('resize', this._resizeMap.bind(this));
      Backbone.View.prototype.remove.apply(this, arguments);
    }

  });

})(this.App);
