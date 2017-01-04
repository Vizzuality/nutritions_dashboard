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
      this.$el.find('select').select2({
        minimumResultsForSearch: Infinity
      });
    },

    setParams: function(params) {
      this.status.set(params);
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
      if (this.status.get('mode') !== 'global') {
        this._fetchData();
      } else {
        this.$el.addClass('is-hidden');
        this.status.set({group: 'global'})
      }
    },

    _updateStatusMode: function(mode) {
      this.status.set(mode);
    },

    _triggerSelectedGroup: function() {
      App.Events.trigger('group:selected', {
        mode: this.status.get('mode'),
        group: this.status.get('group')
      });
      this._pushStateToUrl();
    },

    _setSelectedGroup: function() {
      var valueFromParams = this.status.get('group');
      var $selector = this.$el.find('.js--group-selector');
      var selectorValue = $selector.val()
      var $selectorOption = $selector.find('option[value="'+valueFromParams +'"]');

      if ($selectorOption) {
        if (valueFromParams != selectorValue) {
          $selectorOption.attr('selected', true);
          $selector.trigger('change');
        }
      } else {
        $selector.find('option')[0].attr('selected', true);
        $selector.trigger('change');
      }
    },

    _pushStateToUrl: function() {
      console.log(window.location.host);
      if ( this.status.get('mode') === 'global' ) {
        var href = '/dashboards/' + this.status.get('mode');
      } else {
        var href = '/dashboards/' + this.status.get('mode') + '/' + this.status.get('group');
      }
      history.pushState({}, '', href);
    },

    render: function() {
      this.$el.find('.js--group-selector').html(this.template({
        data: this.collection.toJSON()
      }));

      this.$el.removeClass('is-hidden');

      this._setSelectedGroup();
    }
  });

})(this.App);
