STH.UIChart.prototype.drawstackArea = function() {
	var that = this
	//console.log(that.dataset)

	//todo  清空 svg中的内容
	d3.select(that.svg)[0][0][0][0].innerHTML = '';
	// 无数据, 不绘图
	if (that.dataset.length < 1) {
		return;
	}
	var dataset = []
	STH.util.clearZero(that.dataset,dataset)
	var stack = d3.layout.stack()
	var data = []
	var xAxis_data = [];
	var date = new Date();
	date = date.getTime();

	for (var i = 0; i < dataset[0].length; i++) {
		data[i] = []
		for (var j = 0; j < dataset.length; j++) {
			data[i].push([{
				y: parseFloat(dataset[j][i][2]),
				message: dataset[j][i]
			}])
		}
	}
	for (var i = 0; i < dataset[0].length; i++) {
		for (var j = 0; j < dataset.length; j++) {
			for (var q = 0; q < dataset[0].length; q++) {
				if (xAxis_data.indexOf(dataset[j][i][1]) == -1 && dataset[j][i][1] !== 0) {
					xAxis_data.push(dataset[j][i][1]);
				}
			}
		}
	}

	for (var i = 0; i < data.length; i++) {
		stack(data[i])
	}



	var yScale_data = [0, d3.max(data, function(d) {
		return d3.max(d, function(d) {
			return d3.max(d, function(d) {
				return d.y0 + d.y;
			})
		});
	})]

	var hScale_data = [d3.max(data, function(d) {
		return d3.max(d, function(d) {
			return d3.max(d, function(d) {
				return d.y0 + d.y;
			})
		});
	}), 0]

	that.yScale = STH.util.scale(
		"linear",
		yScale_data,
		"range", [0, that.height - that.margin.top - that.margin.bottom])

	that.hScale = STH.util.scale(
		"linear",
		hScale_data,
		"range", [0, that.height - that.margin.top - that.margin.bottom])

	that.xScale = STH.util.scale(
		"ordinal",
		d3.range(data.length),
		"rangePoints", [that.width - that.margin.left - that.margin.right, 0], 0);

	that.drawAxis("xAxis", that.xScale, "bottom",
		xAxis_data, [that.margin.left, that.height - that.margin.bottom])

	that.drawAxis("yAxis", that.hScale, "left",
		null, [that.margin.left, that.margin.top])

	var area = d3.svg.area()
				.x(function(d, i) {
					//.log(d);
					return that.xScale(i)
				})
				.y0(function(d, i) {
					return that.hScale(d[0].y0)
				})
				.y1(function(d, i) {
					return that.hScale(d[0].y + d[0].y0);
				})

	that.svg.append("clipPath")
		.attr("id", "content-stackArea" + date)
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
		.attr("transform", "translate(" + that.margin.left + "," + that.margin.top + ")")
		.attr("clip-path", "url(#content-stackArea" + date + ")");

	for (var j = 0; j < data[0].length; j++) {
		var data1 = [];
		for (var i = 0; i < data.length; i++) {
			data1.push(data[i][j]);
		}

		var pct = that.svg.select(".content")
			.append("g")
			.attr("class", "pct");

		pct.append("path").datum(data1)
			.attr("d", area)
			.style('fill', function(d, i) {
				return that.colorset[j]
			})
			.attr("opacity", "0.7")
			.attr("stroke-width", 1)
			.attr("stroke", function(d, i) {

				return that.colorset[j];
			});

		pct.selectAll("circle")
			.data(data1)
			.enter()
			.append("circle")
			.attr("class", function(d, i) {
				var domObj = d3.select(this)[0][0];
				var textObj = {};

				textObj.parentG = content;

				textObj.x = that.xScale(i);

				textObj.y = that.hScale(d[0].y + d[0].y0);

				textObj.data = STH.util.toRound( d[0].y + d[0].y0 , 2)

				var obj = {
					dom: domObj,
					data: d[0].message,
					text: textObj
				}

				STH.util.MY.data(domObj, "data", obj);

				return "mouse-obj";
			})
			.attr("cx", function(d, i) {

				return that.xScale(i)
			})
			.attr("cy", function(d, i) {

				return that.hScale(d[0].y + d[0].y0)
			})
			.attr("r", function(d) {
				return 3; //圆点的半径统一定成3
			})
			.attr("fill", function(d, i) {

				return that.colorset[j];
			})
			.attr("data-id", j)
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
	}
	that.hasAxis()
	that.hasMessage()
}
STH.UIChart.prototype.updatestackArea = function() {
	this.drawstackArea()
	
}