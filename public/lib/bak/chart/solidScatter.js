STH.UIChart.prototype.drawsolidScatter = function() {
    var that = this
    //todo  清空 svg中的内容
    d3.select(that.svg)[0][0][0][0].innerHTML = '';
    // 无数据, 不绘图
    if (that.dataset.length < 1) {
        return;
    }

    var r = "6"

    var xScale_data = [d3.min(that.dataset, function(d) {
        return d3.min(d, function(e, j) {

            return e[1];
        })
    }), d3.max(that.dataset, function(d, i) {
        return d3.max(d, function(e, j) {
            return e[1];
        })
    })]

    var yScale_data = [d3.min(that.dataset, function(d) {
        return d3.min(d, function(e, j) {

            return e[2];
        })
    }), d3.max(that.dataset, function(d) {
        return d3.max(d, function(e) {
            return e[2];
        })
    })]

    that.xScale = STH.util.scale(
        "linear",
        xScale_data,
        "range", [0, that.width - that.margin.left - that.margin.right])

    that.yScale = STH.util.scale(
        "linear",
        yScale_data,
        "range", [that.height - that.margin.top - that.margin.bottom, 0])

    that.drawAxis("xAxis", that.xScale, "bottom",
        null, [that.margin.left, that.height - that.margin.bottom])

    that.drawAxis("yAxis", that.yScale, "left",
        null, [that.margin.left, that.margin.top]);

    content = that.svg.append('g')
        .attr("class", "content")
        .attr("transform", "translate(" + that.margin.left + "," + that.margin.top + ")");

   for (var j = 0; j < that.dataset.length; j++) {
      
        content.selectAll(".circle"+j)
            .data(that.dataset[j])
            .enter()
            .append("circle")
            .attr("class", function(d, i) {

                var domObj = d3.select(this)[0][0];
                var textObj = {};

				textObj.parentG = content;

				textObj.x = that.xScale(d[1]);

				textObj.y = that.yScale(d[2]);

				textObj.data = d

				var obj = {
					dom: domObj,
					data: d,
					text: textObj
				}

                STH.util.MY.data(domObj, "data", obj);

                return "mouse-obj";
            })
            .attr("fill", function(d, i) {

                return that.colorset[j];
            })
            .attr("stroke-width", 2)
            .attr("stroke", function(d,i) {

                return that.colorset[j];
            })
            .attr("cx", function(d) {
                return that.xScale(d[1]);
            })
            .attr("cy", function(d) {
                return that.yScale(d[2]);
            })
            .attr("r", 0.01)
            .on("mouseover", function(d, i) {

                d3.select(this)
                    .attr("opacity", 0.4);
                var temp = STH.util.MY.data(d3.select(this)[0][0], "data")

                that.mouseover(temp);
                /*var obj = $(d3.select(this)[0][0]).data("data-mouse");
                        var key = chartJson.data[i]

                        mouseEvent.mouseOver(eval(obj));

                        mouseLink.mouse(key, chartJson.selector);*/

            })
            .on("mouseout", function() {

                d3.select(this)
                    .attr("opacity", 1);
                that.mouseout();
                /*mouseEvent.mouseOut();*/
            })
            .on("click", function(d, i) {
				if (that.linkChart != null && that.linkChart != "undefined") {
					var chart = d3.select(this)[0][0]
					STH.util.clickEvent(chart, that)
				}
            })
            .transition()
            .duration(that.animate)
            .attr("r", r);
    }
	that.hasAxis()
	that.hasMessage()
}
STH.UIChart.prototype.updatesolidScatter = function() {
    //this.drawsolidScatter()
    var that = this
    var r = "6"
    var content = that.svg.select(".content")
    var circles = content.selectAll('circle')
		.data([])
	circlesExit(circles);

    var xScale_data = [d3.min(that.dataset, function(d) {
        return d3.min(d, function(e, j) {

            return e[1];
        })
    }), d3.max(that.dataset, function(d, i) {
        return d3.max(d, function(e, j) {
            return e[1];
        })
    })]

    var yScale_data = [d3.min(that.dataset, function(d) {
        return d3.min(d, function(e, j) {

            return e[2];
        })
    }), d3.max(that.dataset, function(d) {
        return d3.max(d, function(e) {
            return e[2];
        })
    })]

    that.xScale = STH.util.scale(
        "linear",
        xScale_data,
        "range", [0, that.width - that.margin.left - that.margin.right])

    that.yScale = STH.util.scale(
        "linear",
        yScale_data,
        "range", [that.height - that.margin.top - that.margin.bottom, 0])

    that.updateAxis("xAxis", that.xScale, "bottom",
        null, [that.margin.left, that.height - that.margin.bottom])

    that.updateAxis("yAxis", that.yScale, "left",
        null, [that.margin.left, that.margin.top]);

   for (var j = 0; j < that.dataset.length; j++) {

		circles = content.selectAll('.circle'+j)
			.data(that.dataset[j])
		circlesUpdate(circles, j);
		circlesExit(circles, j);
		circlesEnter(circles, j);

	}

	function circlesUpdate(circles, j) {

		circles.transition()
			.duration(that.animate)
			.attr({
				'fill': function(d, i) {
					return that.colorset[j];
				},
				'stroke': function(d, i) {
					return that.colorset[j];
				},
				'stroke-width': 2,
				'cx': function(d) {
					return that.xScale(parseFloat(d[1]));
				},
				'cy': function(d) {
					return that.yScale(parseFloat(d[2]));
				},
				'r': function(d) {
					return r;
				}
			})

		circles.call(commonEvents);
		that.updateMessage();

	}

	function circlesEnter(circles, j) {

		circles.enter()
			.append("circle")
			.attr({
				'fill': function(d, i) {
					return that.colorset[j];
				},
				'stroke': function(d, i) {
					return that.colorset[j];
				},
				'stroke-width': 2,
				'cx': function(d) {
					return that.xScale(parseFloat(d[1]));
				},
				'cy': function(d) {
					return that.yScale(parseFloat(d[2]));
				},
				'r': function(d) {
					return 0;
				}
			})
			.transition()
			.duration(that.animate)
			.attr("r", function(d) {
				return r;
			})
		circles.call(commonEvents)
		that.updateMessage();
	}

	function circlesExit(circles) {
		circles.exit()
			.transition()
			.duration(that.animate)
			.attr("r", function(d) {
				return 0;
			})
			.remove();
	}

	function commonEvents() {
		var circles = this;
		
		circles.attr("class", function(d, i) {
		
				var domObj = d3.select(this)[0][0];
				var textObj = {}

					textObj.parentG = content;

					textObj.x = that.xScale(parseFloat(d[1]));

					textObj.y = that.yScale(parseFloat(d[2]));

					textObj.data = d

					var obj = {
						dom: domObj,
						data: d,
						text: textObj
					}

				STH.util.MY.data(domObj, "data", obj);

				return "mouse-obj";
			})
			.on("mouseover", function(d, i) {

				d3.select(this)
					.attr("opacity", 0.4);
				var temp = STH.util.MY.data(d3.select(this)[0][0], "data")

				that.mouseover(temp);
				/*var obj = $(d3.select(this)[0][0]).data("data-mouse");
				    var key = chartJson.data[i]

				    mouseEvent.mouseOver(eval(obj));

				    mouseLink.mouse(key, chartJson.selector);*/

			})
			.on("mouseout", function() {

				d3.select(this)
					.attr("opacity", 1);
				that.mouseout();
				/*mouseEvent.mouseOut();*/
			})
			.on("click", function(d, i) {
				if (that.linkChart != null && that.linkChart != "undefined") {
					var chart = d3.select(this)[0][0]
					STH.util.clickEvent(chart, that)
				}

			})

	}
   
}