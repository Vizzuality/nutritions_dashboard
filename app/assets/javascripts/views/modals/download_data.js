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
      var opts = settings && settings.options ? settings.options : {};
      this.options = _.extend({}, this.defaults, opts);

      this.collection = this.options.collection || App.Collection.IndicatorsCollection;
      // Render and add it to body
      this.render();
      this.$body.append(this.el);

      // Set listeners and cache
      this.listeners();
    },

    listeners: function() {
      App.Events.on('Data:toggle', this.toggle.bind(this));
    },

    render: function() {
      this.$el.html(HandlebarsTemplates['modal_download']);
    }

  });

})(this.App);
