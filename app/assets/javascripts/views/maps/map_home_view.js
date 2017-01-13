(function(App) {

  'use strict';

  App.View = App.View || {};

  App.View.MapHomeView = App.View.D3Map.extend({

    defaults: {
      buckets: {
        stuntingbc1: '#fde2fd',
        stuntingbc2: '#f4b1f4',
        stuntingbc3: '#e87ce8',
        stuntingbc4: '#c766c7',
        stuntingbc5: '#b135b1',
        stuntingbc6: '#7f1280',
        stuntingbc7: '#410241',
        wastingbc1: '#fbfad6',
        wastingbc2: '#f9e5ac',
        wastingbc3: '#f9d15e',
        wastingbc4: '#e8b833',
        wastingbc5: '#cc9d18',
        wastingbc6: '#ad830c',
        wastingbc7: '#836207',
        anaemiabc1: '#fdedea',
        anaemiabc2: '#fbc0b7',
        anaemiabc3: '#f69589',
        anaemiabc4: '#f16250',
        anaemiabc5: '#e12911',
        anaemiabc6: '#ad1e0c',
        anaemiabc7: '#6a1207',
        ebfbc1: '#e9f6e7',
        ebfbc2: '#bbebb3',
        ebfbc3: '#8ed681',
        ebfbc4: '#68b85a',
        ebfbc5: '#339423',
        ebfbc6: '#0d6300',
        ebfbc7: '#004235',
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
      this._drawMap();
      this._fetchData();
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

    _cached: function() {
      this.bucketNum = Object.keys(this.defaults.buckets).length;
    },

    _fetchData: function() {
      this.ajaxStart('#map-section');
      var target = this.status.get('target');

      this.collection.getTotalByCountry(target).done(function(){
        this._updateMap();
        this.ajaxComplete('#map-section');
      }.bind(this));
    },

    _onChangeSetTarget: function() {
      var target = this.$el.find('.js--target-selector').val();
      this.status.set({ 'target': target });
    },

    _triggerSelectedTarget: function() {
      this._fetchData();
    },

    _setBucket: function(sum) {;
      var bucket = ~~(( sum * (7 - 1) ) / 100) + 1;
      var target = this.status.get('target');
      return target + "bc" + bucket;
    },

    _paintLegend: function() {
      var bucketList = $('#mapLegendView').find('.bucket span');
      _.each(bucketList, function(bucket, index) {
        var color = this.defaults.buckets[this.status.get('target') + 'bc' + (index + 1)];
        $(bucket).attr('style', 'background-color:' + color );
      }.bind(this));
    },

    _parseData: function(data) {
      var summedData = {};
      _.each(data, function(country) {
        var sum = country['per_' + this.status.get('target')] !== null ? country['per_' + this.status.get('target')] : 0;
        summedData[country.iso_code] = {
          fillKey: this._setBucket(sum),
          sum: sum
        }
      }.bind(this));
      return summedData;
    },

    _updateMap: function() {
      var data = this.collection.toJSON();
      var parsedData = this._parseData(data);
      this.map.updateChoropleth(parsedData, {reset: true});
      this._paintLegend();
    }



  });

})(this.App);
