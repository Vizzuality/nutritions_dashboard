(function(App) {

  'use strict';

  App.View = App.View || {};

  App.View.ChartTitleView = App.View.TitleView.extend({

    template: HandlebarsTemplates['chart_title'],

    render: function() {
      var data = this.collection.toJSON()[0];

      this.$el.html(this.template({
        title: data.title
      }));
    }
  });

})(this.App);
