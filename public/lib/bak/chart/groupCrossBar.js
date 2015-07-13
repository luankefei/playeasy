STH.UIChart.prototype.drawgroupCrossBar = function() {
	var that = this

	var yScale_data = [];
	//todo  清空 svg中的内容
	d3.select(that.svg)[0][0][0][0].innerHTML = '';
	// 无数据, 不绘图
	if (that.dataset.length < 1) {
		return;
	}
	var dataset = []
	var data = []
	var newData = []

	STH.util.clearZero(that.dataset,dataset)

	

	for (var i = 0; i < dataset[0].length; i++) {
		for (var j = 0; j < dataset.length; j++) {
			for (var q = 0; q < dataset[0].length; q++) {
				if (yScale_data.indexOf(dataset[j][i][1]) == -1 && dataset[j][i][1] !== 0) {
					yScale_data.push(dataset[j][i][1]);
				}
			}
		}
	}

	var xScale_data = [0, d3.max(dataset, function(d) {
		return d3.max(d, function(e) {

			return e[2]
		})
	})]

	dataset = STH.util.transformArray(dataset);

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
	
	that.yScale = STH.util.scale(
		"ordinal",
		d3.range(yScale_data.length),
		"rangeBands", [0, that.height - that.margin.top - that.margin.bottom], 0);

	console.log(that.yScale.rangeBand())
	that.hScale = STH.util.scale(
		"ordinal",
		d3.range(dataset.length * dataset[0].length * 1.5),
		"rangeBands", [0, that.height - that.margin.top  - that.margin.bottom],0);
//dataset.length * dataset[0].length *1.5
	that.xScale = STH.util.scale(
		"linear",
		xScale_data,
		"range", [0, that.width - that.margin.left - that.margin.right])

	

	that.drawAxis("xAxis", that.xScale, "bottom",
		null, [that.margin.left, that.height - that.margin.bottom])

	that.drawAxis("yAxis", that.yScale, "left",
		yScale_data, [that.margin.left, that.margin.top]);

	content = that.svg.append("g")
		.attr("class", "content")
		.attr("transform", "translate(" + that.margin.left + "," + that.margin.top + ")")

	for (var i = 0; i < data.length; i++) {
		for (var j = 0; j < data[i].length; j++) {
			newData.push(data[i][j])
		}
	}	
	
	console.log(newData)
		content.selectAll("rect")
			.data(newData)
			.enter()
			.append("rect")
			.attr("class", function(d, i) {

				var domObj = d3.select(this)[0][0];
				var textObj = {}

					textObj.parentG = content;

					textObj.x = that.xScale(d.data[2]);

				/*	textObj.y = that.hScale(i) + j * ((that.height - that.margin.top - that.margin.left) / dataset.length) +
					(dataset[j].length * that.hScale.rangeBand() / 3);*/

					textObj.y =that.hScale(i) + d.px * ((that.height - that.margin.top - that.margin.left) / 14) +
					(that.dataset.length * that.hScale.rangeBand() /that.dataset.length);

					textObj.data = d.data[2]

					var obj = {
						dom: domObj,
						data: d.data,
						text: textObj
					}

				STH.util.MY.data(domObj, "data", obj);

				return "mouse-obj";
			})
			.attr("x", 0)
			.attr("y", function(d, i) {
				//这样写矩形的偏移是为了使得，每一块数据对应的y值（如：苹果）在条形的中心
				console.log(j * that.hScale.rangeBand() /3)
				return that.hScale(i) + d.px * ((that.height - that.margin.top - that.margin.bottom ) / 13) +
				(j * that.hScale.rangeBand() /13) 
				/*return that.hScale(i) + d.px * ((that.height - that.margin.top - that.margin.bottom) / 14) +
					(that.dataset.length * that.hScale.rangeBand() /that.dataset.length);*/
			})	

			.attr("height", that.hScale.rangeBand())
			.attr("fill", function(d, i) {
				return that.colorset[d.py];
			})
			.attr("width", function(d) {
				return that.xScale(d.data[2]);
			})
			.on("mouseover", function(d, i) {

				d3.select(this)
					.attr("opacity", 0.4);
				var temp = STH.util.MY.data(d3.select(this)[0][0], "data")

				that.mouseover(temp);
				// var obj = $(d3.select(this)[0][0]).data("data-mouse");
			 //            var key = chartJson.data[i]

			 //            mouseEvent.mouseOver(eval(obj));

			 //            mouseLink.mouse(key, chartJson.selector);

			})
			.on("mouseout", function() {

				d3.select(this)
					.attr("opacity", 1);
				that.mouseout();
				//mouseEvent.mouseOut();
			})
			.on("click", function(d, i) {
				if (that.linkChart != null && that.linkChart != "undefined") {
					var chart = d3.select(this)[0][0]
					STH.util.clickEvent(chart, that)
				}
			})

	
	that.hasAxis()
	that.hasMessage()
}
STH.UIChart.prototype.updategroupCrossBar = function() {
	var that = this

	var yScale_data = [];
	
	var dataset = []
	var data = []
	var newData = []

	STH.util.clearZero(that.dataset,dataset)

	

	for (var i = 0; i < dataset[0].length; i++) {
		for (var j = 0; j < dataset.length; j++) {
			for (var q = 0; q < dataset[0].length; q++) {
				if (yScale_data.indexOf(dataset[j][i][1]) == -1 && dataset[j][i][1] !== 0) {
					yScale_data.push(dataset[j][i][1]);
				}
			}
		}
	}

	var xScale_data = [0, d3.max(dataset, function(d) {
		return d3.max(d, function(e) {

			return e[2]
		})
	})]

	dataset = STH.util.transformArray(dataset);

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

	that.yScale = STH.util.scale(
		"ordinal",
		d3.range(yScale_data.length),
		"rangeBands", [0, that.height - that.margin.top - that.margin.bottom], 0);

	that.xScale = STH.util.scale(
		"linear",
		xScale_data,
		"range", [0, that.width - that.margin.left - that.margin.right])

	that.hScale = STH.util.scale(
		"ordinal",
		d3.range(dataset.length * dataset[0].length * 1.5),
		"rangeBands", [0, that.height - that.margin.top - that.margin.bottom], 0);

	
	that.updateAxis("xAxis", that.xScale, "bottom",
		null, [that.margin.left, that.height - that.margin.bottom])

	that.updateAxis("yAxis", that.yScale, "left",
		yScale_data, [that.margin.left, that.margin.top]);

	var content = that.svg.select(".content")
		for (var i = 0; i < data.length; i++) {
		for (var j = 0; j < data[i].length; j++) {
			newData.push(data[i][j])
		}
	}
		
	
	
	rects =	content.selectAll("rect")
			.data(newData)
		
	/*rects = content.selectAll("rect")
		.data(dataset)*/
	
		rects.transition()
			.duration(that.animate)
			.attr("x", 0)
			.attr("y", function(d, i) {
				console.log(j * that.hScale.rangeBand() /3)
				//y轴的比例尺不是正比例
				return that.hScale(i) + d.px * ((that.height - that.margin.top - that.margin.bottom ) / 13) +
				(j * that.hScale.rangeBand() /13) 
			})
			.attr("width", function(d) {
				
				return that.xScale(d.data[2]);
			})
			.attr("height", that.hScale.rangeBand())
		
	

		rects.exit()
			.transition()
			.duration(that.animate)
			.attr("width", function(d, i) {

				return 0
			})
			.attr("x", 0)
			.remove()
	

	
		rects.enter()
			.append("rect")
			.attr("x", 0)
			.attr("y", function(d, i) {

				return that.hScale(i) + d.px * ((that.height - that.margin.top - that.margin.bottom ) / 13) +
				(j * that.hScale.rangeBand() /13) 
			})
			.attr("width", 0.01)
			.attr("height", that.hScale.rangeBand())
			.transition()
			.duration(that.animate)
			.attr("x", 0)
			.attr("y", function(d, i) {

				return that.hScale(i) + d.px * ((that.height - that.margin.top - that.margin.bottom ) / 13) +
				(j * that.hScale.rangeBand() /13) 
			})
			.attr("width", function(d) {
				return that.xScale(d.data[2]);
			})
			.attr("height", that.hScale.rangeBand())
		rects.call(commonEvent)	

		
		function commonEvent() {
		var rect = this
		
		rect.attr("fill", function(d, i) {

				return that.colorset[d.py]
			})
			.attr("class", function(d, i) {
				var domObj = d3.select(this)[0][0];
				var textObj = {}

					textObj.parentG = content;

					textObj.x = that.xScale(d.data[2]);

					textObj.y = that.hScale(i) + d.px * ((that.height - that.margin.top - that.margin.left) / 14) +
					(that.dataset.length * that.hScale.rangeBand() /that.dataset.length);

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