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
        wastingbc1: '#f4c151',
        wastingbc2: '#ecb231',
        wastingbc3: '#d4950c',
        wastingbc4: '#d3730c',
        wastingbc5: '#b1600a',
        wastingbc6: '#824606',
        wastingbc7: '#4C2801',
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
      values: {
        all: {
          v1: '< 15%',
          v2: '16% - 30%',
          v3: '31% - 45%',
          v4: '46% - 60%',
          v5: '61% - 75%',
          v6: '76% - 90%',
          v7: '> 90%'
        },
        wasting: {
          v1: '< 5%',
          v2: '6% - 10%',
          v3: '11% - 15%',
          v4: '16% - 20%',
          v5: '21% - 25%',
          v6: '26% - 30%',
          v7: '> 30%'
        }
      },
      legendText: {
        stunting: 'Percentage of children under 5 affected',
        wasting: 'Percentage of children under 5 affected',
        anaemia: 'Percentage of women of reproductive age affected',
        ebf: 'Percentage of newborns affected'
      },
      prevalenceText: {
        stunting: "Stunting affects 159 million children under five in low- and middle-income countries.",
        wasting: "Wasting affects 50 million children under five in low- and middle-income countries.",
        anaemia: "Anemia affects 533 million women of reproductive age in low- and middle-income countries.",
        ebf: "In low- and middle-income countries, 61% of infants under 6 months are not exclusively breastfed."
      }
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
      App.Events.on('target:selected', this._onChangeSetTarget.bind(this));
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

    _onChangeSetTarget: function(target) {
      this.status.set(target);
    },

    _triggerSelectedTarget: function() {
      this._fetchData();
    },

    _setBucket: function(sum) {
      this.status.get('target') === 'wasting' ? 'wasting' : 'all'
      if (this.status.get('target') !== 'wasting') {
        var bucket = ~~(( sum * (7 - 1) ) / 100) + 1;
        var target = this.status.get('target');
      } else {
        var bucket = ~~(( sum * (7 - 1) ) / 35) + 1;
        var target = this.status.get('target');
      }

      return target + "bc" + bucket;
    },

    _paintLegend: function() {
      var bucketList = $('#mapLegendView').find('.bucket span');

      _.each(bucketList, function(bucket, index) {
        var color = this.defaults.buckets[this.status.get('target') + 'bc' + (index + 1)];
        var value = this.defaults.values[this.status.get('target') === 'wasting' ? 'wasting' : 'all']['v' + (index + 1)];

        $(bucket).attr('style', 'background-color:' + color );
        $(bucket).html(value);
      }.bind(this));

    },

    _parseData: function(data) {
      var summedData = {};

      _.each(data, function(country) {
        if (country['per_' + this.status.get('target')] !== null ) {}
        var sum = country['per_' + this.status.get('target')] !== null ? country['per_' + this.status.get('target')] : '-';

        summedData[country.iso_code] = {
          fillKey: sum !== '-' ? this._setBucket(sum) : "defaultFill",
          sum: sum,
          name: country.country
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
