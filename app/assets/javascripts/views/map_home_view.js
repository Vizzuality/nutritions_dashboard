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
      }
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
      this.map = new Datamap({
        scope: 'world',
        element: document.getElementById(this.el.id),
        projection: 'robinson',
        height: 600,
        fills: this.defaults.buckets,
        geographyConfig: {
          dataUrl: null, //if not null, datamaps will fetch the map JSON (currently only supports topojson)
          hideAntarctica: true,
          borderWidth: 0,
          highlightOnHover: false,
          popupOnHover: false,
          // borderOpacity: 1,
          // popupTemplate: function(geography, data) { //this function should just return a string
          //   return '<div class="hoverinfo"><strong>' + geography.properties.name + '</strong></div>';
          // },
          // popupOnHover: true, //disable the popup while hovering
          // highlightOnHover: true,
          // highlightFillColor: '#FC8D59',
          // highlightBorderColor: 'rgba(250, 15, 160, 0.2)',
          // highlightBorderWidth: 2,
          // highlightBorderOpacity: 1
        },
        data: {},
      })
    },

    _updateMap: function() {
      var data = this.collection.toJSON();
      var parsedData = this._parseData(data);
      console.log(parsedData);
      this.map.updateChoropleth(parsedData);
    },

    _setBucket: function(sum) {
      var offset = minMax[0];
      var bucket = '';
      if 

    },

    _getMinMax: function(data) {
      var minMax = [0, 0];
      for ( var i = 0; i < data.length; i++ ) {
        if ( data[i].sum > minMax[1] ) {
          minMax[1] = data[i].sum;
        } else {
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
          fillKey: this._setBucket(country.sum),
          numberofThings: country.sum
        }
      });
      return summedData;
    }

  });

})(this.App);
