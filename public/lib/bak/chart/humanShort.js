STH.UIChart.prototype.drawhumanShort = function() {
	var that = this
		//todo  清空 svg中的内容
	d3.select(that.svg)[0][0][0][0].innerHTML = '';
	// 无数据, 不绘图
	if (that.dataset.length < 1) {
		return;
	}

	var path = "M26.812,28.741L21.53,17.922c-0.186-0.379-0.756-1.089-1.446-1.737c-0.777-1.003-2-1.564-3.871-1.564h-5.064c-0.642,0-1.199" + ",0.072-1.697,0.198c-1.352-0.125-3.577,2.276-3.98,3.104L0.187,28.741c-0.443,0.909-0.07,2.006,0.831,2.45c0.902,0.446,1.993" + ",0.072,2.437-0.835l2.632-4.247v4.701c0,0.232,0.014,0.454,0.034,0.668c-0.014,0.093-0.034,0.174-0.034,0.292v14.414C6.086" + ",47.74,7.339,49,8.885,49c1.545,0,2.798-1.26,2.798-2.815V36.007c0.526,0.055,1.072,0.083,1.636,0.083h0.724c0.563,0,1.108-0.028" + ",1.635-0.083v10.178c0,1.556,1.253,2.815,2.799,2.815s2.799-1.26,2.799-2.815V31.771c0-0.118-0.021-0.199-0.035-0.292c0.021-0.214" + ",0.035-0.436,0.035-0.668v-4.12l2.271,3.666c0.443,0.907,1.534,1.281,2.437,0.835C26.885,30.747,27.257,29.65,26.812,28.741z"
	var sum = 0;
	for (var j = 0; j < that.dataset.length; j++) {
		sum += parseFloat(that.dataset[j][1]);
	}
	var scale = d3.scale.linear()
		.domain([0, sum])
		.range([0, 10]);
	var num;
	var f1 = 0,
		f2 = 0;
	/*d3.select(svg[0][0].parentNode)
	    .attr("viewBox","0  0  300 200");*/
	content = that.svg.append("g")
		.attr("class", "content")
		.attr("transform", "translate(" + that.margin.left + ", " + (that.height * 0.3) + ") scale(1.5, 1.5)")

	for (var j = 0; j < 10; j++) {
		var g = content.append("g")
			.attr("class", "g")
			.attr("that.width", 10)
			.attr("that.height", 10)
			.attr("data-column", j)
			.attr("fill", function() {
				if (j <= Math.round(scale(that.dataset[0][1]))) {
					return that.colorset[1];
				} else if (that.dataset.length > 1) {
					return that.colorset[2];
				}

			})
			.attr("class", function(d, i) {
				var p = d3.select(this).attr("data-column")

				var domObj = d3.select(this)[0][0];

				var textObj = {};

					textObj.parentG = content;

					if (j == parseInt(Math.round(scale(that.dataset[0][1])) / 2)) {
						

						textObj.transform = "translate(" + (j * 30) + "," + (60) + ")"

						textObjData = d3.select(this).attr("data-column").split(",")

						textObj.data = that.dataset[0][1]
	             
	                }

	                if (j == parseInt((10 + Math.round(scale(that.dataset[0][1]))) * 0.5)) {
	           

						textObj.transform = "translate(" + (j * 30) + "," + (60) + ")"

						textObjData = d3.select(this).attr("data-column").split(",")

						textObj.data = that.dataset[1][1]
	                }

				
				if (p <= Math.round(scale(that.dataset[0][1]))) {
					var obj = {
						dom: domObj,
						data: that.dataset[0],
						text: textObj
					}
				} else {
					var obj = {
						dom: domObj,
						data: that.dataset[1],
						text: textObj
					}
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
		g.append("path")
			.attr("d", path)

		.attr("transform", "translate(" + (j * 30) + "," + (0) + ")");

		g.append("ellipse")
			.attr({
				"cx": 13.138,
				"cy": 7.275,
				"rx": 7.232,
				"ry": 7.275
			})
			.attr("transform", "translate(" + (j * 30) + "," + (0) + ")")
			/*if (dataset.message.show) {

			    if (j == parseInt(Math.round(scale(dataset.data[0][1])) / 2)) {
			        g.append("text")
			            .attr("class", "text")
			            .attr("x", 0)
			            .attr("y", 60)
			            .text(function() {
			                if (j <= Math.round(scale(dataset.data[0][1]))) {
			                    return dataset.data[0][1];
			                } else if (dataset.data.length > 1) {
			                    return dataset.data[1][1];
			                }
			            })
			            .attr("transform", "translate(" + (j * 30) + "," + (0) + ")")
			    }
			    if (j == parseInt((10 + Math.round(scale(dataset.data[0][1]))) * 0.5)) {
			        g.append("text")
			            .attr("class", "text")
			            .attr("x", 0)
			            .attr("y", 60)
			            .text(function() {
			                if (j <= Math.round(scale(dataset.data[0][1]))) {
			                    return dataset.data[0][1];
			                } else if (dataset.data.length > 1) {
			                    return dataset.data[1][1];
			                }
			            })
			            .attr("transform", "translate(" + (j * 30) + "," + (0) + ")")
			    }
			}*/
	}
	that.hasMessage()
}
STH.UIChart.prototype.updatehumanShort = function() {
	this.drawhumanShort()
}