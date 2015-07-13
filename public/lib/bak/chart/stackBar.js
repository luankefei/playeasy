STH.UIChart.prototype.drawstackBar = function() {
	var that = this
		//todo  清空 svg中的内容
	d3.select(that.svg)[0][0][0][0].innerHTML = '';
	// 无数据, 不绘图
	if (that.dataset.length < 1) {
		return;
	}

	var data = []
	var stack = d3.layout.stack()
	var dataset = []
	var newData = [];

    STH.util.clearZero(that.dataset,dataset)

    var xAxis_data = []
	for (var i = 0; i < dataset[0].length; i++) {
		for (var j = 0; j < dataset.length; j++) {
			for (var q = 0; q < dataset[0].length; q++) {
				if (xAxis_data.indexOf(dataset[j][i][1]) == -1 && dataset[j][i][1] !== 0) {
					xAxis_data.push(dataset[j][i][1]);
				}
			}
		}
	}

	for (var i = 0; i < dataset[0].length; i++) {
		data[i] = []
		for (var j = 0; j < dataset.length; j++) {
			data[i].push([{
				y: parseFloat(dataset[j][i][2]),
				message: dataset[j][i],
				px: i,
				colorIndex: j
			}])
		}
	}

	for (var i = 0; i < data.length; i++) {
		var stackData = stack(data[i])
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
		"range", [that.height - that.margin.top - that.margin.bottom, 0])

	that.hScale = STH.util.scale(
		"linear",
		hScale_data,
		"range", [that.height - that.margin.top - that.margin.bottom, 0])

	that.xScale = STH.util.scale(
		"ordinal",
		d3.range(data.length),
		"rangeRoundBands", [0, that.width - that.margin.left - that.margin.right], 0.4)


	that.drawAxis("xAxis", that.xScale, "bottom",
		xAxis_data, [that.margin.left, that.height - that.margin.bottom])

	that.drawAxis("yAxis", that.yScale, "left",
		null, [that.margin.left, that.margin.top]);

	content = that.svg.append('g')
		.attr("class", "content")
		.attr("transform", "translate(" + that.margin.left + ", " + that.margin.top + ")");

	for (var i = 0; i < data.length; i++) {

		for (var j = 0; j < data[i].length; j++) {
			newData.push(data[i][j][0])
		}

	}	

	var rects = content.selectAll("rect")
		.data(newData)
		.enter()
		.append("rect")
		.attr("fill", function(d, i) {
		
			return that.colorset[d.colorIndex]
		})
		.attr("x", function(d, i) {		
			return that.xScale(d.px)
		})		
		.attr("width", that.xScale.rangeBand())		
		.attr("y", function(d) {
			return that.height - that.margin.top - that.margin.bottom;
		})
		.attr("height", function(d) {

			return 0;
		})
		.attr("class", function(d, i) {
			var domObj = d3.select(this)[0][0];
			var textObj = {};

			textObj.parentG = content;

			textObj.x = that.xScale(d.px);

			textObj.y = that.yScale(d.y0) - that.hScale(d.y);

			textObj.data =  STH.util.toRound( d.y + d.y0 , 2)

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
		.transition()
		.duration(that.animate)	
		.attr("fill", function(d, i) {
		
			return that.colorset[d.colorIndex]
		})
		.attr("x", function(d, i) {		
			return that.xScale(d.px)
		})		
		.attr("width", that.xScale.rangeBand())		
		.attr("y", function(d) {
			console.log(d)
			return that.yScale(d.y0) - that.hScale(d.y);
		})
		.attr("height", function(d) {
			
			return that.hScale(d.y);
		})
	
	that.hasAxis()
	that.hasMessage()
}
STH.UIChart.prototype.updatestackBar = function() {
	//this.drawstackBar()
	var that = this	
	var data = []
	var stack = d3.layout.stack()
	var dataset = []
	var newData = [];

    STH.util.clearZero(that.dataset,dataset)

    var xAxis_data = []
	for (var i = 0; i < dataset[0].length; i++) {
		for (var j = 0; j < dataset.length; j++) {
			for (var q = 0; q < dataset[0].length; q++) {
				if (xAxis_data.indexOf(dataset[j][i][1]) == -1 && dataset[j][i][1] !== 0) {
					xAxis_data.push(dataset[j][i][1]);
				}
			}
		}
	}

	for (var i = 0; i < dataset[0].length; i++) {
		data[i] = []
		for (var j = 0; j < dataset.length; j++) {
			data[i].push([{
				y: parseFloat(dataset[j][i][2]),
				message: dataset[j][i],
				px: i,
				colorIndex: j
			}])
		}
	}

	for (var i = 0; i < data.length; i++) {
		var stackData = stack(data[i])
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


	console.log(hScale_data)
	that.yScale = STH.util.scale(
		"linear",
		yScale_data,
		"range", [that.height - that.margin.top - that.margin.bottom, 0])

	that.hScale = STH.util.scale(
		"linear",
		hScale_data,
		"range", [that.height - that.margin.top - that.margin.bottom, 0])

	that.xScale = STH.util.scale(
		"ordinal",
		d3.range(data.length),
		"rangeRoundBands", [0, that.width - that.margin.left - that.margin.right], 0.4)


	that.updateAxis("xAxis", that.xScale, "bottom",
		xAxis_data, [that.margin.left, that.height - that.margin.bottom])

	that.updateAxis("yAxis", that.yScale, "left",
		null, [that.margin.left, that.margin.top]);

	content = that.svg.select(".content")

	for (var i = 0; i < data.length; i++) {

		for (var j = 0; j < data[i].length; j++) {
			newData.push(data[i][j][0])
		}

	}	
	var rects = content.selectAll("rect")
				.data(newData)

	rects.exit()
		.transition()
		.duration(that.animate)	
		.attr("x",function(d,i) {
			return that.xScale(d.px)
		})
		.attr("width", that.xScale.rangeBand())		
		.attr("y", function(d) {

			return that.height - that.margin.top - that.margin.bottom;
		})
		.attr("height", function(d) {

			return 0;
		})
		.remove();

	rects.transition()
		.duration(that.animate)	
		.attr("fill", function(d, i) {
		
			return that.colorset[d.colorIndex]
		})
		.attr("x", function(d, i) {		
			return that.xScale(d.px)
		})		
		.attr("width", that.xScale.rangeBand())		
		.attr("y", function(d) {
			return that.yScale(d.y0) - that.hScale(d.y);
		})
		.attr("height", function(d) {

			return that.hScale(d.y);
		})		

	rects.enter()
		.append("rect")
		.attr("fill", function(d, i) {
		
			return that.colorset[d.colorIndex]
		})
		.attr("x", function(d, i) {		
			return that.xScale(d.px)
		})		
		.attr("width", that.xScale.rangeBand())		
		.attr("y", function(d) {
			return that.height - that.margin.top - that.margin.bottom;
		})
		.attr("height", function(d) {

			return 0;
		})
		.transition()
		.duration(that.animate)	
		.attr("fill", function(d, i) {
		
			return that.colorset[d.colorIndex]
		})
		.attr("x", function(d, i) {		
			return that.xScale(d.px)
		})		
		.attr("width", that.xScale.rangeBand())		
		.attr("y", function(d) {
			return that.yScale(d.y0) - that.hScale(d.y);
		})
		.attr("height", function(d) {

			return that.hScale(d.y);
		})
		
			
	rects.call(commonEvent)


	

	function commonEvent() {
	
		
		rects.attr("fill", function(d, i) {

				return that.colorset[d.colorIndex]
			})
			.attr("class", function(d, i) {
				var domObj = d3.select(this)[0][0];
				var textObj = {};

				textObj.parentG = content;

				textObj.x = that.xScale(d.px);

				textObj.y = that.yScale(d.y0) - that.hScale(d.y);

				textObj.data =  STH.util.toRound( d.y + d.y0 , 2)

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