(function(App) {

  'use strict';

  App.View = App.View || {};

  App.View.D3Map = Backbone.View.extend({

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
          popupTemplate: function(geography, data) {
          if ( data ) {
            if ( data.sum ) {
              return '<div class="text -map"><strong>' + data.name + '</strong><p>' + data.sum + '%</p></div>';
            } else {
              return '<div class="text -map"><strong>' + data.name + '</strong></div>';
            }
          }
          },
          popupOnHover: true,
          highlightFillColor: function(geo) {
            if ( $(this).data("info") ) {
              return '#009da7'
            }
            return 'rgba(216, 216, 216,0.5)'
          },
          highlightBorderColor: '#faf3e9',
          highlightBorderWidth: .3,
        },
        data: {},
      })
    },

    _resizeMap: function() {
      this.map.resize();
    },

    ajaxStart: function(view){
        $(view).addClass('-loading');
    },

    ajaxComplete: function(view){
        $(view).removeClass('-loading');
    },

    remove: function() {
      $(window).off('resize', this._resizeMap.bind(this));
      Backbone.View.prototype.remove.apply(this, arguments);
    }

  });

})(this.App);
