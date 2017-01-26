(function(App) {

  'use strict';

  App.View = App.View || {};

  App.View.CostMeetingTargetsView = App.View.Chart.extend({

    defaults: {
      diameter: 1080,
      padding: 1.5,
      threshold: 1000
    },

    initialize: function() {
      this.status = new Backbone.Model({});
      this.collection = new App.Collection.IndicatorsCollection();

      App.View.CostMeetingTargetsView.__super__.initialize.apply(this);
    },

    _fetchData: function() {
      this.ajaxStart('#costGoalsSection');
      var params = {
        mode: this.status.get('mode'),
        group: this.status.get('group')
      };

      this.collection.getDataForCostMeetingPackages(params).done(function(){
        this.render();
        this.ajaxComplete('#costGoalsSection');
      }.bind(this));
    },

    _drawGraph: function() {
      //convert numerical values from strings to numbers
      var data = this.collection.toJSON().map(function(d){
        d.value = +d['cost'];
        return d;
      });

      var color = this.colors.targets,
          screenWidth = $(document).width(),
          scale = screenWidth <= 768 ? 1.2 : 0.75,
          svgWidth = screenWidth <= 768 ? 768 : 1080,
          svgHeight = screenWidth <= 768 ? 1580 : 580,
          svgFixedWidth = $(window).width() >= 1080 ? '1080' : '100%',
          svgFixedheight = $(window).width() >= 1080 ? '560' : '100%';

      var bubble = d3.layout.pack()
          .sort(null)
          .size([this.defaults.diameter, this.defaults.diameter])
          .padding(this.defaults.padding);

      var svg = d3.select('#costMeetingPackagesView .c-chart')
          .html('') //Empty c-chart from previous chart.
          .append('svg')
          .attr('width', svgFixedWidth)
          .attr('height', svgFixedheight)
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
          .attr('preserveAspectRatio', 'none')
          .attr("dy", "-5")
          .text(function(d){
            var text = d['target'];
            return text;
          }.bind(this))

      //format the text for each bubble
      bubbles.append('text')
          .attr('text-anchor', 'middle')
          .attr('class', 'bubble-text')
          .attr('preserveAspectRatio', 'none')
          .attr("dy", "18")
          .text(function(d){
            if (d['cost'] > this.defaults.threshold || d['cost'] < -this.defaults.threshold) {
              var cost = '$' + d3.format('.3s')(d['cost']);
              cost = cost.replace("G", "B");
            } else {
              var cost = '$' + d3.round(d['cost'], 2);
            }
            var text = cost;
            return text;
          }.bind(this))
    }

  });

})(this.App);
