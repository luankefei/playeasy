STH.UIChart.prototype.drawstatBubble = function() {
	var that = this
		//todo  清空 svg中的内容
	d3.select(that.svg)[0][0][0][0].innerHTML = '';
	// 无数据, 不绘图
	if (that.dataset.length < 1) {
		return;
	}

	var xScale_data = []
	var yScale_data = []
	var dataset = []
	var data = []
	var newData = []
	STH.util.clearZero(that.dataset, dataset)

	for (var i = 0; i < dataset.length; i++) {
		data[i] = []
		for (var j = 0; j < dataset[i].length; j++) {
			data[i].push({
				data: dataset[i][j],
				py: j,
				px: i,
			})
		}
	}

	console.log(data)

	var rScale = d3.scale.linear()
		.domain([0, d3.max(dataset, function(d) {

			return d3.max(d, function(e) {
				return e[2]
			})
		})])
		.range([0, Math.min(that.width - that.margin.left - that.margin.right,
				that.height - that.margin.top - that.margin.bottom) /
			(2 * Math.max(dataset[0].length, dataset.length))
		]);



	for (var i = 0; i < dataset[0].length; i++) {
		for (var j = 0; j < dataset.length; j++) {
			for (var q = 0; q < dataset[0].length; q++) {
				if (yScale_data.indexOf(dataset[j][i][1]) == -1 && dataset[j][i][1] !== 0) {
					yScale_data.push(dataset[j][i][1]);
				}
			}
		}
	}

	for (var i = 0; i < dataset[0].length; i++) {
		for (var j = 0; j < dataset.length; j++) {
			for (var q = 0; q < dataset[0].length; q++) {
				if (xScale_data.indexOf(dataset[j][i][0]) == -1 && dataset[j][i][0] !== 0) {
					xScale_data.push(dataset[j][i][0]);
				}
			}
		}
	}

	that.xScale = STH.util.scale(
		"ordinal",
		d3.range(dataset.length),
		"rangeRoundBands", [0, that.width - that.margin.left - that.margin.right], 0);

	that.yScale = STH.util.scale(
		"ordinal",
		d3.range(dataset[0].length),
		"rangeRoundBands", [0, that.height - that.margin.top - that.margin.bottom], 0);

	that.drawAxis("xAxis", that.xScale, "bottom",
		xScale_data, [that.margin.left, that.height - that.margin.bottom]);
	that.drawAxis("yAxis", that.yScale, "left",
		yScale_data, [that.margin.left, that.margin.top])

	var content = that.svg.append('g')
		.attr("class", "content")
		.attr("transform", "translate(" + that.margin.left + "," + that.margin.top + ")");

	for (var i = 0; i < data.length; i++) {
		for (var j = 0; j < data[i].length; j++) {
			newData.push(data[i][j])
		}
	}

	content.selectAll("circle")
		.data(newData)
		.enter()
		.append("circle")
		.attr("fill", function(d, i) {

			return that.colorset[d.px]
		})
		.attr("cx", function(d, i) {
			console.log(i)
			return that.xScale(d.px) + that.xScale.rangeBand() / 2;
		})
		.attr("cy", function(d, i) {
			return that.yScale(d.py) + that.yScale.rangeBand() / 2;
		})
		.attr({
			'r': function(d, i) {
				return 0.01;
			}
		})
		.attr("class", function(d, i) {
			var domObj = d3.select(this)[0][0];

			var textObj = {};

			textObj.parentG = content;

			textObj.x = that.xScale(d.px) + that.xScale.rangeBand() / 2;

			textObj.y = that.yScale(d.py) + that.yScale.rangeBand() / 2;

			textObj.data = d.data[2]

			var obj = {
				dom: domObj,
				data: d.data,
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
		.attr({
			'r': function(d, i) {
				return rScale(d.data[2]);
			}
		})

	that.hasAxis()
	that.hasMessage()
}
STH.UIChart.prototype.updatestatBubble = function() {
	//this.drawstatBubble()
	var that = this
	var xScale_data = []
	var yScale_data = []
	var dataset = []
	var data = []
	var newData = []
	STH.util.clearZero(that.dataset, dataset)

	for (var i = 0; i < dataset.length; i++) {
		data[i] = []
		for (var j = 0; j < dataset[i].length; j++) {
			data[i].push({
				data: dataset[i][j],
				py: j,
				px: i,
			})
		}
	}

	var rScale = d3.scale.linear()
		.domain([0, d3.max(dataset, function(d) {

			return d3.max(d, function(e) {
				return e[2]
			})
		})])
		.range([0, Math.min(that.width - that.margin.left - that.margin.right,
				that.height - that.margin.top - that.margin.bottom) /
			(2 * Math.max(dataset[0].length, dataset.length))
		]);



	for (var i = 0; i < dataset[0].length; i++) {
		for (var j = 0; j < dataset.length; j++) {
			for (var q = 0; q < dataset[0].length; q++) {
				if (yScale_data.indexOf(dataset[j][i][1]) == -1 && dataset[j][i][1] !== 0) {
					yScale_data.push(dataset[j][i][1]);
				}
			}
		}
	}

	for (var i = 0; i < dataset[0].length; i++) {
		for (var j = 0; j < dataset.length; j++) {
			for (var q = 0; q < dataset[0].length; q++) {
				if (xScale_data.indexOf(dataset[j][i][0]) == -1 && dataset[j][i][0] !== 0) {
					xScale_data.push(dataset[j][i][0]);
				}
			}
		}
	}

	that.xScale = STH.util.scale(
		"ordinal",
		d3.range(dataset.length),
		"rangeRoundBands", [0, that.width - that.margin.left - that.margin.right], 0);

	that.yScale = STH.util.scale(
		"ordinal",
		d3.range(dataset[0].length),
		"rangeRoundBands", [0, that.height - that.margin.top - that.margin.bottom], 0);

	that.updateAxis("xAxis", that.xScale, "bottom",
		xScale_data, [that.margin.left, that.height - that.margin.bottom]);
	that.updateAxis("yAxis", that.yScale, "left",
		yScale_data, [that.margin.left, that.margin.top])

	var content = that.svg.select(".content")

	for (var i = 0; i < data.length; i++) {
		for (var j = 0; j < data[i].length; j++) {
			newData.push(data[i][j])
		}
	}

	circle = content.selectAll("circle")
		.data(newData)

	circle.exit()
		.transition()
		.duration(that.animate)
		.attr("r", function(d, i) {
			return 0;
		})
		.remove();

	circle.transition()
		.duration(that.animate)
		.attr("fill", function(d, i) {
			return that.colorset[d.px]
		})
		.attr("cx", function(d, i) {
			console.log(i)
			return that.xScale(d.px) + that.xScale.rangeBand() / 2;
		})
		.attr("cy", function(d, i) {
			return that.yScale(d.py) + that.yScale.rangeBand() / 2;
		})
		.attr("r", function(d, i) {
			return rScale(d.data[2]);
		})

	circle.enter()
		.append("circle")
		.attr("fill", function(d, i) {
			return that.colorset[d.px]
		})
		.attr("cx", function(d, i) {
			return that.xScale(d.px) + that.xScale.rangeBand() / 2;
		})
		.attr("cy", function(d, i) {
			return that.yScale(d.py) + that.yScale.rangeBand() / 2;
		})
		.attr("r", function(d, i) {
			return 0.01;
		})
		.transition()
		.duration(that.animate)
		.attr("fill", function(d, i) {
			return that.colorset[d.px]
		})
		.attr("cx", function(d, i) {
			console.log(i)
			return that.xScale(d.px) + that.xScale.rangeBand() / 2;
		})
		.attr("cy", function(d, i) {
			return that.yScale(d.py) + that.yScale.rangeBand() / 2;
		})
		.attr("r", function(d, i) {
			return rScale(d.data[2]);
		})


	circle.call(commonEvent)

	function commonEvent() {

		circle.attr("class", function(d, i) {
				var domObj = d3.select(this)[0][0];

				var textObj = {};

				textObj.parentG = content;

				textObj.x = that.xScale(d.px) + that.xScale.rangeBand() / 2;

				textObj.y = that.yScale(d.py) + that.yScale.rangeBand() / 2;

				textObj.data = d.data[2]

				var obj = {
					dom: domObj,
					data: d.data,
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