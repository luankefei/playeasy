STH.UIChart.prototype.drawchinaMap = function() {
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
	var color = d3.rgb(that.colorset[1]).hsl();

	var colordata = d3.scale.linear()
		.domain([d3.max(that.dataset, function(d) {
				return parseFloat(d[1]);
			}),
			d3.min(that.dataset, function(d) {
				return parseFloat(d[1]);
			})
		])
		.range(["hsl(" + Math.round(color.h) + "," + Math.round(color.s * 100) + "%," + 30 + "%)",
			"hsl(" + Math.round(color.h) + "," + Math.round(color.s * 100) + "%," + 70 + "%)"
		])
		.interpolate(d3.interpolateHcl)
		/*d3.select(svg[0][0].parentNode)
		    .attr("viewBox", "0 0 199 149");*/

	var content = that.svg.append("g")
		.attr("class", "content")
		.attr("transform", "translate(" + that.margin.left + ", " + that.margin.top + ")");

	var path = d3.geo.path().projection(projection);


	d3.json(STH.resource.jsonData['china'], function(json) {
		content.selectAll("path")
			.data(json.features)
			.enter()
			.append("path")
			.attr("d", path)
			.attr("scale","")
			.attr("fill", function(d, i) {

				return colordata(parseFloat(that.dataset[i][1]));
			})
			.attr("stroke-width", "1px")
			.attr("stroke-linejoin", "round")
			.attr("stroke", function(d, i) {

				return colordata(parseFloat(that.dataset[i][1]));
			})
			.attr("class", function(d, i) {
						
				var domObj = d3.select(this)[0][0];

				var textObj = {}

					textObj.parentG = content;


					textObj.transform = "translate("+projection( [d.properties.cp[0],
						d.properties.cp[1]])+")"


					textObj.data = that.dataset[i][0]

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

			that.hasMessage()
	})


}
STH.UIChart.prototype.updatechinaMap = function() {
	this.drawchinaMap()
}