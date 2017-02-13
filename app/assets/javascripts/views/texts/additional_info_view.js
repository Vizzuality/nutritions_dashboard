(function(App) {

  'use strict';

  App.View = App.View || {};

  App.View.AdditionalInfoView = App.View.TitleView.extend({

    template: HandlebarsTemplates['additional_info'],

    render: function() {
      var data = this.collection.toJSON()[0];
      var title;
      if ( data.group_name === 'global' ) {
        title = 'the world';
      } else if ( data.title.indexOf('countries') !== -1 ) {
        title = (data.title).toLowerCase();
      } else {
        title = 'the ' + data.title + ' region';
      }
      this.$el.find('.text').html(this.template({
        title: title
      }));
    }
  });

})(this.App);
