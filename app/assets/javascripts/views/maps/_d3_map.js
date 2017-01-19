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
          highlightBorderColor: '#faf3e9',
          highlightBorderWidth: function(geo, data) {
            return ($(this).data("info")) ? 2 : 0.3;
          },
          highlightFillColor: function(geo, data) {
            return ($(this).data("info")) ? 'rgb(0, 163, 183)' : 'rgba(216, 216, 216, 0.5)';
          },
          popupOnHover: true,
          popupTemplate: function(geo, data) {
            if ( data ) {
              if ( data.sum ) {
                return '<div class="text -map"><strong>' + data.name + '</strong><p>' + data.sum + '%</p></div>';
              } else {
                return '<div class="text -map"><strong>' + data.name + '</strong></div>';
              }
            }
          }
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
