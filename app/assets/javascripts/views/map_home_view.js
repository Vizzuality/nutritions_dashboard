(function(App) {

  'use strict';

  App.View = App.View || {};

  App.View.MapHomeView = App.View.D3Map.extend({

    defaults: {
      buckets: {
        stuntingbc1: '#410241',
        stuntingbc2: '#7f1280',
        stuntingbc3: '#b135b1',
        stuntingbc4: '#c766c7',
        stuntingbc5: '#e87ce8',
        stuntingbc6: '#f4b1f4',
        stuntingbc7: '#fde2fd',
        wastingbc1: '#836207',
        wastingbc2: '#ad830c',
        wastingbc3: '#cc9d18',
        wastingbc4: '#e8b833',
        wastingbc5: '#f9d15e',
        wastingbc6: '#f9e5ac',
        wastingbc7: '#fbfad6',
        anaemiabc1: '#6a1207',
        anaemiabc2: '#ad1e0c',
        anaemiabc3: '#e12911',
        anaemiabc4: '#f16250',
        anaemiabc5: '#f69589',
        anaemiabc6: '#fbc0b7',
        anaemiabc7: '#fdedea',
        ebfbc1: '#004235',
        ebfbc2: '#0d6300',
        ebfbc3: '#339423',
        ebfbc4: '#68b85a',
        ebfbc5: '#8ed681',
        ebfbc6: '#bbebb3',
        ebfbc7: '#e9f6e7',
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
        var sum = country['per_' + this.status.get('target')];
        summedData[country.iso_code] = {
          fillKey: this._setBucket(sum),
          numberofThings: country.sum
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
