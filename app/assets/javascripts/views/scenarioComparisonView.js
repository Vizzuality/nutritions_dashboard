(function(App) {

  'use strict';

  App.View = App.View || {};

  App.View.ScenarioComparisionView = Backbone.View.extend({

    initialize: function() {
      this.status = Backbone.Model.extend();
      this.collection = App.Collection.Data();

      this._addListeners();
    },

    _addListeners: function() {
      //Internal
      this.status.on('change', this._fetchData);

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

      this.collection.getDataForScenarios(params).done(function(data){
        this.data = data;
        this.render();
      }).bind(this);
    },

    render: function() {
      //Render graph widget.
      console.log(this.data);
    }

  });

})(this.App);
