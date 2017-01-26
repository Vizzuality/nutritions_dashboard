(function(App) {

  'use strict';

  /**
   * Backbone way to create a Class
   * @param {Object} options
   */
  var Controller = function(options) {
    _.extend(this, options);
    this._instanceCommonViews();
    this.initialize.apply(this, arguments);
  };

  _.extend(Controller.prototype, Backbone.Events, {});

  Controller.extend = Backbone.Router.extend;

  /**
   * Page Controller Class
   */
  App.Controller = App.Controller || {};

  App.Controller.Page = Controller.extend({

    initialize: function() {
      var mobileMenuView = new App.View.MobileMenu();
      var smoothScroll = new App.Helper.SmoothScrollView();
      var actionClick = new App.Helper.ActionClick();
      var shareModal = new App.View.ShareModalView();
      this.mobileCheck = new App.Helper.MobileCheck();
    },

    /**
     * Instance common and global view here
     * @return {[type]} [description]
     */
    _instanceCommonViews: function() {
      // new App.View.Modal({ el: '#modalView' });
    }

  });


})(this.App);
