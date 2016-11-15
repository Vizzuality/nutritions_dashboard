(function(App) {

  'use strict';

  App.View = App.View || {};

  App.View.CurrentBurdenView = App.View.Chart.extend({

    initialize: function() {
      this.status = new Backbone.Model({});
      this.collection = new App.Collection.WorldBankDataCollection();

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

      this.collection.getDataForCurrentBurden().done(function(){
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
          color: this.colors.other,
          data: {
            columns: [
              ['data1', 30, 200, 100, 400]
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
              categories: ['Stunting', 'Wasting', 'Anemia', 'Non-exclusive Breastfeeding'], //pluck values from data,
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
