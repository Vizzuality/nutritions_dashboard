(function(App) {

  'use strict';

  App.View = App.View || {};

  App.View.CountryDonorsView = App.View.Chart.extend({

    initialize: function() {
      this.status = new Backbone.Model({});
      this.model = new App.Model.CountriesModel();

      App.View.CountryDonorsView.__super__.initialize.apply(this);
      this._fetchData().bind(this);
    },

    _fetchData: function() {
      // var params = {
      //   mode: this.status.get('mode'),
      //   group: this.status.get('group')
      // };
      this.model.getDataForCountryDonors().done(function(){
        this.render();
      }.bind(this));
    },

    _drawGraph: function() {
      //convert numerical values from strings to numbers
      var array = $.map(this.model.toJSON(), function(value, index) {
          return [value];
      });
      var data = array.map(function(d){
        d.value = +d['sum'];
        return d;
      });
      console.log(data);

      var diameter = 450, //max size of the bubbles
          color    = this.colors.targets;

      var bubble = d3.layout.pack()
          .sort(null)
          .size([diameter, diameter])
          .padding(1.5);

      var svg = d3.select('#currentCountryDonor .c-chart')
          .html('') //Empty c-chart from previous chart.
          .append('svg')
          .attr('width', diameter)
          .attr('height', diameter)
          .attr('class', 'bubble');

      //bubbles needs very specific format, convert data to this.
      var nodes = bubble.nodes({children:data}).filter(function(d) { return !d.children; });

      //setup the chart
      var bubbles = svg.append('g')
          .attr('transform', 'translate(0,-70)')
          .selectAll('.bubble')
          .data(nodes)
          .enter();

      //create the bubbles
      bubbles.append('circle')
          .attr('r', function(d){ return d.r; })
          .attr('cx', function(d){ return d.x; })
          .attr('cy', function(d){ return d.y; })
          .style('fill', function(d) { return color[d.target]; });

      //format the text for each bubble
      bubbles.append('text')
          .attr('x', function(d){ return d.x; })
          .attr('y', function(d){ return d.y - 15; })
          .attr('text-anchor', 'middle')
          .text(function(d){ return d['target']; })
          .style({
            'fill':'#595755',
            'font-family':'Helvetica Neue, Helvetica, Arial, san-serif',
            'font-size': '16px',
            'font-weight': 700,
            'text-transform': 'uppercase'
          })

      bubbles.append('text')
          .attr('x', function(d){ return d.x; })
          .attr('y', function(d){ return d.y; })
          .attr('text-anchor', 'middle')
          .text(function(d){
            if (d['sum'] > 1000 || d['sum'] < -1000) {
              return '$' + d3.format('.3s')(d['sum']);
            } else {
              return '$' + d3.round(d['sum'], 2);
            }
          })
          .style({
            'fill':'white',
            'font-family':'Helvetica Neue, Helvetica, Arial, san-serif',
            'font-size': '15px',
            'font-weight': 700
          })
    }

  });

})(this.App);
