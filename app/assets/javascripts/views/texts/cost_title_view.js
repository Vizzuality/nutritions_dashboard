(function(App) {

  'use strict';

  App.View = App.View || {};

  App.View.CostTitleView = App.View.TitleView.extend({

    template: HandlebarsTemplates['cost_title'],

    render: function() {
      var data = this.collection.toJSON()[0];
      var title;
      var cost;
      var sum = 0;
      if ( data.group_name === 'global' ) {
        var dataGlobal = this.collection.toJSON();
        title = 'the world';
        dataGlobal.forEach(function (data){
          sum += data.sum
        });
      } else if ( data.title.indexOf('countries') !== -1 ) {
        title = 'the ' + data.title;
        sum = data.sum;
      } else {
        title = 'the ' + data.title + ' region';
        sum = data.sum;
      }
      cost = '$' + d3.format('.3s')(sum);
      cost = cost.replace("G", "B");
      this.$el.html(this.template({
        title: title,
        cost: cost
      }));
    }
  });

})(this.App);
