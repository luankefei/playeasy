STH.UIChart.prototype.drawcardinalLine = function() {
	var that = this;
	d3.select(that.svg)[0][0][0][0].innerHTML = '';
	if (that.dataset.length == 0 || that.dataset[0].length == 0) {
		return false;
	}
	
	var dataset = []
	var xAxis_data = [];
	var yAxis_data = [];
	var yAscale_data = [];
	var date = new Date();
	date = date.getTime();
	var lineWidth = "2px"
	var radius = "3"
	STH.util.clearZero(that.dataset,dataset)
	for (var i = 0; i < dataset[0].length; i++) {
		for (var j = 0; j < dataset.length; j++) {
			for (var q = 0; q < dataset[0].length; q++) {
				if (xAxis_data.indexOf(dataset[j][i][1]) == -1 && dataset[j][i][1] !== 0) {
					xAxis_data.push(dataset[j][i][1]);
				}
			}
		}
	}


	yAxis_data = [d3.max(dataset, function(d) {
		return d3.max(d, function(e) {
			return e[2]
		})
	}), 0]

	yAscale_data = yAxis_data.reverse()

	that.xScale = STH.util.scale(
		"ordinal",
		d3.range(xAxis_data.length),
		"rangePoints", [0, that.width - that.margin.right - that.margin.left],
		0
	);

	that.yScale = STH.util.scale(

		"linear",
		yAxis_data,
		"range", [that.height - that.margin.top - that.margin.bottom, 0]

	)

	that.yAscale = STH.util.scale(

		"linear",
		yAscale_data,
		"range", [that.height - that.margin.top - that.margin.bottom, 0]

	)

	that.drawAxis("xAxis", that.xScale, "bottom",
		xAxis_data, [that.margin.left, that.height - that.margin.bottom])

	that.drawAxis("yAxis", that.yAscale, "left",
		null, [that.margin.left, that.margin.top])

	that.hasAxis()

	var valueline = d3.svg.line()
		.interpolate("cardinal")
		.x(function(d, i) {
			return that.xScale(i) /*+xScale.rangeBand()*0.5*/ ;
		})
		.y(function(d, i) {
			return that.yScale(d[2]);
		})

	that.svg.append("clipPath")
		.attr("id", "content-cardinalLine" + date)
		.append("rect")
		.attr("x", -10)
		.attr("y", -10)
		.attr("height", that.height)
		.attr("width", "10")
		.transition()
		.duration(that.animate)
		.attr("width", that.width);
	var content = that.svg.append("g")
		.attr("class", "content")
		.attr("clip-path", "url(#content-cardinalLine" + date + ")")
		.attr("transform", "translate(" + that.margin.left + "," + that.margin.top + ")")
	dataset.forEach(function(e, j) {
		var pct = that.svg.select(".content")
			.append("g")
			.attr("class", "pct");
		pct.append("path")
			.attr("stroke", function(d, i) {
				return that.colorset[j];
			})
			.attr("stroke-width", function(d, i) {
				return lineWidth;
			})
			.attr("d", valueline(e))
			.attr("fill", "none")
			.on("mouseover", function() {
				d3.select(".content").selectAll(".pct")
					.attr("opacity", 0.1);
				d3.select(this.parentNode).attr("opacity", 1)

			})
			.on('mouseout', function() {
				d3.select(".content").selectAll(".pct")
					.attr("opacity", 1);
			});

		pct.selectAll("circle").data(e)
			.enter()
			.append("circle")
			.attr("cx", function(d, i) {
				return that.xScale(i)
			})
			.attr("cy", function(d, i) {
				return that.yScale(d[2])
			})
			.attr("r", function(d) {
				return radius;
			})
			.attr("fill", function(d, i) {
				return that.colorset[j];
			})
			.attr("class", function(d, i) {

				var domObj = d3.select(this)[0][0];
				var textObj = {};

				textObj.parentG = content;

				textObj.x = that.xScale(i)

				textObj.y = that.yScale(d[2])

				textObj.data = d[2]

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
			});
	})

	that.hasAxis()
	that.hasMessage()
}
STH.UIChart.prototype.updatecardinalLine = function() {
	this.drawcardinalLine();
	
}