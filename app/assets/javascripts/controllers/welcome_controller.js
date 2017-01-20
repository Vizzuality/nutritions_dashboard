(function(App) {

  'use strict';

  App.Controller = App.Controller || {};

  App.Controller.Welcome = App.Controller.Page.extend({

    index: function() {
      this.map = new App.View.MapHomeView({
        el: '#homeMapView'
      });

      this.progress = new App.View.FundingProgressView({
        el: '#homeMapView'
      });

      this.stunting = new App.View.AccordionView({
        el: '.-stunting'
      });

      this.wasting = new App.View.AccordionView({
        el: '.-wasting'
      });

      this.anemia = new App.View.AccordionView({
        el: '.-anemia'
      });

      this.breastfeeding = new App.View.AccordionView({
        el: '.-breastfeeding'
      })
    }

  });
})(this.App);
