(function(App) {

  'use strict';

  App.View = App.View || {};

  App.View.Chart = Backbone.View.extend({

    colors: {
      targets: {
        'Anemia': '#e0534f',
        'Composite': '#00a3b7',
        'Non Exclusive breastfeeding': '#a1d549',
        'EBF': '#a1d549',
        'Stunting': '#db67fa',
        'Wasting': '#f4bd19'
      },
      packages: {
        'Full': '#93c9d8',
        'Priority': '#00a3b7'
      },
      funding: {
        'Donor': '#93c9d8',
        'Gov': '#00a3b7'
      },
      sources: {
        'Gap': '#bcb3a4',
        'Household': '#047482',
        'Innovative': '#00a3b7',
        'Domestic': '#7cc7c8',
        'Donor': '#b5e0e1'
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

    ajaxStart: function(view){
        $(view).addClass('-loading');
    },

    ajaxComplete: function(view){
        $(view).removeClass('-loading');
    },

    _addListeners: function() {
      //Internal
      this.status.on('change:group', this._fetchData.bind(this));

      //External
      App.Events.on('group:selected', this._setStatus.bind(this));
    },

    _setStatus: function(params) {
      this.status.set(params);
    },

    render: function() {
      this._drawGraph();
    }

  });

})(this.App);
