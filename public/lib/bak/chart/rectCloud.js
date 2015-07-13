STH.UIChart.prototype.drawrectCloud = function() {
	var that = this
		//todo  清空 svg中的内容
	d3.select(that.svg)[0][0][0][0].innerHTML = '';
	// 无数据, 不绘图
	if (that.dataset.length < 1) {
		return;
	}

	var treemap = d3.layout.treemap()
		.size([that.width - that.margin.left - that.margin.right,
			that.height - that.margin.top - that.margin.bottom
		])
		.sticky(true)
		.value(function(d) {
			return d.size;
		});

	var root = {
		"name": " ",
		"children": []
	};

	that.dataset.forEach(function(d) {
		root.children.push({
			"name": d[0] == null ? '' : d[0],
			"text": d[0] == null ? '' : d[0],
			"num": d[1] == null ? 0 : d[1],
			"size": d[1] == null ? 0 : d[1],
			"url": d[2] == null ? '' : d[2],
			"message": d
		});
	});
	content = that.svg.append("g")
		.attr("class", "content")
		.attr("transform", "translate(" + that.margin.left + "," + that.margin.right + ")")
	var fScale = d3.scale.linear()
		.domain([0, that.width])
		.range([0, that.width * 0.15]);

	/*var node = content.datum(root).selectAll("g")
		.data(treemap.nodes).enter()
		.append('g');

	node.append('rect').call(_position);*/

	var node = content.datum(root).selectAll("rect")
		.data(treemap.nodes)
		.enter()
		.append('rect')				
		.attr("x", function(d) {
			return d.x;
		})
		.attr("y", function(d) {
			return d.y;
		})
		.attr("width", function(d) {
			return 0;
		})
		.attr("height", function(d) {
			return 0;
		})
		.attr("fill", function(d, i) {
			if (i < that.colorset.length) {
				color = that.colorset[i]
			} else {
				hsl = "hsl(" + Math.random() * 1000 + ", 70%, 60%)";
				color = d3.hsl(hsl).rgb().toString();
			}
			that.colorset.push(color)
			return color;
		})
		.attr("class", function(d, i) {

				var domObj = d3.select(this)[0][0];
				var obj = {
					dom: domObj,
					data: d.message
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
		.attr("x", function(d) {
			return d.x;
		})
		.attr("y", function(d) {
			return d.y;
		})
		.attr("width", function(d) {
			return Math.max(0, d.dx - 1);
		})
		.attr("height", function(d) {
			return Math.max(0, d.dy - 1);
		})
	

	/*.append('a')
		.attr("xlink:href", function(d) {
			return d.url;
		})
		.attr("target", "_bank")*/
	content.selectAll("text")
		.data(treemap.nodes)
		.enter()
		.append("text")
		.attr("x", function(d) {
			return d.x;
		})
		.attr("y", function(d) {
			return d.y;
		})
		.attr("transform", function(d) {
			var rotate = Math.max(0, d.dx - 1) > Math.max(0, d.dy - 1) ? 0 : 90
			return "translate(" + (Math.max(0, d.dx - 1) * 0.5) + "," + (Math.max(0, d.dy - 1) * 0.5 + fScale(Math.max(0, d.dx - 1)) * 0.5) + ")rotate(" + rotate + "," + d.x + "," + d.y + ")";
		})
		.attr("text-anchor", "middle")
		.text(function(d) {
			return d.size <= 0 ? ' ' : d.name;
		})
		.attr("font-size", function(d) {
			return fScale(Math.max(0, d.dx - 1)) + "px";
		})
	
}
STH.UIChart.prototype.updaterectCloud = function() {
	//this.drawrectCloud()
	
	var that = this
	var treemap = d3.layout.treemap()
		.size([that.width - that.margin.left - that.margin.right,
			that.height - that.margin.top - that.margin.bottom
		])
		.sticky(true)
		.value(function(d) {
			return d.size;
		});

	var root = {
		"name": " ",
		"children": []
	};

	that.dataset.forEach(function(d) {
		root.children.push({
			"name": d[0] == null ? '' : d[0],
			"text": d[0] == null ? '' : d[0],
			"num": d[1] == null ? 0 : d[1],
			"size": d[1] == null ? 0 : d[1],
			"url": d[2] == null ? '' : d[2],
			"message": d
		});
	});
	content = that.svg.select(".content")
	var fScale = d3.scale.linear()
		.domain([0, that.width])
		.range([0, that.width * 0.15]);

	var node = content.datum(root).selectAll("rect")
					.data(treemap.nodes)
	var text = content.datum(root).selectAll("text")
					.data(treemap.nodes)

	console.log(node)
	node.exit()	
		.transition()
		.duration(that.animate)	
		.attr("width",0)
		.attr("height",0)
		.remove();

	node.transition()
		.duration(that.animate)	
		.attr("x", function(d) {
			return d.x;
		})
		.attr("y", function(d) {
			return d.y;
		})
		.attr("width", function(d) {
			return Math.max(0, d.dx - 1);
		})
		.attr("height", function(d) {
			return Math.max(0, d.dy - 1);
		})
		.attr("fill", function(d, i) {
			if (i < that.colorset.length) {
				color = that.colorset[i]
			} else {
				hsl = "hsl(" + Math.random() * 1000 + ", 70%, 60%)";
				color = d3.hsl(hsl).rgb().toString();
			}
			that.colorset.push(color)
			return color;
		})

	node.enter()
		.append("rect")
		.attr("x", function(d) {
			return d.x;
		})
		.attr("y", function(d) {
			return d.y;
		})
		.attr("width", function(d) {
			return 0;
		})
		.attr("height", function(d) {
			return 0;
		})
		.attr("fill", function(d, i) {
			if (i < that.colorset.length) {
				color = that.colorset[i]
			} else {
				hsl = "hsl(" + Math.random() * 1000 + ", 70%, 60%)";
				color = d3.hsl(hsl).rgb().toString();
			}
			that.colorset.push(color)
			return color;
		})
		.transition()
		.duration(that.animate)
		.attr("x", function(d) {
			return d.x;
		})
		.attr("y", function(d) {
			return d.y;
		})
		.attr("width", function(d) {
			return Math.max(0, d.dx - 1);
		})
		.attr("height", function(d) {
			return Math.max(0, d.dy - 1);
		})

	node.call(commonEvent)
	
		

	function commonEvent() {

		node.attr("class", function(d, i) {

				var domObj = d3.select(this)[0][0];
				var obj = {
					dom: domObj,
					data: d.message
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


	text.exit()
		.transition()
		.duration(that.animate)
		.attr("font-size","1px")
		.remove();

	text.transition()
		.duration(that.animate)
		.attr("x", function(d) {
			return d.x;
		})
		.attr("y", function(d) {
			return d.y;
		})
		.attr("transform", function(d) {
			var rotate = Math.max(0, d.dx - 1) > Math.max(0, d.dy - 1) ? 0 : 90
			return "translate(" + (Math.max(0, d.dx - 1) * 0.5) + "," + (Math.max(0, d.dy - 1) * 0.5 + fScale(Math.max(0, d.dx - 1)) * 0.5) + ")rotate(" + rotate + "," + d.x + "," + d.y + ")";
		})
		.attr("text-anchor", "middle")
		.text(function(d) {
			return d.size <= 0 ? ' ' : d.name;
		})
		.attr("font-size", function(d) {
			return fScale(Math.max(0, d.dx - 1)) + "px";
		})	

	text.enter()
		.append("text")
		.attr("x", function(d) {
			return d.x;
		})
		.attr("y", function(d) {
			return d.y;
		})
		.attr("transform", function(d) {
			var rotate = Math.max(0, d.dx - 1) > Math.max(0, d.dy - 1) ? 0 : 90
			return "translate(" + (Math.max(0, d.dx - 1) * 0.5) + "," + (Math.max(0, d.dy - 1) * 0.5 + fScale(Math.max(0, d.dx - 1)) * 0.5) + ")rotate(" + rotate + "," + d.x + "," + d.y + ")";
		})
		.attr("text-anchor", "middle")
		.text(function(d) {
			return d.size <= 0 ? ' ' : d.name;
		})
		.attr("font-size", function(d) {
			return 1+"px";
		})			
		.transition()
		.duration(that.animate)							
		.attr("x", function(d) {
			return d.x;
		})
		.attr("y", function(d) {
			return d.y;
		})
		.attr("transform", function(d) {
			var rotate = Math.max(0, d.dx - 1) > Math.max(0, d.dy - 1) ? 0 : 90
			return "translate(" + (Math.max(0, d.dx - 1) * 0.5) + "," + (Math.max(0, d.dy - 1) * 0.5 + fScale(Math.max(0, d.dx - 1)) * 0.5) + ")rotate(" + rotate + "," + d.x + "," + d.y + ")";
		})
		.attr("text-anchor", "middle")
		.text(function(d) {
			return d.size <= 0 ? ' ' : d.name;
		})
		.attr("font-size", function(d) {
			return fScale(Math.max(0, d.dx - 1)) + "px";
		})		
		
		
}