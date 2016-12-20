(function(App) {

  'use strict';

  App.View = App.View || {};

  App.View.MapHomeView = Backbone.View.extend({

    defaults: {
      map: {
        scope: 'world',
        element: document.getElementById(this.el.id),
        projection: 'robinson',
        height: 600,
        fills: {
          defaultFill: 'rgba(216, 216, 216,0.5)',
          bc1: '#e54935',
          bc2: '#ffa16f',
          bc3: '#ffe6a0',
          bc4: '#fffecc',
          bc5: '#ccebc7',
          bc6: '#66c7bf',
          bc7: '#00a3b7'
        },
        geographyConfig: {
          dataUrl: null
          hideAntarctica: true,
          borderWidth: 0,
          highlightOnHover: false,
          popupOnHover: false,
        },
        data: {},
      },
    },

    initialize: function() {
      if (!this.el) {
        return;
      }
      this.status = new Backbone.Model({
        target: 'Composite',
      });
      this.collection = new App.Collection.CurrentStatusCollection({});
      this._initMap();
      App.View.MapHomeView.__super__.initialize.apply(this);
    },

    _initMap: function() {
      this._drawMap();
      this._fetchData();
    },

    _fetchData: function() {
      var target = this.status.get('target');

      this.collection.getTotalByCountry(target).done(function(){
        this._updateMap();
      }.bind(this));
    },

    _drawMap: function() {
      this.map = new Datamap(this.defaults.map);
    },

    _updateMap: function() {
      var data = this.collection.toJSON();
      var parsedData = this._parseData(data);
      console.log(parsedData);
      this.map.updateChoropleth(parsedData);
    },

    _setBucket: function(sum, minMax) {
      var value = sum - minMax[0];
      var bucketNum = Object.keys(this.defaults.map.fills).length
      var bucket = ( value * bucketNum ) / ( minMax[1] - minMax[0] );
      var bucketFloor = ~~bucket;
      return "bc" + bucketFloor;
    },

    _getMinMax: function(data) {
      var minMax = [data[0].sum, data[0].sum];
      for ( var i = 0; i < data.length; i++ ) {
        if ( data[i].sum > minMax[1] ) {
          minMax[1] = data[i].sum;
        }
        if ( data[i].sum < minMax[0] && data[i].sum !== 0 ) {
          minMax[0] = data[i].sum;
        }
      }
      return minMax;
    },

    _parseData: function(data) {
      var summedData = {};
      var minMax = this._getMinMax(data);
      _.each(data, function(country) {
        summedData[country.iso_code] = {
          fillKey: this._setBucket(country.sum, minMax),
          numberofThings: country.sum
        }
      }.bind(this));
      return summedData;
    }

  });

})(this.App);
