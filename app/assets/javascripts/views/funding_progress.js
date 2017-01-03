(function(App) {

  'use strict';

  App.View = App.View || {};

  App.View.FundingProgressView = App.View.Chart.extend({

    events: {
      'change .js--target-selector' : '_onChangeSetTarget'
    },

    initialize: function() {
      this.status = new Backbone.Model({
        target: 'stunting'
      });
      this.model = new App.Model.FundingProgressModel();

      this._fetchData();
      this._addListeners();

      App.View.FundingProgressView.__super__.initialize.apply(this);
    },

    _fetchData: function() {
      var params = {
        target: this.status.get('target')
      };

      this.model.getFundingProgress(params).done(function(){
        this.render();
      }.bind(this));
    },

    _addListeners: function() {
      this.status.on('change:target', this._fetchData.bind(this));
    },

    _onChangeSetTarget: function() {
      var target = this.$el.find('.js--target-selector').val();
      this.status.set({ 'target': target });
    },

    _round: function(num) {
      var len=(num+'').length;
      var fac=Math.pow(10,len-1);
      return Math.ceil(num/fac)*fac;
    },

    _scaleValue: function(num, width, max) {
      return (num/max)*width;
    },

    _drawGraph: function() {
      var data = this.model.toJSON()[0],
          xMin = 0,
          yMax = 0,
          yMin = 100,
          height = 100,
          width = 1080,
          padding = 20,
          xMax = this._round(data.total);

      var scaledData = {};
      _.each(data, function (value, index){
        if ( index.indexOf("year_") !== -1 ) {
          var year = index.replace('year_', '');
          scaledData[year] = this._scaleValue(value, width, xMax) - 5;
        }
      }.bind(this));
      var compData = {};
      var comp = 0;
      _.each(scaledData, function(value, index) {
        compData[index] = value + comp;
        comp = compData[index];
      })

      var currentSpent = scaledData['2015'],
          milestone = scaledData['2016'];

      //Create the SVG Viewport
      var svgContainer = d3.select("#fundingProgressView")
        .html('')
        .append("svg")
        .attr('viewBox', '0 0 ' + width + ' ' + height)
        .attr('preserveAspectRatio', "xMidYMid meet")

      //Create the Scale we will use for the Axis
      var xScale = d3.scale.linear()
        .domain([xMin, xMax])
        .range([padding, width - padding]);

      //Create the Axis
      var xAxis = d3.svg.axis()
        .scale(xScale)
        .tickPadding(10)
        .tickFormat(function(d){
          var text = '$' + d3.format('.2s')(d);
          text = text.replace("G", "B");
          return text;
        });

      //Create an SVG group Element for the Axis elements and call the xAxis function
      var xAxisGroup = svgContainer.append("g")
        .attr('class', 'axis')
        .attr("transform", "translate(" + 0 + "," + 70 + ")")
        .attr("height", 10)
        .call(xAxis);

      svgContainer.append("rect")
        .attr("x", 0)
        .attr("y", 70)
        .attr("width", width)
        .attr("height", 1)
        .attr("class", "base-axis");

      svgContainer.append("rect")
        .attr("x", 0)
        .attr("y", 70)
        .attr("width", currentSpent)
        .attr("height", 1)
        .attr("class", "current-axis");

      // plot mile stones
      _.each(compData, function(year, index) {
        if ( index >= 2018 ) {
          svgContainer.append("path")
          .attr("transform", function(d) { return "translate(" + (year + 25) + "," + 60 + ")"; }.bind(this))
          .attr("d", d3.svg.symbol().type("triangle-down").size( function(d) { return 25 }))
          .attr("class", "triangle");

          svgContainer.append("text")
          .text(function(d){
            var text = index;
            return text;
          }.bind(this))
          .attr("x", year + 1)
          .attr("y", 40)
          .attr("class", "text -milestone");

          svgContainer.append("text")
          .text('milestone')
          .attr("x", year - 26)
          .attr("y", 52)
          .attr("class", "text -milestone");
        }
      });

      svgContainer.append("text")
        .text("currently spent")
        .attr("x", currentSpent)
        .attr("y", 20)
        .attr("class", "text -funding");

      svgContainer.append("path")
        .attr("transform", function(d) { return "translate(" + (currentSpent + 5) + "," + 60 + ")"; })
        .attr("d", d3.svg.symbol().type("triangle-down").size( function(d) { return 25 }))
        .attr("class", "triangle");

      svgContainer.append("text")
        .text(function(d){
          var text = '$' + d3.format('.3s')(data.year_2015);
          text = text.replace("G", "B");
          return text;
        })
        .attr("x", currentSpent)
        .attr("y", 45)
        .attr("class", "text -figure");
    }

  });

})(this.App);
