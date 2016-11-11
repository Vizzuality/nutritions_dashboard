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
      // console.log(this.collection.toJSON());
      this._drawGraph();
    },

    _drawGraph: function() {
      this.stackChart = new App.View.Chart({
        el: this.el,
        options: {
          data: {
            columns: [
              ['data1', 30, 200, 100, 400, 30, 200, 100, 400, 500],
              ['data2', 10, 100, 50, 300, 10, 100, 50, 300, 350]
            ],
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
              categories: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'], //pluck values from data,
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
