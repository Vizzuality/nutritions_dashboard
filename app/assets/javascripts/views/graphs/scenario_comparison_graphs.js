(function(App) {

  'use strict';

  App.View = App.View || {};

  App.View.ScenarioComparisonGraphsView = App.View.Chart.extend({

    initialize: function(props) {
      this.status = new Backbone.Model({
        graphMode: props.graphMode
      });
      this.collection = new App.Collection.IndicatorsCollection();

      this.props = props;

      this._setListeners();

      App.View.ScenarioComparisonGraphsView.__super__.initialize.apply(this);
    },

    _fetchData: function() {
      this.ajaxStart('#fullPrioritySection');
      var params = {
        mode: this.status.get('mode'),
        group: this.status.get('group')
      };

      this.collection.getDataForScenarios(params).done(function(){
        this.render();
        this.ajaxComplete('#fullPrioritySection');
      }.bind(this));
    },

    _setListeners: function() {
      this.status.on('change:graphMode', this.render.bind(this));

      App.Events.on('graphMode:selected', this._setGraphMode.bind(this));
    },

    _setGraphMode: function(params) {
      this.status.set(params)
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
      var data = this._parseData()[this.props.scenario][this.status.get('graphMode')];
      console.log(_.pluck(_.where(data, {source: 'Innovative'}), 'cost'))
      this.stackChart = new App.View.C3Chart({
        el: this.el,
        options: {
          data: {
            json: {
              'Donor': _.pluck(_.where(data, {source: 'Donor'}), 'cost'),
              'Domestic': _.pluck(_.where(data, {source: 'Domestic'}), 'cost'),
              'Innovative': _.pluck(_.where(data, {source: 'Innovative'}), 'cost'),
              'Household': _.pluck(_.where(data, {source: 'Household'}), 'cost'),
              'Gap': _.pluck(_.where(data, {source: 'Gap'}), 'cost'),
            },
            types: {
              'Household': 'area',
              'Innovative': 'area',
              'Domestic': 'area',
              'Donor': 'area',
              'Gap': 'area',
            },
            groups: [['Household', 'Innovative','Domestic', 'Donor', 'Gap']],
            colors: this.colors.sources,
            order: false
          },
          interaction: {
            enabled: true
          },
          axis: {
            x: {
              type: 'category',
              categories: ["'15", "'16", "'17", "'18", "'19", "'20", "'21", "'22", "'23", "'24", "'25"],
              tick: {
                fit: true
              },
              padding: {
                left: 0,
                right: 0
              },
              height: 60,
            },
            y: {
              tick: {
                format: function (v, id, i, j) {
                  if (v > 1000 || v < -1000) {
                    var num = d3.format('.2s')(v);
                    num = num.replace("G", "B");
                    return '$' + num;
                  } else {
                    return d3.round(v, 2);
                  }
                }
              },
              count: 6
            }
          },
          legend: {
            item: {
              onclick: function () {}
            }
          },
          grid: {
            y: {
              show: true
            }
          }
        }
      });
    }

  });

})(this.App);
