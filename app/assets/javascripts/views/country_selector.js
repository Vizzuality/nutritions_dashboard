(function(App) {

  'use strict';

  App.View = App.View || {};

  App.View.CountrySelectorView = Backbone.View.extend({

    template: HandlebarsTemplates['country-selector'],

    events: {
      'change .js--country-selector' : '_onChangeSetCountry'
    },

    initialize: function() {
      this.status = new Backbone.Model();

      this.collection = new App.Collection.CountriesCollection();
      this._setListeners();

      this._fetchData();
    },

    setParams: function(params) {
      this.status.set(params);
    },

    _setListeners: function() {
      this.status.on('change:country', this._triggerSelectedCountry.bind(this));
    },

    _onChangeSetCountry: function() {
      var country = this.$el.find('.js--country-selector').val();
      this.status.set({ 'country': country });
    },

    _fetchData: function() {
      this.collection.getCountries().done(function(){
        this.render();
      }.bind(this));
    },

    _updateStatusMode: function(mode) {
      this.status.set(mode);
    },

    _triggerSelectedCountry: function() {
      App.Events.trigger('country:selected', {
        country: this.status.get('country')
      });
    },

    _setSelectedGroup: function() {
      var valueFromParams = this.status.get('country');
      var $selector = this.$el.find('.js--country-selector');
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

    render: function() {
      this.$el.find('.js--country-selector').html(this.template({
        data: this.collection.toJSON()
      }));

      // this._setSelectedGroup();
    }
  });

})(this.App);
