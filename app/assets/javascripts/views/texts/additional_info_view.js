(function(App) {

  'use strict';

  App.View = App.View || {};

  App.View.AdditionalInfoView = App.View.TitleView.extend({

    template: HandlebarsTemplates['additional_info'],

    render: function() {
      var data = this.collection.toJSON()[0];
      var title;
      if ( data.group_name === 'global' ) {
        title = 'everyone does their part';
      } else if ( data.title.indexOf('countries') !== -1 ) {
        title = '<strong>' + (data.title).toLowerCase() + '</strong> and others worldwide do their part';
      } else {
        title = 'the <strong>' + data.title + '</strong> region and others worldwide do their part';
      }
      this.$el.find('.text').html(this.template({
        title: title
      }));
    }
  });

})(this.App);
