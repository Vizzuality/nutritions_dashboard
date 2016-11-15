(function(App) {

  'use strict';

  App.View = App.View || {};

  App.View.BusinessAsUsualView = Backbone.View.extend({

    initialize: function() {
      this.status = new Backbone.Model({});
      this.collection = new App.Collection.IndicatorsCollection();

      this._addListeners();
    },

    _addListeners: function() {
      //Internal
      // this.status.on('change', this._fetchData);
      // TEMPORAL - we are not setting values right now.
      this._fetchData();

      //External
      App.Events.on('groupSelector:group', this._setStatus)
    },

    _setStatus: function(params) {
      this.status.set(params);
    },

    _fetchData: function() {
      var params = {
        mode: this.status.get('mode'),
        item: this.status.get('item')
      };

      this.collection.getDataForScenarios(params).done(function(){
        this.render();
      }.bind(this));
    },

    render: function() {
      this._drawGraph();
    },

    _parseData: function() {
      var data = this.collection.toJSON();
      var dataByScenario = _.groupBy(data, 'scenario');

      for (var i in dataByScenario) {
        var packages = _.groupBy(dataByScenario[i], 'package');
        dataByScenario[i] = packages;
      }

      return dataByScenario;
    },

    _drawGraph: function() {
      var data = this._parseData()['Business As Usual']['Full'];

      this.stackChart = new App.View.Chart({
        el: this.el,
        options: {
          color: {
            pattern: ['#565554', '#2E86AB', '#F6F5AE', '#97F794', '#F24236']
          },
          data: {
            json: {
              'Domestic': _.pluck(_.where(data, {source: 'Domestic'}), 'cost'),
              'Donor': _.pluck(_.where(data, {source: 'Donor'}), 'cost'),
              'Household': _.pluck(_.where(data, {source: 'Household'}), 'cost'),
              'Innovative': _.pluck(_.where(data, {source: 'Innovative'}), 'cost'),
              'Gap': _.pluck(_.where(data, {source: 'Gap'}), 'cost')
            },
            types: {
              'Domestic': 'area',
              'Donor': 'area',
              'Household': 'area',
              'Innovative': 'area',
              'Gap': 'area'
                // 'line', 'spline', 'step', 'area', 'area-step' are also available to stack
            },
            groups: [['Domestic', 'Donor', 'Household', 'Innovative', 'Gap']],
          },
          axis: {
            x: {
              type: 'category',
              categories: _.uniq(_.pluck(data, 'year')),
              tick: {},
              padding: {
                left: 0,
                right: 0
              }
            },
            y: {
              label: {
                text: 'USD $',
                position: 'outer-top'
              },
              tick: {
                format: function (v, id, i, j) {
                  if (v > 1000 || v < -1000) {
                    return d3.format('.3s')(v);
                  } else {
                    return d3.round(v, 2);
                  }
                }
              }
            }
          }
        }
      });
    }

  });

})(this.App);
