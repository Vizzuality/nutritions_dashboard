(function(App) {

  'use strict';

  App.View = App.View || {};

  App.View.AdditionalInfoView = App.View.TitleView.extend({

    template: HandlebarsTemplates['additional_info'],

    render: function() {
      var data = this.collection.toJSON()[0];

      this.$el.html(this.template({
        title: data.title
      }));
    }
  });

})(this.App);
