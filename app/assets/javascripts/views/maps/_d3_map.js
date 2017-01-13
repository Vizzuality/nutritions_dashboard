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
            popupTemplate: function(geography, data) { //this function should just return a string
            // var sum = (data.sum) ? data.sum + '%' : '';
            if ( data ) {
              if ( data.sum ) {
                return '<div class="text -map"><strong>' + geography.properties.name + '</strong><p>' + data.sum + '%</p></div>';
              } else {
                return '<div class="text -map"><strong>' + geography.properties.name + '</strong></div>';
              }
            }
          },
          popupOnHover: true, //disable the popup while hovering
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
