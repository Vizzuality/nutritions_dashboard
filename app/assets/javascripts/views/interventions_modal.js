
(function(App) {

  'use strict';

  App.View = App.View || {};

  App.View.InterventionsModalView = App.Helper.Modal.extend({

    id: 'interventions-modal',

    className: 'c-modal',

    template: HandlebarsTemplates['interventions-modal'],

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

      // Render and add it to body
      this.render();
      this.$body.append(this.el);

      // Set listeners and cache
      this.listeners();
    },

    listeners: function() {
      App.Events.on('Interventions:toggle', this.toggle.bind(this));
    },

    render: function() {
      this.$el.html(this.template({}));
    }

  });

})(this.App);
