STH.UIChart.prototype.draw3dBar = function() {
	var that = this
		//todo  清空 svg中的内容
	d3.select(that.svg)[0][0][0][0].innerHTML = '';
	// 无数据, 不绘图
	if (that.dataset.length < 1) {
		return;
	}

	var xScale_data = []
	var key = null;
	var tempC;

	that.dataset.forEach(function(d, i) {
		xScale_data.push(d[0]);
	})

	var yScale_data = [0, d3.max(that.dataset, function(d) {
		return d[1];
	})]
	var yAscale_data = [d3.max(that.dataset, function(d) {
		return d[1];
	}), 0]

	that.xScale = STH.util.scale(
		"ordinal",
		d3.range(xScale_data.length),
		"rangeBands", [0, that.width - that.margin.left - that.margin.right], 0.5);

	that.yScale = STH.util.scale(
		"linear",
		yScale_data,
		"range", [0, that.height - that.margin.top - that.margin.bottom])
	that.yAscale = STH.util.scale(
		"linear", yAscale_data,
		"range", [0, that.height - that.margin.top - that.margin.bottom])

	that.drawAxis("xAxis", that.xScale, "bottom",
		xScale_data, [that.margin.left, that.height - that.margin.bottom])

	that.drawAxis("yAxis", that.yAscale, "left",
		null, [that.margin.left, that.margin.top]);

	var content = that.svg.append("g")
		.attr("class", "content")
		.attr("transform", "translate(" + that.margin.left + ", " + that.margin.top + ")");

	
		 g = content.selectAll("g")
				.data(that.dataset)
				.enter()
				.append("g")
				.attr("class", "g");
			

		g.append("rect")			
			.attr("x", function(d, i) {			
				return that.xScale(i);
			})
			.attr("y", function(d, i) {
				return that.height - that.margin.top - that.margin.bottom
			})
			.attr("height", function(d, i) {

				return 0
			})
			.attr("width", that.xScale.rangeBand())
			.attr("fill", function(d, i) {
				return that.colorset[i];
			})
			.transition()
			.duration(that.animate)
			.attr("x", function(d, i) {
				return that.xScale(i);
			})
			.attr("y", function(d, i) {
				return that.yAscale(d[1])
			})
			.attr("height", function(d, i) {

				return that.yScale(d[1])
			})
			.attr("width", that.xScale.rangeBand())
			.attr("fill", function(d, i) {
				return that.colorset[i];
			})
		

		g.append("polygon")			
			.attr("class","top")
			.attr("fill", function(d, i) {
				tempC = d3.rgb(that.colorset[i]).hsl();
				tempC.l = 0.5

				return d3.hsl(that.colorset[i]).darker(0.8);
			})
			.attr("points", function(d, i) {

				var x1 = that.xScale(i) + that.xScale.rangeBand() * 0.5;
				var y1 = that.height - that.margin.top - that.margin.bottom;;

				var x2 = x1 + that.xScale.rangeBand();
				var y2 = that.height - that.margin.top - that.margin.bottom;;

				var x3 = that.xScale(i) + that.xScale.rangeBand();
				var y3 = that.height - that.margin.top - that.margin.bottom;;

				var x4 = that.xScale(i);
				var y4 = that.height - that.margin.top - that.margin.bottom;;

				return x1 + "," + y1 + " " + x2 + "," + y2 + " " + x3 + "," + y3 + " " + x4 + "," + y4
			})	
			.transition()	
			.duration(that.animate)	
			.attr("points", function(d, i) {

				var x1 = that.xScale(i) + that.xScale.rangeBand() * 0.5;
				var y1 = that.height - that.margin.top - that.margin.bottom -
					that.yScale(d[1]) - that.xScale.rangeBand() * 0.3;

				var x2 = x1 + that.xScale.rangeBand();
				var y2 = y1;

				var x3 = that.xScale(i) + that.xScale.rangeBand();
				var y3 = that.height - that.margin.top - that.margin.bottom - that.yScale(d[1]);

				var x4 = that.xScale(i);
				var y4 = y3;

				return x1 + "," + y1 + " " + x2 + "," + y2 + " " + x3 + "," + y3 + " " + x4 + "," + y4
			})

		g.append("polygon")
			.attr("class","right")
			.attr("fill", function(d, i) {
				tempC = d3.rgb(that.colorset[i]).hsl();
				tempC.l = 0.5

				return d3.hsl(that.colorset[i]).darker(0.8);
			})
			.attr("points", function(d, i) {

				var x1 = that.xScale(i) + that.xScale.rangeBand();
				var y1 = that.height - that.margin.top - that.margin.bottom 

				var x2 = that.xScale(i) + that.xScale.rangeBand() * 0.5 + that.xScale.rangeBand();
				var y2 = that.height - that.margin.top - that.margin.bottom 

				var x3 = x2;
				var y3 = y2 
				var x4 = x1;
				var y4 = y1 

				return x1 + "," + y1+ " " + x2 + "," + y2 + " " + x3 + "," + y3 + " " + x4 + "," + y4
			})	
			.transition()	
			.duration(that.animate)	
			.attr("points", function(d, i) {

				var x1 = that.xScale(i) + that.xScale.rangeBand();
				var y1 = that.height - that.margin.top - that.margin.bottom - that.yScale(d[1]);

				var x2 = that.xScale(i) + that.xScale.rangeBand() * 0.5 + that.xScale.rangeBand();
				var y2 = that.height - that.margin.top - that.margin.bottom -
					that.yScale(d[1]) - that.xScale.rangeBand() * 0.3;

				var x3 = x2;
				var y3 = y2+ that.yScale(d[1]); 
				var x4 = x1;
				var y4 = y1+ that.yScale(d[1]);

				return x1 + "," + y1+ " " + x2 + "," + y2 + " " + x3 + "," + y3 + " " + x4 + "," + y4
			})

		g.attr("class", function(d, i) {
				var domObj = d3.select(this)[0][0];
				var textObj = {};

				textObj.parentG = content;

				textObj.x = that.xScale(i)

				textObj.y = that.yAscale(d[1])

				textObj.data = that.dataset[i][1]

				var obj = {
					dom: domObj,
					data: that.dataset[i],
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

	that.hasAxis()
	that.hasMessage()

}
STH.UIChart.prototype.update3dBar = function() {
	this.draw3dBar()

	/*var that = this		
	var xScale_data = []
	var key = null;
	var tempC;

	that.dataset.forEach(function(d, i) {
		xScale_data.push(d[0]);
	})

	var yScale_data = [0, d3.max(that.dataset, function(d) {
		return d[1];
	})]
	var yAscale_data = [d3.max(that.dataset, function(d) {
		return d[1];
	}), 0]

	that.xScale = STH.util.scale(
		"ordinal",
		d3.range(xScale_data.length),
		"rangeBands", [0, that.width - that.margin.left - that.margin.right], 0.5);

	that.yScale = STH.util.scale(
		"linear",
		yScale_data,
		"range", [0, that.height - that.margin.top - that.margin.bottom])
	that.yAscale = STH.util.scale(
		"linear", yAscale_data,
		"range", [0, that.height - that.margin.top - that.margin.bottom])

	that.updateAxis("xAxis", that.xScale, "bottom",
		xScale_data, [that.margin.left, that.height - that.margin.bottom])

	that.updateAxis("yAxis", that.yAscale, "left",
		null, [that.margin.left, that.margin.top]);

	var content = that.svg.select(".content")

	var g = content.selectAll("g")


	// for (var j = 0; j < that.dataset.length; j++) {

	// 	rects = g.selectAll('.g'+j)
	// 		.data(that.dataset[j])

	// 	var top = g.selectAll(".top"+j)
 //        		.data(that.dataset)	
	// 	circlesUpdate(circles, j);
	// 	circlesExit(circles, j);
	// 	circlesEnter(circles, j);

	// }
	
	

	var rects = g.selectAll("rect")
				.data(that.dataset) 

	var top = g.selectAll(".top")
        		.data(that.dataset)		

    var right = g.selectAll(".right")
    			.data(that.dataset)    	
    		
   	 rects.transition()
			.duration(that.animate)
			.attr("x", function(d, i) {
				return that.xScale(i);
			})
			.attr("y", function(d, i) {
				return that.yAscale(d[1])
			})
			.attr("height", function(d, i) {

				return that.yScale(d[1])
			})
			.attr("width", that.xScale.rangeBand())
			.attr("fill", function(d, i) {
				return that.colorset[i];
			})

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
			.remove();

		rects.enter()	
			.append("rect")
			.attr("x", function(d, i) {			
				return that.xScale(i);
			})
			.attr("y", function(d, i) {
				return that.height - that.margin.top - that.margin.bottom
			})
			.attr("height", function(d, i) {

				return 0
			})
			.attr("width", that.xScale.rangeBand())
			.attr("fill", function(d, i) {
				return that.colorset[i];
			})
			.transition()
			.duration(that.animate)
			.attr("x", function(d, i) {
				return that.xScale(i);
			})
			.attr("y", function(d, i) {
				return that.yAscale(d[1])
			})
			.attr("height", function(d, i) {

				return that.yScale(d[1])
			})
			.attr("width", that.xScale.rangeBand())
			.attr("fill", function(d, i) {
				return that.colorset[i];
			})   

		top.transition()
			.duration(that.animate)
			.attr("points", function(d, i) {

				var x1 = that.xScale(i) + that.xScale.rangeBand() * 0.5;
				var y1 = that.height - that.margin.top - that.margin.bottom -
					that.yScale(d[1]) - that.xScale.rangeBand() * 0.3;

				var x2 = x1 + that.xScale.rangeBand();
				var y2 = y1;

				var x3 = that.xScale(i) + that.xScale.rangeBand();
				var y3 = that.height - that.margin.top - that.margin.bottom - that.yScale(d[1]);

				var x4 = that.xScale(i);
				var y4 = y3;

				return x1 + "," + y1 + " " + x2 + "," + y2 + " " + x3 + "," + y3 + " " + x4 + "," + y4
			})
			.attr("fill", function(d, i) {
				tempC = d3.rgb(that.colorset[i]).hsl();
				tempC.l = 0.5

				return d3.hsl(that.colorset[i]).darker(0.8);
			})

		top.exit()
			.transition()	
			.duration(that.animate)	
			.attr("points", function(d, i) {

				var x1 = that.xScale(i) + that.xScale.rangeBand() * 0.5;
				var y1 = that.height - that.margin.top - that.margin.bottom;;

				var x2 = x1 + that.xScale.rangeBand();
				var y2 = that.height - that.margin.top - that.margin.bottom;;

				var x3 = that.xScale(i) + that.xScale.rangeBand();
				var y3 = that.height - that.margin.top - that.margin.bottom;;

				var x4 = that.xScale(i);
				var y4 = that.height - that.margin.top - that.margin.bottom;;

				return x1 + "," + y1 + " " + x2 + "," + y2 + " " + x3 + "," + y3 + " " + x4 + "," + y4
			})
			.remove()

		top.enter()
			.append("polygon")
			.attr("class","top")
			.attr("fill", function(d, i) {
				tempC = d3.rgb(that.colorset[i]).hsl();
				tempC.l = 0.5

				return d3.hsl(that.colorset[i]).darker(0.8);
			})
			.attr("points", function(d, i) {

				var x1 = that.xScale(i) + that.xScale.rangeBand() * 0.5;
				var y1 = that.height - that.margin.top - that.margin.bottom;;

				var x2 = x1 + that.xScale.rangeBand();
				var y2 = that.height - that.margin.top - that.margin.bottom;;

				var x3 = that.xScale(i) + that.xScale.rangeBand();
				var y3 = that.height - that.margin.top - that.margin.bottom;;

				var x4 = that.xScale(i);
				var y4 = that.height - that.margin.top - that.margin.bottom;;

				return x1 + "," + y1 + " " + x2 + "," + y2 + " " + x3 + "," + y3 + " " + x4 + "," + y4
			})	
			.transition()	
			.duration(that.animate)	
			.attr("points", function(d, i) {

				var x1 = that.xScale(i) + that.xScale.rangeBand() * 0.5;
				var y1 = that.height - that.margin.top - that.margin.bottom -
					that.yScale(d[1]) - that.xScale.rangeBand() * 0.3;

				var x2 = x1 + that.xScale.rangeBand();
				var y2 = y1;

				var x3 = that.xScale(i) + that.xScale.rangeBand();
				var y3 = that.height - that.margin.top - that.margin.bottom - that.yScale(d[1]);

				var x4 = that.xScale(i);
				var y4 = y3;

				return x1 + "," + y1 + " " + x2 + "," + y2 + " " + x3 + "," + y3 + " " + x4 + "," + y4
			})

		right.transition()
			.duration(that.animate)
			.attr("points", function(d, i) {

				var x1 = that.xScale(i) + that.xScale.rangeBand();
				var y1 = that.height - that.margin.top - that.margin.bottom - that.yScale(d[1]);

				var x2 = that.xScale(i) + that.xScale.rangeBand() * 0.5 + that.xScale.rangeBand();
				var y2 = that.height - that.margin.top - that.margin.bottom -
					that.yScale(d[1]) - that.xScale.rangeBand() * 0.3;

				var x3 = x2;
				var y3 = y2 + that.yScale(d[1]);
				var x4 = x1;
				var y4 = y1 + that.yScale(d[1]);

				return x1 + "," + y1 + " " + x2 + "," + y2 + " " + x3 + "," + y3 + " " + x4 + "," + y4
			})
			.attr("fill", function(d, i) {
				tempC = d3.rgb(that.colorset[i]).hsl();
				tempC.l = 0.5

				return d3.hsl(that.colorset[i]).darker(0.8);
			})

		right.exit()
			.transition()	
			.duration(that.animate)	
			.attr("points", function(d, i) {

				var x1 = that.xScale(i) + that.xScale.rangeBand();
				var y1 = that.height - that.margin.top - that.margin.bottom 

				var x2 = that.xScale(i) + that.xScale.rangeBand() * 0.5 + that.xScale.rangeBand();
				var y2 = that.height - that.margin.top - that.margin.bottom 

				var x3 = x2;
				var y3 = y2 
				var x4 = x1;
				var y4 = y1

				return x1 + "," + y1 + " " + x2 + "," + y2 + " " + x3 + "," + y3 + " " + x4 + "," + y4 
			})
			.remove()

		right.enter()
			.append("polygon")
			.attr("class","right")
			.attr("fill", function(d, i) {
				tempC = d3.rgb(that.colorset[i]).hsl();
				tempC.l = 0.5

				return d3.hsl(that.colorset[i]).darker(0.8);
			})
			.attr("points", function(d, i) {

				var x1 = that.xScale(i) + that.xScale.rangeBand();
				var y1 = that.height - that.margin.top - that.margin.bottom 

				var x2 = that.xScale(i) + that.xScale.rangeBand() * 0.5 + that.xScale.rangeBand();
				var y2 = that.height - that.margin.top - that.margin.bottom 

				var x3 = x2;
				var y3 = y2 
				var x4 = x1;
				var y4 = y1 

				return x1 + "," + y1+ " " + x2 + "," + y2 + " " + x3 + "," + y3 + " " + x4 + "," + y4
			})	
			.transition()	
			.duration(that.animate)	
			.attr("points", function(d, i) {

				var x1 = that.xScale(i) + that.xScale.rangeBand();
				var y1 = that.height - that.margin.top - that.margin.bottom - that.yScale(d[1]);

				var x2 = that.xScale(i) + that.xScale.rangeBand() * 0.5 + that.xScale.rangeBand();
				var y2 = that.height - that.margin.top - that.margin.bottom -
					that.yScale(d[1]) - that.xScale.rangeBand() * 0.3;

				var x3 = x2;
				var y3 = y2+ that.yScale(d[1]); 
				var x4 = x1;
				var y4 = y1+ that.yScale(d[1]);

				return x1 + "," + y1+ " " + x2 + "," + y2 + " " + x3 + "," + y3 + " " + x4 + "," + y4
			})	
		
	g.call(commonEvent)
	
		

	function commonEvent() {

		this.attr("class", function(d, i) {
				var domObj = d3.select(this)[0][0];
				var textObj = {};

				textObj.parentG = content;

				textObj.x = that.xScale(i)

				textObj.y = that.yAscale(d[1])

				textObj.data = that.dataset[i][1]

				var obj = {
					dom: domObj,
					data: that.dataset[i],
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
				

			})
			.on("mouseout", function() {

				d3.select(this)
					.attr("opacity", 1);

				that.mouseout();
				
			})
			.on("click", function(d, i) {

				if (that.linkChart != null && that.linkChart != "undefined") {
					var chart = d3.select(this)[0][0]
					STH.util.clickEvent(chart, that)
				}

			});
			
	}
	
　　　　that.updateMessage()	*/	

}