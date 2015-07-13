STH.UIChart.prototype.drawpieBar = function() {
	var that = this
		//todo  清空 svg中的内容
	d3.select(that.svg)[0][0][0][0].innerHTML = '';
	// 无数据, 不绘图
	if (that.dataset.length < 1) {
		return;
	}

	var num = that.dataset.length
	var radius = Math.min(that.width - that.margin.left - that.margin.right,
		that.height - that.margin.top - that.margin.bottom) * 0.5;
	var barH = (radius - (radius / num)) / (1.5 * num); //每条bar的宽度
	var pie = d3.layout.pie();
	var arc = d3.svg.arc();

	var xScale = d3.scale.linear()
		.domain([0, d3.max(that.dataset, function(d) {
			return d[1]
		})])
		.range([0, 2 * Math.PI]);
	if (num > 0) {
		var yScale = d3.scale.linear()
			.domain([0, num - 1])
			.range([radius / num, radius]);
	}


	var content = that.svg.append("g")
		.attr("class", "content")
		.attr("transform", "translate(" + (that.width * 0.5) + "," + radius + ")");



	that.dataset.forEach(function(d, i) {
		var column;
		content.selectAll(".arc" + i)
			.data(function() {
				return pie(new Array([that.dataset[i]]));
			})
			.enter()
			.append("path")
			.attr("class", "arc" + i)
			.style("fill", function() {
				return that.colorset[i]
			})
			.attr("data-column", i)
			.attr("d", arc)
			.attr("data-id", i)
			.transition()
			.duration(that.animate)
			.attrTween('d', function(d) {

				column = d3.select(this).attr("data-column");
				if (num > 1) {
					d.innerRadius = yScale(column) - barH;
					d.outerRadius = yScale(column);

				} else {
					d.innerRadius = 23;
					d.outerRadius = radius;
				}
				d.endAngle = xScale(d.data[0][1])
				var j = d3.interpolate({
					startAngle: 0,
					endAngle: 0
				}, d)
				return function(t) {
					return arc(j(t))
				}
			})
	})

		var barArr = content.selectAll('path')
	
		var BarArr = barArr[0].reverse()

			barArr.attr("class", function(d, i) {
			
				var domObj = d3.select(this)[0][0];
				var textObj = {}

			textObj.parentG = content

			textObj.x = 0 - STH.util.getBLen(d.data[0][0]) * 14 * 0.5

			textObj.y = that.height - that.margin.bottom - 2 * yScale(column) - radius
			console.log(2 * yScale(column))

			textObj.data = d.data[0][0]

			var obj = {
				dom: domObj,
				data: d.data[0],
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
			//mouseEvent.mouseOut();
		})
		.on("click", function(d, i) {
			if (that.linkChart != null && that.linkChart != "undefined") {
				var chart = d3.select(this)[0][0]
				STH.util.clickEvent(chart, that)
			}
		})

	that.hasMessage()
}
STH.UIChart.prototype.updatepieBar = function() {
	this.drawpieBar()
	
}