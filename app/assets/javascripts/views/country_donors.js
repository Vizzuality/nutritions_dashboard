(function(App) {

  'use strict';

  App.View = App.View || {};

  App.View.CountryDonorsView = App.View.Chart.extend({

    defaults: {
      diameter: 1080,
      padding: 1.5,
      threshold: 1000
    },

    initialize: function() {
      this.status = new Backbone.Model({});
      this.model = new App.Model.CountriesModel();

      App.View.CountryDonorsView.__super__.initialize.apply(this);
    },

    _addListeners: function() {
      //Internal
      this.status.on('change:iso', this._fetchData.bind(this));

      //External
      App.Events.on('country:selected', this._setStatus.bind(this))
    },

    _fetchData: function() {
      var params = {
        iso: this.status.get('iso')
      };

      this.model.getDataForCountryDonors(params).done(function(){
        this.render();
      }.bind(this));
    },

    _drawGraph: function() {
      //convert numerical values from strings to numbers
      var array = $.map(this.model.toJSON(), function(value, index) {
          return [value];
      });
      var data = array.map(function(d){
        d.value = +d['cost'];
        return d;
      });

      var color = this.colors.targets,
          screenWidth = $(document).width(),
          scale = screenWidth <= 768 ? 1.2 : 0.8,
          svgWidth = screenWidth <= 768 ? 768 : 1080,
          svgHeight = screenWidth <= 768 ? 1580 : 580;

      var bubble = d3.layout.pack()
          .sort(null)
          .size([this.defaults.diameter, this.defaults.diameter])
          .padding(this.defaults.padding);

      var svg = d3.select('#currentCountryDonor .c-chart')
          .html('') //Empty c-chart from previous chart.
          .append('svg')
          .attr('viewBox', '0 0 ' + svgWidth + ' ' + svgHeight)
          .attr('preserveAspectRatio', "xMidYMid meet")
          .attr('class', 'bubble');

      //bubbles needs very specific format, convert data to this.
      var nodes = bubble.nodes({children:data}).filter(function(d) { return !d.children; });

      //setup the chart
      var bubbles = svg.append('g')
          .attr('transform', 'translate(0,0)')
          .selectAll('.bubble')
          .data(nodes)
          .enter()
          .append("g")
          .attr("transform", function(d, i) {
             var x = d.x * scale;
             var y = (d.y * scale) - 100;
             // Set d.x and d.y here so that other elements can use it. d is
             // expected to be an object here.
             if ( d['target'] === 'Composite' ) {
               if ( screenWidth <= 768 ) {
                 x = svgWidth/2;
                 y = svgHeight - d.r*scale - 50;
               } else {
                 x += 170;
                 y -= 120;
               }
               return "translate(" + x + "," + y + ")";
             } else {
               return "translate(" + x + "," + y + ")";
             }
         });

      //create the bubbles
      bubbles.append('circle')
          .attr('r', function(d){ return d.r * scale; })
          .style('fill', function(d) { return color[d.target]; });

      //format the text for each bubble
      bubbles.append('text')
          .attr('text-anchor', 'middle')
          .attr('class', 'bubble-text')
          .html(function(d){
            // return d['target'];
            if (d['cost'] > this.defaults.threshold || d['cost'] < -this.defaults.threshold) {
              var sum = '$' + d3.format('.3s')(d['cost']);
            } else {
              var sum = '$' + d3.round(d['cost'], 2);
            }
            if ( d['target'] === 'Exclusive breastfeeding' ) {
              var text = '<tspan dy="-10">EVB</tspan><tspan x="0" dy="25">' + sum + '<tspan>';
              return text;
            } else {
              var text = '<tspan dy="-10">' + d['target'] + '</tspan><tspan x="0" dy="25">' + sum + '<tspan>';
              return text;
            }
          }.bind(this))
    }

  });

})(this.App);
