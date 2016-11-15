(function(App) {

  'use strict';

  App.View = App.View || {};

  App.View.GroupSelectorView = Backbone.View.extend({

    template: HandlebarsTemplates['group-selector'],

    events: {
      'change .js--group-selector' : '_onChangeSetGroup'
    },

    initialize: function() {
      this.status = new Backbone.Model();

      this.collection = new App.Collection.GroupsCollection();
      this._setListeners();
    },

    setParams: function(params) {
      //Atasco recibir params de la url async
      this.$el.find('.js--group-selector')
        .val(params.group)
        .trigger('change')
    },

    _setListeners: function() {
      this.status.on('change:mode', this._updateSelectorGroup.bind(this));
      this.status.on('change:group', this._triggerSelectedGroup.bind(this));

      App.Events.on('mode:selected', this._updateStatusMode.bind(this));
    },

    _onChangeSetGroup: function() {
      var group = this.$el.find('.js--group-selector').val();
      this.status.set({ 'group': group });
    },

    _fetchData: function() {
      var mode = this.status.get('mode');

      this.collection.getGroups(mode).done(function(){
        this.render();
      }.bind(this));
    },

    _updateSelectorGroup: function(){
      this._fetchData();
    },

    _updateStatusMode: function(mode) {
      this.status.set(mode);
    },

    _triggerSelectedGroup: function() {
      App.Events.trigger('group:selected', this.status);
    },

    render: function() {
      this.$el.find('.js--group-selector').html(this.template({
        data: this.collection.toJSON()
      }));
    }
  });

})(this.App);
