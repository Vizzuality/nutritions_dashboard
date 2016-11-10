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
    }

  });

})(this.App);
