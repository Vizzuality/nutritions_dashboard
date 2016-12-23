(function(App) {

  'use strict';

  App.Helper = App.Helper || {};

  App.Helper.AjaxLoaderView = Backbone.View.extend({

    initialize: function() {
      console.log('start');
    },

    el: '#ajax-loader',

    ajaxStart: function(){
        console.log('hello');
        $('#ajax-loader').fadeIn({duration:100});
    },

    ajaxComplete: function(){
        $('#ajax-loader').fadeOut({duration:100});
    },

  });

})(this.App);
