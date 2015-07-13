STH.UIChart.prototype.drawchinaMapLine = function() {
	var that = this
		//todo  清空 svg中的内容
	d3.select(that.svg)[0][0][0][0].innerHTML = '';
	// 无数据, 不绘图
	if (that.dataset.length < 1) {
		return;
	}

	var colorset = []
	var projection = d3.geo.mercator()
		.scale(3000)
		.center([481, 30])

	var path = d3.geo.path().projection(projection);
	var content = that.svg.append("g")
		.attr("class", "content")
		.attr("transform", "translate(" + that.margin.left + ", " + that.margin.top + ") ");
	var g = content.append("g");
		
	for (var i = 0; i < 7; i++) {
		if (i < that.colorset.length) {
			color = that.colorset[i]
		} else {
			hsl = "hsl(" + Math.random() * 1000 + ", 70%, 60%)";
			color = d3.hsl(hsl).rgb().toString();
		}
		colorset.push(color)
	}

	d3.json(STH.resource.jsonData['china'], function(json) {
		//绘制中国地图
		g.selectAll("path")
			.data(json.features)
			.enter()
			.append("path")
			.attr("d", path)
			.attr("fill", function(d, i) {
				return colorset[0];
			})
			.attr("stroke-width", "1px")
			.attr("stroke-linejoin", "round")
			.attr("stroke", function(d, i) {

				return colorset[0];
			})

		//绘制地图上的点
		d3.csv(STH.resource.csvData['china'], function(chinaMap) {

			//所有市的数据
			var places = {};
			//连线的数据
			var routes = [];

			chinaMap.forEach(function(d) {
				that.dataset.forEach(function(e) {
					if (e[0] == d.市名称 || e[1] == d.市名称) {
						places[d.市名称] = {}
						var obj = {};
						obj.key = d.市名称
						obj.value = [d.longitude, d.latitude]
						obj.message = e
						places[d.市名称] = obj
					}
				})
			})

			that.dataset.forEach(function(d) {
				var route = {};
				route.type = "LineString";
				var a = d[0];
				var b = d[1];

				route.coordinates = [
					places[a] == null ? 0 : places[a].value,
					places[b] == null ? 0 : places[b].value
				];
				routes.push(route);
			})

			content.selectAll("circle")
				.data(d3.entries(places))
				.enter().append("circle")
				.attr("class", "points")
				
				.attr("transform", function(d) {
					return "translate(" + projection(d.value.value) + ")";
				})
				.attr("id", function(d, i) {
					return "circles" + i
				})
				.attr("class", function(d, i) {

					var domObj = d3.select(this)[0][0];
					var textObj = {};				
				
					textObj.parentG = content;

					textObj.transform = "translate(" + projection(d.value.value) + ")"

					textObj.data  = []
					
					textObjData = d.value.message
					
					for (var j = 0; j < 2; j++) {
						 textObj.data.push(textObjData[j])
					}

					var obj = {
						dom: domObj,

						text: textObj,

						data: d.value.message

					}

					STH.util.MY.data(domObj, "data", obj);

					return "mouse-obj";
				})
				.attr("r", 0.01)
				.attr("fill", function() {

					return colorset[2];
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

					var key = d.value.message

					d3.select(this).attr("fill", function() {
						return colorset[2]
					})
					var animate = d3.selectAll(".animate")
					var route = d3.selectAll(".route")
					if (animate[0].length > 0 && route[0].length > 0) {
						animate.remove()
						route.remove()
					}

					routes.forEach(function(e) {						
						var line = content.append("path")
							.datum(e)
							.filter(function(e) {
								var flag = false;

								if (d.value.value == e.coordinates[0]) {
									flag = true;
								}

								return flag ? this : null
							})
							.attr("class", "route")
							.attr("d", path)
							.attr("stroke-width", "1px")
							.attr("stroke", function() {
								return colorset[3]
							})
							.attr("fill", "none")
							.on("mouseover", function(d) {

								d3.select(this).attr("stroke-width", "2px");
							})
							.on("mouseout", function(d) {
								d3.select(this).attr("stroke-width", "1px");
							});
						var line2 = content.append("path")
							.datum(e)
							.filter(function(e) {
								var flag = false;

								if (d.value.value == e.coordinates[0]) {
									flag = true;
								}

								return flag ? this : null
							})
							.attr("class", "route")
							.attr("d", path)
							.attr("stroke-width", "0.5px")
							.attr("stroke", function() {
								return colorset[4]
							})
							.attr("fill", "none")
							.call(end)

					})
					if (d3.selectAll(".route")[0].length != 0) {
						d3.select(this)
							.append("animate")
							.attr("class", "animate")
							.attr("attributeName", "r")
							.attr("from", 1)
							.attr("to", 10)
							.attr("begin", "0s")
							.attr("dur", "1s")
							.attr("repeatCount", "indefinite")
					}
				})
				.transition()
				.duration(that.animate)
				.attr("r", 7)
				that.hasMessage()
			function end(line) {
				line.transition()
					.duration(that.animate)

				.attrTween("stroke-dasharray", tweenDash)
					.each("end", function() {
						d3.select(this).call(end);
					});
			}

			function tweenDash() {
				var l = this.getTotalLength(),
					i = d3.interpolateString("0,kkk" + l, l + "," + l);
				return function(t) {
					return i(t);
				};
			}

                //d3.selectAll("circle").select("#circles0").on("click");


		})
	})
}
STH.UIChart.prototype.updatechinaMapLine = function() {
	this.drawchinaMapLine()
}