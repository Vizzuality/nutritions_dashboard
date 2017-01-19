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
        el: '.-stunting',
        offset: 28
      });

      this.wasting = new App.View.AccordionView({
        el: '.-wasting',
        offset: 0
      });

      this.anemia = new App.View.AccordionView({
        el: '.-anemia',
        offset: 0
      });

      this.breastfeeding = new App.View.AccordionView({
        el: '.-breastfeeding',
        offset: 28
      })
    }

  });
})(this.App);
