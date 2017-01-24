(function(App) {

  'use strict';

  App.View = App.View || {};

  App.View.DownloadDataView = App.Helper.Modal.extend({

    id: 'data-modal',

    className: 'c-modal',

    events: function(){
      return _.extend({}, App.Helper.Modal.prototype.events,{
      });
    },

    initialize: function(settings) {
      // Initialize parent
      this.constructor.__super__.initialize.apply(this);

      // Options
      this.settings = settings;
      var opts = settings && settings.options ? settings.options : {};
      this.options = _.extend({}, this.defaults, opts);

      this.collection = settings.collection;
      this.status = new Backbone.Model({});

      this.render();
      this.$body.append(this.el);
      this.listeners();
    },

    listeners: function() {
      App.Events.on('Data:toggle', this.toggle.bind(this));
      this.status.on('change:' + this.settings.trigger + '', this._getQueries.bind(this));

      //External
      App.Events.on('country:selected', this.setStatus.bind(this));
      App.Events.on('group:selected', this.setStatus.bind(this));
    },

    setStatus: function(params) {
      this.status.set(params);
    },

    _getQueries: function() {
      console.log('hola');
      var selectors = {};
      this.settings.selectors.map(function(selector) {
        selectors[selector] = this.status.get(selector);
      }.bind(this));
      this.queries = this.collection.getCSV({
        selectors: selectors,
        graphs: this.settings.graphs
      });
      this._setLinks();
    },

    _setLinks: function() {
      this.modalWindow = this.$el.find('.c-download');
      this.modalWindow.html(HandlebarsTemplates['download_links']({
        data: this.queries
      }));
    },

    render: function() {
      this.$el.html(HandlebarsTemplates['modal_download']);
    }

  });

})(this.App);
