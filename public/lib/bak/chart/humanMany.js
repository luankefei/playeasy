STH.UIChart.prototype.drawhumanMany = function() {
	var that = this
		//todo  清空 svg中的内容
	d3.select(that.svg)[0][0][0][0].innerHTML = '';
	// 无数据, 不绘图
	if (that.dataset.length < 1) {
		return;
	}

	var sum = 0;
	var f1 = 0,
        f2 = 0;

	var path = "M26.812,28.741L21.53,17.922c-0.186-0.379-0.756-1.089-1.446-1.737c-0.777-1.003-2-1.564-3.871-1.564h-5.064c-0.642,0-1.199" + ",0.072-1.697,0.198c-1.352-0.125-3.577,2.276-3.98,3.104L0.187,28.741c-0.443,0.909-0.07,2.006,0.831,2.45c0.902,0.446,1.993" + ",0.072,2.437-0.835l2.632-4.247v4.701c0,0.232,0.014,0.454,0.034,0.668c-0.014,0.093-0.034,0.174-0.034,0.292v14.414C6.086" + ",47.74,7.339,49,8.885,49c1.545,0,2.798-1.26,2.798-2.815V36.007c0.526,0.055,1.072,0.083,1.636,0.083h0.724c0.563,0,1.108-0.028" + ",1.635-0.083v10.178c0,1.556,1.253,2.815,2.799,2.815s2.799-1.26,2.799-2.815V31.771c0-0.118-0.021-0.199-0.035-0.292c0.021-0.214" + ",0.035-0.436,0.035-0.668v-4.12l2.271,3.666c0.443,0.907,1.534,1.281,2.437,0.835C26.885,30.747,27.257,29.65,26.812,28.741z"
	for (var j = 0; j < that.dataset.length; j++) {
		sum += parseFloat(that.dataset[j][1]);
	}
	var scale = d3.scale.linear()
		.domain([0, sum])
		.range([0, 50]);

	content = that.svg.append("g")
		.attr("class", "content")
		.attr("transform",
			"translate(" + 6 * that.margin.left + "," + that.margin.top * 2 + ")scale(1.03, 1.03)")
	var num;
	var f1 = 0,
		f2 = 0;
	for (var i = 0; i < that.dataset.length; i++) {
		num = Math.floor(scale(that.dataset[i][1]));

		for (var j = 0; j < num; j++) {

			var g = content.append("g")
				.attr("width", 10)
				.attr("height", 10)
				.attr("data-column", that.dataset[i])
				.attr("class", function(d, i) {

					var domObj = d3.select(this)[0][0];

					var textObj = {};

					textObj.parentG = content;

					if (j == parseInt(num * 0.5)) {


						textObj.transform = "translate(" + (f1 * 30) + "," + (f2 * 65 + 30) + ")"

						textObjData = d3.select(this).attr("data-column").split(",")

						textObj.data = textObjData[1]

					}

					var obj = {
						dom: domObj,
						data:  d3.select(this).attr("data-column").split(","),
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
				.attr("data-id", i)

			g.append("path")
				.attr("d", path)
				.attr("fill", that.colorset[i])
				.attr("transform", "translate(" + (f1 * 30) + "," + (f2 * 65) + ")");
			g.append("ellipse")
				.attr({
					"fill": that.colorset[i],
					"cx": 13.138,
					"cy": 7.275,
					"rx": 7.232,
					"ry": 7.275
				})
				.attr("transform", "translate(" + (f1 * 30) + "," + (f2 * 65) + ")");


			f1++;
			if (f1 == 10) {
				f1 = 0;
				f2++;
			}
		}
	}
	that.hasMessage()
}
STH.UIChart.prototype.updatehumanMany = function() {
	this.drawhumanMany()
}