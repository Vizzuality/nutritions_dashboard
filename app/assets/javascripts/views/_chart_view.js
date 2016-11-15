(function(App) {

  'use strict';

  App.View = App.View || {};

  App.View.Chart = Backbone.View.extend({

    colors: {
      targets: {
        'Anemia': '7C1C05',
        'Composite': 'CCAB5E',
        'Exclusive breastfeeding': 'E6850B',
        'Stunting': '083347',
        'Wasting': '4E7F8D'
      },
      sources: {
        'Domestic': '#565554',
        'Donor': '#2E86AB',
        'Household': '#97F794',
        'Innovative': '#F6F5AE',
        'Gap': '#F24236'
      },
      other: ['#c1de11', '#8ac230', '#3f8c3f', '#fff000', '#fabada']
    },

    initialize: function(settings) {
      if (!this.el) {
        return;
      }

      var opts = settings && settings.options ? settings.options : {};
      this.options = _.extend({
        bindto: this.$el.find('.c-chart')[0]
      }, this.defaults, opts);

      this.render();
    },

    render: function() {
      this.chart = c3.generate(this.options);
    }

  });

})(this.App);
