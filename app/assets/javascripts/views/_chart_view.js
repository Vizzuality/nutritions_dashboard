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

    render: function() {
      this._drawGraph();
    }

  });

})(this.App);
