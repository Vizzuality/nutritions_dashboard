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
      this.ajaxStart('#commonNutritionSection');
      var params = {
        mode: this.status.get('mode'),
        group: this.status.get('group')
      };

      this.collection.getDataForCurrentBurden(params).done(function(){
        this.render();
        this.ajaxComplete('#commonNutritionSection');
      }.bind(this));
    },

    _drawGraph: function() {
      var data = this.collection.toJSON()[0];

      this.stackChart = new App.View.C3Chart({
        el: this.el,
        options: {
          data: {
            columns: [
              ['All', data.anemia, data.non_ebf, data.stunting, data.wasting],
              // ['Non Exclusive breastfeeding', null, data.non_ebf, null, null],
              // ['Stunting', null, null, data.stunting, null],
              // ['Wasting', null, null, null, data.wasting]
            ],
            type: 'bar',
            // colors: this.colors.targets
          },
          bar: {
              width: {
                  ratio: 0.6 // this makes bar width 50% of length between ticks
              }
              // or
              //width: 100 // this makes bar width 100px
          },
          interaction: {
            enabled: false
          },
          axis: {
            x: {
              type: 'category',
              categories: ['Anemia', 'Non EBF', 'Stunting', 'Wasting'],
              tick: {
                fit: true
              },
              padding: {
                left: 0,
                right: 0
              },
              height: 60
            },
            y: {
              min: 0,
              max: 101,
              padding: {top: 0, bottom: 0},
              tick: {
                format: function (d) { return d + '%'; },
                values: [0, 20, 40, 60, 80, 100],
                count: 6
              },
            }
          },
          grid: {
            y: {
              show: true,
            }
          },
          legend: {
            show: false
          }
        },
      });
    }

  });

})(this.App);
