(function(App) {

  'use strict';

  App.View = App.View || {};

  App.View.ChartTitleView = App.View.TitleView.extend({

    template: HandlebarsTemplates['chart_title'],

    render: function() {
      var data = this.collection.toJSON()[0];
      var title;
      if ( data.group_name === 'global' ) {
        title = 'the world';
      } else if ( data.title.indexOf('countries') !== -1 ) {
        title = 'the ' + data.title;
      } else {
        title = 'the ' + data.title + ' region';
      }
      this.$el.html(this.template({
        title: title
      }));
    }
  });

})(this.App);
