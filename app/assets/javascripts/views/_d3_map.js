(function(App) {

  'use strict';

  App.View = App.View || {};

  App.View.D3Map = Backbone.View.extend({

    _initMap: function() {
      this._drawMap();
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
          borderWidth: .3,
          borderOpacity: 1,
          borderColor: '#faf3e9',
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
      this.map.resize();
    },


    remove: function() {
      $(window).off('resize', this._resizeMap.bind(this));
      Backbone.View.prototype.remove.apply(this, arguments);
    }

  });

})(this.App);
