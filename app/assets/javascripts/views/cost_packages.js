(function(App) {

  'use strict';

  App.View = App.View || {};

  App.View.CostPackagesView = App.View.Chart.extend({

    initialize: function() {
      this.status = new Backbone.Model({});
      this.collection = new App.Collection.IndicatorsCollection();

      App.View.CostPackagesView.__super__.initialize.apply(this);
    },

    _fetchData: function() {
      var params = {
        mode: this.status.get('mode'),
        group: this.status.get('group')
      };

      this.collection.getDataForCostPackages(params).done(function(){
        this.render();
      }.bind(this));
    },

    _drawGraph: function() {
      var data = this.collection.toJSON();
      var groupedData = _.groupBy(data, 'package');

      this.stackChart = new App.View.C3Chart({
        el: this.el,
        options: {
          color: this.colors.other,
          data: {
            json: {
              'Priority': _.pluck(groupedData.RTS, 'cost'),
              'Full': _.pluck(groupedData.Full, 'cost')
            },
            type: 'bar',
            groups: [
              ['Priority', 'Full']
            ],
            colors: this.colors.packages
          },
          bar: {
              width: {
                  ratio: 0.5 // this makes bar width 50% of length between ticks
              }
              // or
              //width: 100 // this makes bar width 100px
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
