(function(App) {

  'use strict';

  App.View = App.View || {};

  App.View.MapHomeView = Backbone.View.extend({

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
        this._drawMap();
      }.bind(this));
    },

    _drawMap: function() {
      var data = this.collection.toJSON();
      console.log(data);
      var map = new Datamap({
        scope: 'world',
        element: document.getElementById(this.el.id),
        projection: 'robinson',
        height: 600,
        fills: {
          defaultFill: 'rgba(216, 216, 216,0.5)',
        },
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
        data: {
          BRA: {fillKey: 'exporter' },
          CHN: {fillKey: 'importer' },
          DEU: {fillKey: 'importer' },
          FRA: {fillKey: 'importer' },
          SPN: {fillKey: 'importer' },
          THA: {fillKey: 'importer' },
          JPN: {fillKey: 'importer' },
          GBR: {fillKey: 'importer' },
          KOR: {fillKey: 'importer' },
          VNM: {fillKey: 'importer' },
        }
      })
    }

  });

})(this.App);
