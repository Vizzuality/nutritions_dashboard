(function(App) {

  'use strict';

  App.View = App.View || {};

  App.View.CostPackagesView = Backbone.View.extend({

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

      this.collection.getDataForCostPackages().done(function(){
        this.render();
      }.bind(this));
    },

    render: function() {
      this._drawGraph();
    },

    _drawGraph: function() {
      var data = this.collection.toJSON();
      var groupedData = _.groupBy(data, 'package');

      console.log(this.data)
      debugger
      this.stackChart = new App.View.Chart({
        el: this.el,
        options: {
          data: {
            json: {
              'RTS': _.pluck(groupedData.RTS, 'cost'),
              'Full': _.pluck(groupedData.Full, 'cost')
            },
            type: 'bar'
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
                text: 'USD M$',
                position: 'outer-top'
              },
              tick: {}
            }
          }
        }
      });
    }

  });

})(this.App);
