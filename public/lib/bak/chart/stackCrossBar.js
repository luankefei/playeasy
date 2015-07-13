STH.UIChart.prototype.drawstackCrossBar = function() {

	d3.select(this.svg)[0][0][0][0].innerHTML = '';
	var that = this;

	// 无数据, 不绘图
	if (that.dataset.length < 1) {
		return;
	}
	
	var data = []
	var stack = d3.layout.stack()
	var dataset = []
	var newData = [];

	STH.util.clearZero(that.dataset,dataset)

	for (var i = 0; i < dataset[0].length; i++) {
		data[i] = []
		for (var j = 0; j < dataset.length; j++) {

			data[i].push([{
				y: parseFloat(dataset[j][i][2]),
				message: dataset[j][i],
				py: i,
				colorIndex: j

			}])
		}
	}

	for (var i = 0; i < data.length; i++) {
		stack(data[i])
	}

	var xScale_data = [0, d3.max(data, function(d) {
		return d3.max(d, function(d) {
			return d3.max(d, function(d) {
				return d.y0 + d.y;
			})
		});
	})]

	var yScale_data = []
	for (var i = 0; i < dataset[0].length; i++) {
		for (var j = 0; j < dataset.length; j++) {
			for (var q = 0; q < dataset[0].length; q++) {
				if (yScale_data.indexOf(dataset[j][i][1]) == -1 && dataset[j][i][1] !== 0) {
					yScale_data.push(dataset[j][i][1]);
				}
			}
		}
	}

	that.xScale = STH.util.scale(
		"linear",
		xScale_data,
		"range", [0, that.width - that.margin.left - that.margin.right])

	that.yScale = STH.util.scale(
		"ordinal",
		d3.range(data.length),
		"rangeRoundBands", [0, that.height - that.margin.top - that.margin.bottom], 0.6)

	that.drawAxis("xAxis", that.xScale, "bottom",
		null, [that.margin.left, that.height - that.margin.bottom])

	that.drawAxis("yAxis", that.yScale, "left",
		yScale_data, [that.margin.left, that.margin.top]);

	var content = that.svg.append('g')
		.attr("class", "content")
		.attr("transform", "translate(" + that.margin.left + ", " + that.margin.top + ")");

	for (var i = 0; i < data.length; i++) {

		for (var j = 0; j < data[i].length; j++) {
			newData.push(data[i][j][0])
		}


	}

	content.selectAll("rect")
		.data(newData)
		.enter()
		.append("rect")
		.attr("fill", function(d, i) {

			return that.colorset[d.colorIndex]
		})
		.attr("class", function(d, i) {
			var domObj = d3.select(this)[0][0];
			var textObj = {};

			textObj.parentG = content;

			textObj.x = that.xScale(d.y0)

			textObj.y = that.yScale(d.py)

			textObj.data = STH.util.toRound( d.y + d.y0 , 2)

			var obj = {
				dom: domObj,
				data: d.message,
				text: textObj
			}

			STH.util.MY.data(domObj, "data", obj);

			return "mouse-obj";
		})
		.attr("x", 0)
		.attr("y", function(d, i) {

			//y轴的比例尺不是正比例
			return that.yScale(d.py)
		})
		.attr("width", 0.01)
		.attr("height", that.yScale.rangeBand())
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
		.attr("x", function(d) {
			return that.xScale(d.y0);
		})
		.attr("width", function(d) {
			return that.xScale(d.y);
		})

	that.hasAxis()
	that.hasMessage()	

}
STH.UIChart.prototype.updatestackCrossBar = function() {

	var that = this
	var data = []
	var stack = d3.layout.stack()
	var dataset = []
	var newData = [];

	STH.util.clearZero(that.dataset,dataset)


	for (var i = 0; i < dataset[0].length; i++) {
		data[i] = []
		for (var j = 0; j < dataset.length; j++) {

			data[i].push([{
				y: parseFloat(dataset[j][i][2]),
				message: dataset[j][i],
				py: i,
				colorIndex: j

			}])
		}
	}

	for (var i = 0; i < data.length; i++) {
		stack(data[i])
	}

	var xScale_data = [0, d3.max(data, function(d) {
		return d3.max(d, function(d) {
			return d3.max(d, function(d) {
				return d.y0 + d.y;
			})
		});
	})]

	var yScale_data = []
	for (var i = 0; i < dataset[0].length; i++) {
		for (var j = 0; j < dataset.length; j++) {
			for (var q = 0; q < dataset[0].length; q++) {
				if (yScale_data.indexOf(dataset[j][i][1]) == -1 && dataset[j][i][1] !== 0) {
					yScale_data.push(dataset[j][i][1]);
				}
			}
		}
	}

	that.xScale = STH.util.scale(
		"linear",
		xScale_data,
		"range", [0, that.width - that.margin.left - that.margin.right])

	that.yScale = STH.util.scale(
		"ordinal",
		d3.range(data.length),
		"rangeRoundBands", [0, that.height - that.margin.top - that.margin.bottom], 0.6)

	that.updateAxis("xAxis", that.xScale, "bottom",
		null, [that.margin.left, that.height - that.margin.bottom])

	that.updateAxis("yAxis", that.yScale, "left",
		yScale_data, [that.margin.left, that.margin.top]);

	var content = that.svg.select(".content")

	for (var i = 0; i < data.length; i++) {

		for (var j = 0; j < data[i].length; j++) {
			newData.push(data[i][j][0])
		}

	}

	rects = content.selectAll("rect")
		.data(newData)
	
		rects.transition()
			.duration(that.animate)
			.attr("x", function(d) {
				return that.xScale(d.y0);
			})
			.attr("y", function(d, i) {

				//y轴的比例尺不是正比例
				return that.yScale(d.py)
			})
			.attr("width", function(d) {
				return that.xScale(d.y);
			})
			.attr("height", that.yScale.rangeBand())
		
	

		rects.exit()
			.transition()
			.duration(that.animate)
			.attr("width", function(d, i) {

				return 0
			})
			.attr("x", function(d) {
				return that.margin.left;
			})
			.remove()
	

	
		rects.enter()
			.append("rect")
			.attr("x", 0)
			.attr("y", function(d, i) {

				return that.yScale(d.py)
			})
			.attr("width", 0.01)
			.attr("height", that.yScale.rangeBand())
			.transition()
			.duration(that.animate)
			.attr("x", function(d) {
				return that.xScale(d.y0);
			})
			.attr("width", function(d) {
				return that.xScale(d.y);
			})


		rects.call(commonEvent)


	

	function commonEvent() {
		var rect = this
		
		rect.attr("fill", function(d, i) {

				return that.colorset[d.colorIndex]
			})
			.attr("class", function(d, i) {
				var domObj = d3.select(this)[0][0];
				var textObj = {};

					textObj.parentG = content;

					textObj.x = that.xScale(d.y0)

					textObj.y = that.yScale(d.py)

					textObj.data = STH.util.toRound( d.y + d.y0 , 2)

					var obj = {
						dom: domObj,
						data: d.message,
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
			
			that.updateMessage()
	}
	
	
	

}