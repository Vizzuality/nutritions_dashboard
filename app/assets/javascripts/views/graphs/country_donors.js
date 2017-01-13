(function(App) {

  'use strict';

  App.View = App.View || {};

  App.View.CountryDonorsView = App.View.Chart.extend({

    template: HandlebarsTemplates['current_donor_funding_text'],

    initialize: function() {
      this.status = new Backbone.Model({});
      this.model = new App.Model.CountriesModel();

      App.View.CountryDonorsView.__super__.initialize.apply(this);
    },

    _addListeners: function() {
      //Internal
      this.status.on('change:iso', this._fetchData.bind(this));

      //External
      App.Events.on('country:selected', this._setStatus.bind(this))
    },

    _fetchData: function() {
      this.ajaxStart('#currentCountryDonor');
      var params = {
        iso: this.status.get('iso')
      };

      this.model.getDataForCountryDonors(params).done(function(){
        this.render();
        this.ajaxComplete('#currentCountryDonor');
      }.bind(this));
    },

    _parseData: function() {
      var parsedData = {};
      var data = this.model.toJSON();
      _.each(data, function(target) {
        parsedData[target.target.toLowerCase()] = target.cost
      });
      parsedData['country'] = data[0].country;
      return parsedData;
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
      var sum = 0;
      _.each(data, function(value){
        if ( !isNaN(value) )
        sum += value;
      });
      sum = this._formatNum(sum);
      this.$el.find('#currentDonorFundingText').html(this.template({
        sum: sum,
        country: data.country
      }));
    },

    _drawGraph: function() {
      var data = this._parseData();
      this._drawText(data);
      this.stackChart = new App.View.C3Chart({
        el: this.el,
        options: {
          padding: {
            top: 10
          },
          data: {
            columns: [
              ['All', data.anemia, data['exclusive breastfeeding'], data.stunting, data.wasting],
            ],
            type: 'bar',
          },
          bar: {
              width: {
                  ratio: 0.6
              }
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
