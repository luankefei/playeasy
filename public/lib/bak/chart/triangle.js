STH.UIChart.prototype.drawtriangle = function() {
	var that = this
	//todo  清空 svg中的内容
	d3.select(that.svg)[0][0][0][0].innerHTML = '';
	// 无数据, 不绘图
	if (that.dataset.length < 1) {
		return;
	}

	var data = []
	var stack = d3.layout.stack();

	for (var j = 0; j < that.dataset.length; j++) {
		data[j] = [];
		data[j].push({
			y: parseFloat(that.dataset[j][1]),
			message: that.dataset[j]
		})
	}

	data = stack(data)

	var yScale_data = [0, d3.max(data, function(d) {
		return d[0].y0 + d[0].y;
	})]

	that.yScale = STH.util.scale(
		"linear",
		yScale_data,
		"range", [0, that.height - that.margin.top - that.margin.bottom])

	svg = that.svg.append("g")
		.attr("transform", "translate(" + that.margin.left + "," + that.margin.top + ")");

	var clipPath = svg.append("clipPath")
		.attr("id", "triangle")
		.append("polygon")
		.attr("points", function() {
			//三角形左下角的位置
			var leftBottom = [0, that.height - that.margin.bottom - that.margin.top];
			//右下角
			var rightBottom = [that.width - that.margin.right - that.margin.left,
				that.height - that.margin.bottom - that.margin.top
			];
			//定点
			var top = [(that.width - that.margin.right - that.margin.left) * 0.5, 0];

			return leftBottom[0] + "," + leftBottom[1] + " " +
				rightBottom[0] + "," + rightBottom[1] + " " +
				top[0] + "," + top[1];
		})

	var content = that.svg.append("g")
		.datum(data)
		.attr("class", "content")
		.attr("clip-path", "url(#triangle)");

	var rects = content.selectAll("rect")
		.data(function(d) {
			return d;
		})
		.enter()	
		.append("rect")
		.attr("x", function(d, i) {			
			return 0;
		})
		.attr("y", function(d, i) {
			return that.yScale(d[0].y0)
		})
		.attr("height", function(d, i) {

			return 0
		})
		.attr("width", that.width - that.margin.left - that.margin.right)
		.attr("fill", function(d, i) {
			return that.colorset[i];
		})
		.transition()
		.duration(that.animate)
		.attr("x", function(d, i) {
			return 0;
		})
		.attr("y", function(d, i) {
			return that.yScale(d[0].y0)
		})
		.attr("height", function(d, i) {

			return that.yScale(d[0].y);
		})
		.attr("width",that.width - that.margin.left - that.margin.right)
		.attr("fill", function(d, i) {
			return that.colorset[i];
		})
		.attr("class", function(d, i) {
			e = d[0].y + ""

			tWidth = (STH.util.getBLen(e) * 13 * 0.3)

			var x = d3.select(this).attr('x');

			var width = d3.select(this).attr('width');

			var y = d3.select(this).attr('y');

			var height = d3.select(this).attr('height');

			var domObj = d3.select(this)[0][0];

			var textObj = {};

			textObj.parentG = content;

			textObj.x = parseFloat(x) + parseFloat(width*0.5) - parseFloat(tWidth)

			textObj.y = parseFloat(y) + parseFloat(height * 0.7);

			textObj.data = d[0].y

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

	that.hasMessage()
}
STH.UIChart.prototype.updatetriangle = function() {
	//this.drawtriangle()
	var that = this	
	var data = []
	var stack = d3.layout.stack();

	for (var j = 0; j < that.dataset.length; j++) {
		data[j] = [];
		data[j].push({
			y: parseFloat(that.dataset[j][1]),
			message: that.dataset[j]
		})
	}

	data = stack(data)

	var yScale_data = [0, d3.max(data, function(d) {
		return d[0].y0 + d[0].y;
	})]

	that.yScale = STH.util.scale(
		"linear",
		yScale_data,
		"range", [0, that.height - that.margin.top - that.margin.bottom])

/*	svg = that.svg.append("g")
		.attr("transform", "translate(" + that.margin.left + "," + that.margin.top + ")");*/

	/*var clipPath = svg.append("clipPath")
		.attr("id", "triangle")
		.append("polygon")
		.attr("points", function() {
			//三角形左下角的位置
			var leftBottom = [0, that.height - that.margin.bottom - that.margin.top];
			//右下角
			var rightBottom = [that.width - that.margin.right - that.margin.left,
				that.height - that.margin.bottom - that.margin.top
			];
			//定点
			var top = [(that.width - that.margin.right - that.margin.left) * 0.5, 0];

			return leftBottom[0] + "," + leftBottom[1] + " " +
				rightBottom[0] + "," + rightBottom[1] + " " +
				top[0] + "," + top[1];
		})*/

	var content = that.svg.select(".content")

	var rects = content.selectAll("rect")		
				.data(data)
			
	rects.exit()
		.transition()
		.duration(that.animate)
		.attr("x", function(d, i) {
			return 0
		})
		.attr("y", function(d, i) {
			return that.height - that.margin.top - that.margin.bottom;
		})
		.attr("height", function(d, i) {
			return 0;
		})
		.attr("width", that.width - that.margin.left - that.margin.right)
		.remove();
				
	rects.transition()
		.duration(that.animate)
		.attr("x", function(d, i) {
			return 0
		})
		.attr("y", function(d, i) {
			return that.yScale(d[0].y0);
		})
		.attr("height", function(d, i) {
			return that.yScale(d[0].y);
		})
		.attr("width", that.width - that.margin.left - that.margin.right)
		.attr("fill", function(d, i) {
			return that.colorset[i];
		})
				
	rects.enter()	
		.append("rect")
		.attr("x", function(d, i) {			
			return 0;
		})
		.attr("y", function(d, i) {
			return that.height - that.margin.top - that.margin.bottom;
		})
		.attr("height", function(d, i) {

			return 0
		})
		.attr("width", that.width - that.margin.left - that.margin.right)
		.attr("fill", function(d, i) {
			return that.colorset[i];
		})
		.transition()
		.duration(that.animate)
		.attr("x", function(d, i) {
			return 0;
		})
		.attr("y", function(d, i) {
			return that.yScale(d[0].y0)
		})
		.attr("height", function(d, i) {

			return that.yScale(d[0].y);
		})
		.attr("width",that.width - that.margin.left - that.margin.right)
			

	rects.call(commonEvent)
	
		

	function commonEvent() {

		rects.attr("class", function(d, i) {

			e = d[0].y + ""

			tWidth = (STH.util.getBLen(e) * 13 * 0.3)

			var x = d3.select(this).attr('x');

			var width = d3.select(this).attr('width');

			var y = d3.select(this).attr('y');

			var height = d3.select(this).attr('height');

			var domObj = d3.select(this)[0][0];

			var textObj = {};

			textObj.parentG = content;

			textObj.x = parseFloat(x) + parseFloat(width*0.5) - parseFloat(tWidth)

			textObj.y = parseFloat(y) + parseFloat(height * 0.7);

			textObj.data = d[0].y

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