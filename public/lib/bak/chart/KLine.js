STH.UIChart.prototype.drawKLine = function() {
	var that = this
		//todo  清空 svg中的内容
	d3.select(that.svg)[0][0][0][0].innerHTML = '';
	// 无数据, 不绘图
	if (that.dataset.length < 1) {
		return;
	}
	
	var format = d3.time.format("%Y/%m/%d");
	var timeData = [];
	var xScale_data = []
		that.dataset.forEach(function(d, i) {			
			timeData.push(d[0]);			
		})
	console.log(timeData)
	timeData.forEach(function(d, i) {
		xScale_data.push(format.parse(timeData[i]))
	})

	var yAscale_data= [0, d3.max(that.dataset, function(d) {
			if (d[1] > d[2]) {
				return d[1] +Math.abs(d[1] - d[2])
			} else {
				return d[2] +Math.abs(d[1] - d[2])
			}			
		})]
	console.log(yAscale_data)
	var hScale_data= [d3.max(that.dataset, function(d) {
			if (d[1] > d[2]) {
				return d[1] +Math.abs(d[1] - d[2])
			} else {
				return d[2] +Math.abs(d[1] - d[2])
			}						
		}),0]
	console.log(hScale_data)
	that.hScale = STH.util.scale(
		"linear",
		hScale_data,
		"range", [that.height - that.margin.top - that.margin.bottom,0])

	//坐标轴
	var yScale_data = [d3.max(that.dataset, function(d) {
		return d[4]		
	}), 0]	
	that.yScale = STH.util.scale(
		"linear",
		yScale_data,
		"range", [0, that.height - that.margin.top - that.margin.bottom])
	
	that.xScale = STH.util.scale(
		"ordinal",
		d3.range(xScale_data.length),
		"rangeBands",[0, that.width - that.margin.left - that.margin.right], 0.1);
	

	that.yAscale = STH.util.scale(
		"linear", 
		yAscale_data,
		"range", [that.height - that.margin.top - that.margin.bottom,0])
/*	that.drawAxis("xAxis", that.xScale, "bottom",
			null, [that.margin.left, that.height - that.margin.bottom])*/
	

	var xScale = d3.time.scale()
			.domain(d3.extent(xScale_data))
			.rangeRound([0, that.width - that.margin.left - that.margin.right],0.1)

	var xAxis = d3.svg.axis()
	.scale(xScale)
	.orient("bottom")
	.tickFormat(format)
	.ticks(5)

	that.svg.append("g")
			.attr("class", "xAxis")
			.attr("transform", "translate(" + that.margin.left + "," + (that.height - that.margin.bottom) + ")")		
			.call(xAxis)	
	that.drawAxis("yAxis", that.yAscale, "left",
		null, [that.margin.left, that.margin.top]);		

	var content = that.svg.append("g")
			.attr("class", "content")
			.attr("transform", "translate(" + that.margin.left + ", " + that.margin.top + ")");

		var g = content.selectAll("rect")
			.data(that.dataset)
			.enter()

		g.append("rect")
			.attr("x", function(d, i) {
				return that.xScale(i);
			})
			.attr("width", that.xScale.rangeBand())
			.attr("fill", function(d, i) {
				if (d[1] > d[2]) {
						return that.colorset[0]
					} else {
						return that.colorset[2]
					}
			})
			.attr("y", function(d, i) {
				
				if (d[1]>d[2]) {
					return that.yAscale(d[1]) -that.hScale(Math.abs(d[1]-d[2]))
				} else {
					return that.yAscale(d[2]) -that.hScale(Math.abs(d[1]-d[2]))
				}	
			})
			.attr("height", function(d, i) {
			
					return that.hScale(Math.abs(d[1]-d[2]))
				
			})
			

	
}
