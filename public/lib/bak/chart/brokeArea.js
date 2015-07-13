STH.UIChart.prototype.drawbrokeArea = function() {
	var that = this
		//todo  清空 svg中的内容
	d3.select(that.svg)[0][0][0][0].innerHTML = '';
	// 无数据, 不绘图
	if (that.dataset.length < 1) {
		return;
	}
	var dataset = []
	STH.util.clearZero(that.dataset,dataset)
	var date = new Date();
	date = date.getTime();
	var xAxis_data = [];
	for (var i = 0; i < dataset[0].length; i++) {
		for (var j = 0; j < dataset.length; j++) {
			for (var q = 0; q < dataset[0].length; q++) {
				if (xAxis_data.indexOf(dataset[j][i][1]) == -1 && dataset[j][i][1] !== 0) {
					xAxis_data.push(dataset[j][i][1]);
				}
			}
		}
	}
	var yScale_data = [0, d3.max(dataset, function(d) {
		return d3.max(d, function(e) {
			return e[2]
		})
	})]

	that.yScale = STH.util.scale(
		"linear",
		yScale_data,
		"range", [that.height - that.margin.top - that.margin.bottom, 0])

	that.xScale = STH.util.scale(
		"ordinal",
		d3.range(xAxis_data.length),
		"rangePoints", [that.width - that.margin.left - that.margin.right, 0], 0);

	that.drawAxis("xAxis", that.xScale, "bottom",
		xAxis_data, [that.margin.left, that.height - that.margin.bottom])

	that.drawAxis("yAxis", that.yScale, "left",
		null, [that.margin.left, that.margin.top])
	
	var area = d3.svg.area()
		.x(function(d, i) {
			return that.xScale(i) /*+ (width - margin.right - margin.left) / (length * 2)*/ ;
		})
		.y0(that.height - that.margin.top - that.margin.bottom)
		.y1(function(d, i) {
			return that.yScale(d[2]);
		});

	that.svg.append("clipPath")
		.attr("id", "content-brokeArea" + date)
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
		.attr("clip-path", "url(#content-brokeArea" + date + ")")
		.attr("transform", "translate(" + that.margin.left + "," + that.margin.top + ")");
	for (var j = 0; j < dataset.length; j++) {
		var pct = that.svg.select(".content")
			.append("g")
			.attr("class", "pct");
		pct.append("path")
			.datum(dataset[j])
			.attr("stroke", function(d, i) {

				return that.colorset[j];
			})
			.attr("d", area)
			.style("fill", function(d, i) {

				return that.colorset[j];
			})
			.style("opacity", "0.7");
		pct.selectAll("circle")
			.data(dataset[j])
			.enter()
			.append("circle")
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
			.attr("cx", function(d, i) {
				return that.xScale(i) /*+ (width - margin.right - margin.left) / (dataset[0].length * 2)*/ ; //加上padding是为了和下面的Y轴距离左边界的位置保持一致
			})
			.attr("cy", function(d, i) {
				return that.yScale(d[2]);
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
STH.UIChart.prototype.updatebrokeArea = function() {
	this.drawbrokeArea()
}