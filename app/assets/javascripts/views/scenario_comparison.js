(function(App) {

  'use strict';

  App.View = App.View || {};

  App.View.ScenarioComparisionView = Backbone.View.extend({

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
      //Render graph widget.
      console.log(this.collection.toJSON());
      this._drawGraph();
    },

    _drawGraph: function() {
      this.stackChart = new App.View.Chart({
        el: this.el,
        options: {
          data: {
            columns: [
                ['gap', 300, 350, 400, 500, 520, 600],
                ['data2', 130, 150, 180, 200, 230, 550],
                ['data3', 200, 230, 280, 300, 350, 750]
            ],
            types: {
                gap: 'area',
                data2: 'area',
                data3: 'area'
                // 'line', 'spline', 'step', 'area', 'area-step' are also available to stack
            },
            groups: [['gap', 'data2', 'data3']],
          },
          axis: {
            x: {
              type: 'category',
              categories: ['2015', '2016', '2017', '2018', '2019', '2019'], //pluck values from data,
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
