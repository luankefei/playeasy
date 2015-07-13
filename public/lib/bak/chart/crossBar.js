STH.UIChart.prototype.drawcrossBar = function() {

	var that = this

	//todo  清空 svg中的内容
	d3.select(that.svg)[0][0][0][0].innerHTML = ''

	// 无数据, 不绘图
	if (that.dataset.length < 1) {
		return
	}

	var xScale_data = [0, d3.max(that.dataset, function(d) {
		return d[1]
	})]

	var yScale_data = []

	that.dataset.forEach(function(d, i) {
		yScale_data.push(d[0])
	})

	that.yScale = STH.util.scale(
		"ordinal",
		d3.range(that.dataset.length),
		"rangeBands", [0, that.height - that.margin.top - that.margin.bottom], 0.6)

	that.xScale = STH.util.scale(
		"linear",
		xScale_data,
		"range", [0, that.width - that.margin.left - that.margin.right])

	that.drawAxis("xAxis", that.xScale, "bottom",
		null, [that.margin.left, that.height - that.margin.bottom])

	that.drawAxis("yAxis", that.yScale, "left",
		yScale_data, [that.margin.left, that.margin.top])
	
	var content = that.svg.append("g")
		.attr("class", "content")
		.attr("transform", "translate(" + that.margin.left + "," + that.margin.top + ")")

	var rects = content.selectAll("rect")
		.data(that.dataset)
		.enter()
		.append("rect")
		.attr("x", 0)
		.attr("y", function(d, i) {
			return that.yScale(i)
		})
		.attr("width", 0.5)
		.attr("height", that.yScale.rangeBand())
		.attr("class", function(d, i) {
			
			var domObj = d3.select(this)[0][0]
			var textObj = {};

			textObj.parentG = content;

			textObj.x = that.xScale(d[1]);

			textObj.y = that.yScale(i);

			textObj.data = that.dataset[i][1]

			var obj = {
				dom: domObj,
				data: that.dataset[i],
				text: textObj
			}

			STH.util.MY.data(domObj, "data", obj)

			return "mouse-obj"
		})
		.attr("fill", function(d, i) {
			return that.colorset[i]
		})
		.on("mouseover", function(d, i) {

			d3.select(this)
				.attr("opacity", 0.4)

			var temp = STH.util.MY.data(d3.select(this)[0][0], "data")

			that.mouseover(temp)
				/*var obj = $(d3.select(this)[0][0]).data("data-mouse")
	            var key = chartJson.data[i]

	            mouseEvent.mouseOver(eval(obj))

	            mouseLink.mouse(key, chartJson.selector)*/

		})
		.on("mouseout", function() {

			d3.select(this)
				.attr("opacity", 1)
			that.mouseout()
				/*mouseEvent.mouseOut()*/
		})
		.on("click", function(d, i) {

			if (that.linkChart != null && that.linkChart != "undefined") {

				var chart = d3.select(this)[0][0]
				STH.util.clickEvent(chart, that)
			}
		})
		.transition()
		.duration(that.animate)
		.attr("width", function(d) {
			return that.xScale(d[1])
		})

	that.hasAxis()
	that.hasMessage()	
}

STH.UIChart.prototype.updatecrossBar = function(type) {

	/*
	 *	数据更新后，crossBar 的图表更新函数：
	 *		1.更新 x, y轴新的值域
	 *		2.生成新的比例尺
	 *		3.更新数轴
	 *		4.更新图表

	 	this 			为当前图表对象 UIChart
	 	this.dataset 	更新后的数据
	 	this.xScale		X轴比例尺
	 	this.yScale 	y轴比例尺

		STH.util		工具
		STH.util.scale 	return 新的比例尺

		this.updateAxis return 新的数轴
	*/
	var that = this
	var xScale_data = []
	var yScale_data = []
	var content = that.svg.select(".content")

	// 无数据, 不绘图
	if (that.dataset.length < 1) {
		return
	}

	xScale_data = [0, d3.max(that.dataset, function(d) {
		return d[1]
	})]

	that.dataset.forEach(function(d, i) {
		yScale_data.push(d[0])
	})

	that.xScale = STH.util.scale(
		"linear",
		xScale_data,
		"range", [0, that.width - that.margin.left - that.margin.right])

	that.yScale = STH.util.scale(
		"ordinal",
		d3.range(that.dataset.length),
		"rangeBands", [0, that.height - that.margin.top - that.margin.bottom], 0.6)

	that.updateAxis("xAxis", that.xScale, "bottom",
		null, [that.margin.left, that.height - that.margin.bottom])

	that.updateAxis("yAxis", that.yScale, "left",
		yScale_data, [that.margin.left, that.margin.top])

	var rects = content.selectAll("rect")
		.data(that.dataset)

		// rectsUpdate
		rects.transition()
			.duration(that.animate)
			.attr({
				x: 0,
				y: function(d, i) {
					return that.yScale(i)
				},
				width: function(d) {
					return that.xScale(d[1])
				},
				height: function(d) {
					return that.yScale.rangeBand()
				},
				fill: function(d, i) {
					return that.colorset[i]
				}
			})

		// rectsExit
		rects.exit()
			.transition()
			.duration(that.animate)
			.attr({
				y: function(d) {
					return that.height - that.margin.top - that.margin.bottom;
				},
				width: 0,
				height: 0,
			})
			.remove()


		// rectsEnter
		rects.enter()
			.append("rect")
			.attr("x", 0)
			.attr("y", function(d, i) {
				return that.yScale(i)
			})
			.attr("width", 0.5)
			.attr("height", that.yScale.rangeBand())

			.attr("fill", function(d, i) {
				return that.colorset[i]
			})
			.transition()
			.duration(that.animate)
			.attr("width", function(d) {
				return that.xScale(d[1])
			})


	rects.call(commonEvent)

	function commonEvent() {

			this.attr("class", function(d, i) {

					var domObj = d3.select(this)[0][0]

					var textObj = {}

					textObj.parentG = content;

					textObj.x = that.xScale(d[1]);

					textObj.y = that.yScale(i);

					textObj.data = that.dataset[i][1]

					var obj = {
						dom: domObj,
						data: that.dataset[i],
						text: textObj
					}



					STH.util.MY.data(domObj, "data", obj)

					return "mouse-obj"
				})
				.on("mouseover", function(d, i) {

					d3.select(this)
						.attr("opacity", 0.4)

					var temp = STH.util.MY.data(d3.select(this)[0][0], "data")

					that.mouseover(temp)
						/*var obj = $(d3.select(this)[0][0]).data("data-mouse")
            var key = chartJson.data[i]

            mouseEvent.mouseOver(eval(obj))

            mouseLink.mouse(key, chartJson.selector)*/

				})
				.on("mouseout", function() {

					d3.select(this)
						.attr("opacity", 1)
					that.mouseout()
						/*mouseEvent.mouseOut()*/
				})
				.on("click", function(d, i) {

					if (that.linkChart != null && that.linkChart != "undefined") {

						var chart = d3.select(this)[0][0]
						STH.util.clickEvent(chart, that)
					}
				})


		} // end commonEvent


		that.updateMessage()



}