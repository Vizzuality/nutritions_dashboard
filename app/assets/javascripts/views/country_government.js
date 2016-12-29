(function(App) {

  'use strict';

  App.View = App.View || {};

  App.View.CountryGovernmentView = App.View.Chart.extend({

    initialize: function() {
      this.status = new Backbone.Model({});
      this.model = new App.Model.CountriesModel();

      App.View.CountryGovernmentView.__super__.initialize.apply(this);
    },

    _addListeners: function() {
      //Internal
      this.status.on('change:iso', this._fetchData.bind(this));

      //External
      App.Events.on('country:selected', this._setStatus.bind(this));
    },

    _fetchData: function() {
      var params = {
        iso: this.status.get('iso')
      };

      this.model.getDataForCountryGovernment(params).done(function(){
        this.render();
      }.bind(this));
    },

    _drawGraph: function() {

      //convert numerical values from strings to numbers
      var data = this.model.toJSON();

      this.stackChart = new App.View.C3Chart({
        el: this.el,
        options: {
          padding: {
            top: 10
          },
          color: this.colors.funding,
          data: {
            columns: [
              ['Gov', data[0].cost, 0, data[0].cost],
              ['Donor', 0, data[0].total_spend*1000000, data[0].total_spend*1000000]
            ],
            type: 'bar',
            groups: [
              ['Gov', 'Donor']
            ],
            colors: this.colors.funding,
            order: false
          },
          bar: {
              width: {
                  ratio: 0.4 // this makes bar width 50% of length between ticks
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
              categories: ['Gov.', 'Donors', 'Gov + Donors'],
              tick: {},
              padding: {
                left: 0,
                right: 0
              },
              height: 40,
            },
            y: {
              tick: {
                format: function (v, id, i, j) {
                  if (v > 1000 || v < -1000) {
                    var num = '$' + d3.format('.3s')(v);
                    num = num.replace("G", "B");
                    return num;
                  } else {
                    return d3.round(v, 2);
                  }
                },
                count: 6
              }
            }
          },
          grid: {
            y: {
              show: true
            }
          },
          legend: {
            hide: true
          }
        }
      });


    }

  });

})(this.App);
