STH.UIChart.prototype.drawcircleSplice = function() {
	var that = this
		//todo  清空 svg中的内容
	d3.select(that.svg)[0][0][0][0].innerHTML = '';
	// 无数据, 不绘图
	if (that.dataset.length < 1) {
		return;
	}

	var xScale_data = []
	var key = null;

	var rScale_data = [0, d3.max(that.dataset, function(d) {
		return parseFloat(d[1]);
	})]

	that.rScale = STH.util.scale(
		"linear",
		rScale_data,
		"range", [0, Math.min((that.height - that.margin.top - that.margin.bottom), (that.width - that.margin.left - that.margin.right)) * 0.5])

	content = that.svg.append("g").attr("class", "content")

	content.selectAll("circle")
		.data(that.dataset)
		.enter()
		.append("circle")		
		.attr("cx", that.width / 2)
		.attr("cy", function(d) {
			return that.height - that.margin.bottom - that.rScale(d[1]);
		})
		/*  .attr("r", function(d) {
		            return rScale(0);
		        })*/
		.attr("fill", function(d, i) {
			return that.colorset[i];
		})
		.attr("z-index", function(d, i) {
			return i;
		})
		/*  .transition()
		        .duration(animate == true ? 1000 : 0)
		        .delay(function(d, i) {
		            return (animate == true ? 500 : 0) * (dataset.length - i)
		        })*/
		.attr("r", function(d) {
			return 0;
		})
		.attr("class", function(d, i) {

			var domObj = d3.select(this)[0][0];
			var textObj = {}

			textObj.parentG = content;

			textObj.x = that.width / 2;

			textObj.y = that.height - that.margin.bottom - that.rScale(d[1]) * 2;

			textObj.data = d[0] + ", " + d[1]

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
		})
		.transition()
		.duration(that.animate)
		.attr("r", function(d) {
			return that.rScale(d[1]);
		})
		that.hasMessage()
}
STH.UIChart.prototype.updatecircleSplice = function() {
	//this.drawcircleSplice();
	var that = this
	var xScale_data = []
	var key = null;

	var rScale_data = [0, d3.max(that.dataset, function(d) {
		return parseFloat(d[1]);
	})]

	that.rScale = STH.util.scale(
		"linear",
		rScale_data,
		"range", [0, Math.min((that.height - that.margin.top - that.margin.bottom), (that.width - that.margin.left - that.margin.right)) * 0.5])

	content = that.svg.select(".content")

	circles = content.selectAll("circle")
				.data(that.dataset)

	circles.exit()
			.transition()
			.duration(that.animate)
			.attr("r",function(d) {
				return 0
			})			
			.remove();

	circles.transition()
			.duration(that.animate)
			.attr("cx", that.width / 2)
			.attr("cy", function(d) {
				return that.height - that.margin.bottom - that.rScale(d[1]);
			})			
			.attr("fill", function(d, i) {
				return that.colorset[i];
			})
			.attr("z-index", function(d, i) {
				return i;
			})
			.attr("r", function(d) {
				return that.rScale(d[1]);
			})

	circles.enter()
			.append("circle")
			.attr("cx", that.width / 2)
			.attr("cy", function(d) {
				return that.height - that.margin.bottom - that.rScale(d[1]);
			})			
			.attr("fill", function(d, i) {
				return that.colorset[i];
			})
			.attr("z-index", function(d, i) {
				return i;
			})
			.attr("r", function(d) {
				return 0;
			})
			.transition()
			.duration(that.animate)		
			.attr("r", function(d) {
				return that.rScale(d[1]);
			})

	circles.call(commonEvent)   

    function commonEvent() {

		this.attr("class", function(d, i) {

				var domObj = d3.select(this)[0][0];

				var textObj = {}

				textObj.parentG = content;

				textObj.x = that.width / 2;

				textObj.y = that.height - that.margin.bottom - that.rScale(d[1]) * 2;

				textObj.data = d[0] + ", " + d[1]

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
			})
			
	}    
       that.updateMessage()
		

	
}