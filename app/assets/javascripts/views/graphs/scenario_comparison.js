(function(App) {

  'use strict';

  App.View = App.View || {};

  App.View.ScenarioComparisonView = Backbone.View.extend({

    initialize: function() {
      this.graphModeSelector = new App.View.GraphModeSelectorView({
        el: '#graphModeSwitcher'
      });

      this.globalSolidarityView = new App.View.ScenarioComparisonGraphsView({
        el: '#globalSolidarityView',
        scenario: 'Global Solidarity',
        graphMode: 'Full'
      });

      this.businessAsUsualView = new App.View.ScenarioComparisonGraphsView({
        el: '#businessAsUsualView',
        scenario: 'Business As Usual',
        graphMode: 'Full'
      });
    }

  });

})(this.App);
