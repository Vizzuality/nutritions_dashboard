(function(App) {

  'use strict';

  App.View = App.View || {};

  App.View.CountryGovernmentView = App.View.Chart.extend({

    templates: {
      domestic: HandlebarsTemplates['current_funding_domestic'],
      foreign: HandlebarsTemplates['current_funding_domestic_null']
    },

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
      this.ajaxStart('#currentCountryGovernment');
      var params = {
        iso: this.status.get('iso')
      };

      this.model.getDataForCountryGovernment(params).done(function(){
        this.render();
        this.ajaxComplete('#currentCountryGovernment');
      }.bind(this));
    },

    _formatNum: function(num) {
      if (num > 1000 || num < -1000) {
        var num = '$' + d3.format('.3s')(num);
        num = num.replace("G", "B");
        return num;
      } else {
        return d3.round(num, 2);
      }
    },

    _drawText: function(data) {
      if ( data[0].cost > 0 ) {
        this.$el.find('#governmentFundingText').html(this.templates.foreign({
          donor: this._formatNum(data[0].cost),
          country: data[0].country
        }));
      } else {
        this.$el.find('#governmentFundingText').html(this.templates.domestic({
          donor: this._formatNum(data[0].cost),
          gov: this._formatNum(data[0].total_spend*1000000),
          total: this._formatNum(data[0].cost + data[0].total_spend*1000000),
          country: data[0].country
        }));
      }
    },

    _drawGraph: function() {
      var data = this.model.toJSON();
      this._drawText(data);
      this.stackChart = new App.View.C3Chart({
        el: this.el,
        options: {
          padding: {
            top: 10
          },
          color: this.colors.funding,
          data: {
            columns: [
              ['Gov', data[0].total_spend*1000000, 0, data[0].total_spend*1000000],
              ['Donor', 0, data[0].cost, data[0].cost]
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
