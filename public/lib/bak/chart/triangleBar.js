STH.UIChart.prototype.drawtriangleBar = function() {
    var that = this
        //todo  清空 svg中的内容
    d3.select(that.svg)[0][0][0][0].innerHTML = '';
    // 无数据, 不绘图
    if (that.dataset.length < 1) {
        return;
    }

    var xScale_data = [];

    that.dataset.forEach(function(d, i) {
        xScale_data.push(d[0]);
    })

    var hScale_data = [0, d3.max(that.dataset, function(d) {
        return d[1];
    })]

    var yScale_data = [0, d3.max(that.dataset, function(d) {
        return d[1];
    })]

    that.xScale = STH.util.scale(
        "ordinal",
        d3.range(that.dataset.length),
        "rangeBands", [0, that.width - that.margin.left - that.margin.right], 0.5);

    that.hScale = STH.util.scale(
        "linear",
        hScale_data,
        "range", [0, that.height - that.margin.top - that.margin.bottom])

    that.yScale = STH.util.scale(
        "linear",
        yScale_data,
        "range", [that.height - that.margin.top - that.margin.bottom, 0])

    that.drawAxis("xAxis", that.xScale, "bottom",
        xScale_data, [that.margin.left, that.height - that.margin.bottom])

    that.drawAxis("yAxis", that.yScale, "left",
        null, [that.margin.left, that.margin.top]);

    var content = that.svg.append("g")
        .attr("class", "content")
        .attr("transform", "translate(" + that.margin.left + ", " + that.margin.top + ")");

    content.selectAll("polygon")
        .data(that.dataset)
        .enter()
        .append("polygon")
        .attr("fill", function(d, i) {
            return that.colorset[i]
        })
        .attr("points", function(d, i) {
            return (that.xScale(i)) + "," +
                (that.height - that.margin.bottom - that.margin.top) + " " +
                (that.xScale(i) + that.xScale.rangeBand()) + "," +
                (that.height - that.margin.bottom - that.margin.top) + " " +
                (that.xScale(i) + that.xScale.rangeBand() / 2) + "," +
                (that.height - that.margin.bottom - that.margin.top)
        })

    .attr("class", function(d, i) {

            var domObj = d3.select(this)[0][0];

            var textObj = {};

			var dB = STH.util.getBLen((d[1]+"").replace(".", "")) * 13 / 2;

			textObj.parentG = content;

			textObj.x =  that.xScale(i) + that.xScale.rangeBand() / 2 - dB

			textObj.y = that.height - that.hScale(d[1]) -that.margin.bottom - that.margin.top - 5;

			textObj.data = d[1]

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
        .transition()
        .duration(that.animate)
        .attr("points", function(d, i) {
            return (that.xScale(i)) + "," +
                (that.height - that.margin.bottom - that.margin.top) + " " +
                (that.xScale(i) + that.xScale.rangeBand()) + "," +
                (that.height - that.margin.bottom - that.margin.top) + " " +
                (that.xScale(i) + that.xScale.rangeBand() / 2) + "," +
                (that.height - that.hScale(d[1]) - that.margin.bottom - that.margin.top)
        });

    that.hasAxis()
	that.hasMessage()
}
STH.UIChart.prototype.updatetriangleBar = function() {

    var that = this;

    // 无数据, 不绘图
    if (that.dataset.length < 1) {
        return;
    }

    var xScale_data = [];

    that.dataset.forEach(function(d, i) {
        xScale_data.push(d[0]);
    })

    var hScale_data = [0, d3.max(that.dataset, function(d) {
        return d[1];
    })];

    var yScale_data = [0, d3.max(that.dataset, function(d) {
        return d[1];
    })];

    that.xScale = STH.util.scale(
        "ordinal", d3.range(that.dataset.length),
        "rangeBands", [0, that.width - that.margin.left - that.margin.right],
        0.5);

    that.hScale = STH.util.scale(
        "linear",
        hScale_data,
        "range", [0, that.height - that.margin.top - that.margin.bottom]);

    that.yScale = STH.util.scale(
        "linear",
        yScale_data,
        "range", [that.height - that.margin.top - that.margin.bottom, 0]);

    that.updateAxis("xAxis", that.xScale, "bottom",
        xScale_data, [that.margin.left, that.height - that.margin.bottom]);

    that.updateAxis("yAxis", that.yScale, "left",
        null, [that.margin.left, that.margin.top]);

    var content = that.svg.select(".content");

    polygon = content.selectAll("polygon")
        .data(that.dataset)

    polygon.enter()
        .append("polygon")
        .attr("fill", function(d, i) {
            return that.colorset[i]
        })
        .attr("points", function(d, i) {
            return (that.xScale(i)) + "," +
                (that.height - that.margin.bottom - that.margin.top) + " " +
                (that.xScale(i) + that.xScale.rangeBand()) + "," +
                (that.height - that.margin.bottom - that.margin.top) + " " +
                (that.xScale(i) + that.xScale.rangeBand() / 2) + "," +
                (that.height - that.margin.bottom - that.margin.top)
        })
        .transition()
        .duration(that.animate)
        .attr("points", function(d, i) {
            return (that.xScale(i)) + "," +
                (that.height - that.margin.bottom - that.margin.top) + " " +
                (that.xScale(i) + that.xScale.rangeBand()) + "," +
                (that.height - that.margin.bottom - that.margin.top) + " " +
                (that.xScale(i) + that.xScale.rangeBand() / 2) + "," +
                (that.height - that.hScale(d[1]) - that.margin.bottom - that.margin.top)
        });
      
    polygon.exit()
        .transition()
        .duration(that.animate)
        .attr("points", function(d, i) {
            return (that.xScale(i)) + "," +
                (that.height - that.margin.bottom - that.margin.top) + " " +
                (that.xScale(i) + that.xScale.rangeBand()) + "," +
                (that.height - that.margin.bottom - that.margin.top) + " " +
                (that.xScale(i) + that.xScale.rangeBand() / 2) + "," +
                (that.height - that.margin.bottom - that.margin.top)
        });
     
    polygon.transition()
        .duration(that.animate)
        .attr("fill", function(d, i) {
            return that.colorset[i]
        })
        .attr("points", function(d, i) {
            return (that.xScale(i)) + "," +
                (that.height - that.margin.bottom - that.margin.top) + " " +
                (that.xScale(i) + that.xScale.rangeBand()) + "," +
                (that.height - that.margin.bottom - that.margin.top) + " " +
                (that.xScale(i) + that.xScale.rangeBand() / 2) + "," +
                (that.height - that.hScale(d[1]) - that.margin.bottom - that.margin.top)
        });

    polygon.call(commonEvent);
    
    function commonEvent() {
        polygon.attr("class", function(d, i) {
                var domObj = d3.select(this)[0][0];

                var textObj = {};

				var dB = STH.util.getBLen((d[1]+"").replace(".", "")) * 13 / 2;

				textObj.parentG = content;

				textObj.x =  that.xScale(i) + that.xScale.rangeBand() / 2 - dB
				
				textObj.y = that.height - that.hScale(d[1]) -that.margin.bottom - that.margin.top - 5;

				textObj.data = d[1]

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

    that.updateMessage()

}