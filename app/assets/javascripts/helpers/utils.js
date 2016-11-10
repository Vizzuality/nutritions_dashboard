(function(App) {

  'use strict';

  App.Helper = App.Helper || {};

  /**
   * Helper function to correctly set up the prototype chain for subclasses.
   * Similar to `goog.inherits`, but uses a hash of prototype properties and
   * class properties to be extended.
   * @param {Object} attributes
  */

  $.fn.serializeObject = function(){
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
      if (o[this.name] !== undefined) {
        if (!o[this.name].push) {
          o[this.name] = [o[this.name]];
        }
        o[this.name].push(this.value || '');
      } else {
        o[this.name] = this.value || '';
      }
    });
    return o;
  };

  App.Helper.Utils = {

    format: function() {
      var str = arguments[0],
          len = arguments.length+1,
          safe, arg;

      for (var i = 1; i < len; arg = arguments[i++]) {
        safe = typeof arg === 'object' ? JSON.stringify(arg) : arg;
        str = str.replace(RegExp('\\{'+(i-2)+'\\}', 'g'), safe);
      }

      return str;
    }
  }

})(this.App);
