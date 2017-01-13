(function(App) {

  'use strict';

  App.View = App.View || {};

  App.View.CurrentDonorFundingTextView = App.View.CountryDonorsView.extend({

    template: HandlebarsTemplates['current_donor_funding_text'],

    initialize: function() {
      App.View.CurrentDonorFundingTextView.__super__.initialize.apply(this);
    },


  });

})(this.App);
