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
      this.ajaxStart('#packageComparisonSection');
      var params = {
        mode: this.status.get('mode'),
        group: this.status.get('group')
      };

      this.collection.getDataForCostPackages(params).done(function(){
        this.render();
        this.ajaxComplete('#packageComparisonSection');
      }.bind(this));
    },

    _round: function(num) {
      var len = (num + '').length;
      var fac = Math.pow(10, len - 1);
      var max = Math.ceil(num / fac) * fac;
      var offset = 0;
      if ( max % 3 > 0 ) {
        offset = ( 3 - (max % 3) ) * fac;
      }
      return max + offset;
    },

    _createTicks: function(array) {
      var max = Math.max.apply(null, array);
      max = this._round(max);
      var scale = [0];
      var prev = 0;
      for ( var i = 1; i < 6; i++ ) {
        scale[i] = prev + max / 6;
        prev = scale[i];
      }
      return scale;
    },

    _drawGraph: function() {
      var data = this.collection.toJSON();
      var groupedData = _.groupBy(data, 'package');
      var ticks = this._createTicks(_.pluck(groupedData.Full, 'cost'));

      this.stackChart = new App.View.C3Chart({
        el: this.el,
        options: {
          padding: {
            top: 10
          },
          color: this.colors.other,
          data: {
            json: {
              'Priority': _.pluck(groupedData.RTS, 'cost'),
              'Full': _.pluck(groupedData.Full, 'cost')
            },
            type: 'bar',
            colors: this.colors.packages
          },
          bar: {
              width: {
                  ratio: 0.6 // this makes bar width 50% of length between ticks
              }
              // or
              //width: 100 // this makes bar width 100px
          },
          interaction: {
            enabled: true
          },
          axis: {
            x: {
              type: 'category',
              categories: ["'16", "'17", "'18", "'19", "'20", "'21", "'22", "'23", "'24", "'25"],
              tick: {},
              padding: {
                left: 0,
                right: 0
              },
              height: 40,
            },
            y: {
              tick: {
                values: ticks,
                format: function (v, id, i, j) {
                  if (v > 1000 || v < -1000) {
                    if ( ('' + ticks[1]).length === ('' + ticks[2]).length ) {
                      var num = '$' + d3.format('.1s')(v);
                    } else {
                      var num = '$' + d3.format('.2s')(v);
                    }
                    num = num.replace("G", "B");
                    return num;
                  } else {
                    return d3.round(v, 2);
                  }
                },
              }
            }
          },
          tooltip: {
            format: {
              value: function (v) {
                if (v > 1000 || v < -1000) {
                  // debugger
                  // var num = d3.format('.3s')(v);
                  // var scale = num.substr(4,4);
                  // var fig = Math.floor(num.substr(0,3));
                  var num = '$' + d3.format('.3s')(v);
                  num = num.replace("G", "B");
                  return num;
                } else {
                  return d3.round(v, 2);
                }
              }
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
