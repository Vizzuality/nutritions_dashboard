(function(App) {

  'use strict';

  App.View = App.View || {};

  App.View.CurrentBurdenView = App.View.Chart.extend({

    initialize: function() {
      this.status = new Backbone.Model({});
      this.collection = new App.Collection.IndicatorsCollection();

      App.View.CurrentBurdenView.__super__.initialize.apply(this);
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

    _drawGraph: function() {
      this.stackChart = new App.View.C3Chart({
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
                text: 'USD $',
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
