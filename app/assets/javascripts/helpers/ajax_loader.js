(function(App) {

  'use strict';

  App.Helper = App.Helper || {};

  App.Helper.AjaxLoaderView = Backbone.View.extend({

    ajaxStart: function(view){
        $(view).addClass('-loading');
    },

    ajaxComplete: function(view){
        $(view).removeClass('-loading');
    }

  });

})(this.App);
