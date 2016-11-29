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
        group: this.status.get('group')
      };

      this.collection.getDataForCurrentBurden(params).done(function(){
        this.render();
      }.bind(this));
    },

    _drawGraph: function() {
      var data = this.collection.toJSON()[0];

      this.stackChart = new App.View.C3Chart({
        el: this.el,
        options: {
          data: {
            columns: [
              ['Anemia', data.anemia, null, null, null],
              ['Non Exclusive breastfeeding', null, data.non_ebf, null, null],
              ['Stunting', null, null, data.stunting, null],
              ['Wasting', null, null, null, data.wasting]
            ],
            type: 'bar',
            colors: this.colors.targets
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
              categories: ['Anemia', 'Non Exclusive Breasfeeding', 'Stunting', 'Wasting'],
              tick: {},
              padding: {
                left: 0,
                right: 0
              }
            },
            y: {
              label: {
                text: '%',
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
