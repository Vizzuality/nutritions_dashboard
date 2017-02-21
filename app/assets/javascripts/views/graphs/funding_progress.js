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
      this.listenTo(this.status, 'change:target', this._fetchData.bind(this));
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
          screenWidth = $(document).width(),
          xMin = 0,
          yMax = 0,
          yMin = 100,
          height = 200,
          width = screenWidth >= 768 ? 1080 : 500,
          padding = 20,
          xMax = this.status.get('target') === 'wasting' ? 16000000000 : this._round(data.total);

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
      // var xAxis = d3.svg.axis()
      //   .scale(xScale)
      //   .tickPadding(10)
      //   .tickFormat(function(d){
      //     var text = '$' + d3.format('.2s')(d);
      //     text = text.replace("G", "B");
      //     return text;
      //   });

      //Create an SVG group Element for the Axis elements and call the xAxis function
      var xAxisGroup = svgContainer.append("g")
        .attr('class', 'axis')
        .attr("transform", "translate(" + 0 + "," + (height-20) + ")")
        .attr("height", 10)
        // .call(xAxis);

      svgContainer.append("rect")
        .attr("x", 0)
        .attr("y", height-20)
        .attr("width", width)
        .attr("height", 1)
        .attr("class", "base-axis");

      svgContainer.append("rect")
        .attr("x", 0)
        .attr("y", height-20)
        .attr("width", currentSpent)
        .attr("height", 1)
        .attr("class", "current-axis");

      this._plotMilestones = function(year, index){
        var yearTextOffset = screenWidth >= 768 ? year + 1 : year - 8;
        var milestoneTextOffset = screenWidth >= 768 ? year - 10 : year - 43;

        svgContainer.append("line")
          .attr("x1", year)
          .attr("y1", height-15)
          .attr("x2", year)
          .attr("y2", height-25)
          .attr("data-tooltip", "milestone-" + year.toFixed(0))
          .attr("class", function() {
            var classes;
            if (year < currentSpent) {
              classes =  "milestone -achieved"
            } else {
              classes = "milestone"
            }
            return classes;
          }.bind(this));

        svgContainer.append("text")
          .text(function(){
            var text = index;
            return text;
          }.bind(this))
          .attr("x", milestoneTextOffset)
          .attr("y", height)
          .attr('preserveAspectRatio', 'none')
          .attr("class", "text -milestone")
          .attr("data-tooltip", "milestone-" + year.toFixed(0))

        svgContainer.append("rect")
          .attr("x", year-20)
          .attr("y", height-100)
          .attr("width", 40)
          .attr("height", 100)
          .attr("class", "clickable-area")
          .attr("data-tooltip", "milestone-" + year.toFixed(0))
          .on("mouseover", function() {
            $(this).addClass('is-current');
            this.currentTooltip = $(this).data('tooltip');
            $('#' + this.currentTooltip).removeClass('is-hidden');
          })
          .on('mouseout', function() {
            $(this).removeClass('is-current');
            $('#' + this.currentTooltip).addClass('is-hidden');
          });

        var g = svgContainer
          .append("g")
          .attr("class", "progress-line-tooltip is-hidden")
          .attr("id", "milestone-" + year.toFixed(0))

          g.append("rect")
            .attr("x", year-30)
            .attr("y", height-50)
            .attr("rx", 5)
            .attr("ry", 5)
            .attr("width", 60)
            .attr("height", 25);

          g.append("text")
            .text(function(){
              var text = '$' + d3.format('.3s')(year);
              text = text.replace("G", "B");
              return text;
            })
            .attr("x", year-19)
            .attr("y", height-32)
      }

      // plot milestones
      _.each(compData, function(year, index) {
        this._plotMilestones(year, index);
      }.bind(this));

      svgContainer.append("text")
        .text("currently spent")
        .attr("x", currentSpent+5)
        .attr("y", 55)
        .attr('preserveAspectRatio', 'none')
        .attr("class", "text -funding");

      svgContainer.append("text")
        .attr("class", "current-spend-value")
        .text(function(d){
          var text = '$' + d3.format('.3s')(data.year_2015);
          text = text.replace("G", "B");
          return text;
        })
        .attr("x", currentSpent+5)
        .attr("y", 75)
        .attr('preserveAspectRatio', 'none')
        .attr("class", "text -figure");

      svgContainer
        .append("line")
        .attr("x1", currentSpent)
        .attr("y1", 50)
        .attr("x2", currentSpent)
        .attr("y2", height-20)
        .attr("class", "dashed-line");

      svgContainer
        .append("circle")
        .attr("cx", currentSpent)
        .attr("cy", 0)
        .attr("r", 8)
        .attr("transform", function(d) { return "translate(0,"+ (height-20) +")"; })
        .attr("class", "circle");
    }

  });

})(this.App);
