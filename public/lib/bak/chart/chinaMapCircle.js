STH.UIChart.prototype.drawchinaMapCircle = function() {
	var that = this
		//todo  清空 svg中的内容
	d3.select(that.svg)[0][0][0][0].innerHTML = '';
	// 无数据, 不绘图
	if (that.dataset.length < 1) {
		return;
	}

	var projection = d3.geo.mercator()
		.scale(3000)
		.center([481, 30])

	var rScale_data = [d3.min(that.dataset, function(d) {
		return parseFloat(d[1]) == null ? 0 : parseFloat(d[1])
	}), d3.max(that.dataset, function(d) {
		return parseFloat(d[1]) == null ? 0 : parseFloat(d[1])
	})]

	that.rScale = STH.util.scale(
		"linear",
		rScale_data,
		"range", [6, 12])

	var path = d3.geo.path().projection(projection)

	var content = that.svg.append("g")
		.attr("class", "content")
		.attr("transform", "translate(" + that.margin.left + ", " + that.margin.top + ")");




	d3.json(STH.resource.jsonData['china'], function(json) {
		//绘制中国地图
		content.selectAll("path")
			.data(json.features)
			.enter()
			.append("path")
			.attr("d", path)
			.attr("fill", function(d, i) {
				return that.colorset[0];
			})
			.attr("stroke-width", "1px")
			.attr("stroke-linejoin", "round")
			.attr("stroke", function(d, i) {

				return that.colorset[0];
			})

		//绘制地图上的点
		d3.csv(STH.resource.csvData['china'], function(chinaMap) {
			//所有市的数据
			var places = {};
			//连线的数据
			var routes = [];
			chinaMap.forEach(function(d) {
				that.dataset.forEach(function(t) {
					if (t[0] == d.市名称) {
						places[t] = [d.longitude, d.latitude];

					}
				})


			})

			var point = content.selectAll("circle")
				.data(d3.entries(places))
				.enter()
				.append("circle")
				.attr("class", "points")
				.attr("transform", function(d) {
					return "translate(" + projection(d.value) + ")";
				})
				.attr("r", function(d) {

					return 0.01
				})
				.attr("fill", function(d, i) {
					if (i < that.colorset.length - 1) {
						color = that.colorset[i + 1]
					} else {
						hsl = "hsl(" + Math.random() * 1000 + ", 70%, 60%)";
						color = d3.hsl(hsl).rgb().toString();
					}
					that.colorset.push(color);
					return color;
				})
				.attr("class", function(d, i) {

					var domObj = d3.select(this)[0][0];

					var textObj = {};

					textObj.parentG = content;

					textObj.transform = "translate(" + projection(d.value) + ")"

					textObj.data  = []

					textObjData = d.key.split(",")

					for (var j = 0; j < 2; j++) {
						 textObj.data.push(textObjData[j])
					}

					var obj = {
						dom: domObj,
						data: d.key.split(","),
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
					var num = d.key.split(",")
					return that.rScale(parseFloat(num[1]))
				})

				that.hasMessage()
		})
	})
}
STH.UIChart.prototype.updatechinaMapCircle = function() {
	this.drawchinaMapCircle()
}