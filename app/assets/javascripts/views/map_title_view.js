(function(App) {

  'use strict';

  App.View = App.View || {};

  App.View.MapTitleView = App.View.TitleView.extend({

    template: HandlebarsTemplates['map_title'],

    render: function() {
      var data = this.collection.toJSON()[0];

      this.$el.html(this.template({
        description: data.description
      }));
    }
  });

})(this.App);
