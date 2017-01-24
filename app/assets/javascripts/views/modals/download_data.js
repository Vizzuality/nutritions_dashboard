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

      this.collection = settings.collection;
      this.status = new Backbone.Model({});

      this.render();
      this.$body.append(this.el);
      this.listeners();
    },

    listeners: function() {
      App.Events.on('Data:toggle', this.toggle.bind(this));
      this.status.on('change:group', this._getQueries.bind(this));

      //External
      App.Events.on('group:selected', this.setStatus.bind(this));
    },

    setStatus: function(params) {
      this.status.set(params);
    },

    _getQueries: function() {
      this.queries = this.collection.getCSV({
        mode: this.status.get('mode'),
        group: this.status.get('group'),
        graphs: ['current_burden', 'cost_meeting_targets', 'cost_packages', 'scenario_comparison']
      });
      this._setLinks();
    },

    _setLinks: function() {
      this.modalWindow = this.$el.find('.c-download');
      this.modalWindow.html(HandlebarsTemplates['download_links']({
        current_burden: this.queries.current_burden,
        cost_meeting_targets: this.queries.cost_meeting_targets,
        cost_packages: this.queries.cost_packages,
        scenario_comparison: this.queries.scenario_comparison
      }));
    },

    render: function() {
      this.$el.html(HandlebarsTemplates['modal_download']);
    }

  });

})(this.App);
