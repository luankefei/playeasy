STH.UIChart.prototype.drawcircleArc = function() {
	var that = this
		//todo  清空 svg中的内容
	d3.select(that.svg)[0][0][0][0].innerHTML = '';
	// 无数据, 不绘图
	if (that.dataset.length < 1) {
		return;
	}

	var data = [];

	that.dataset.forEach(function(d, i) {
		if (i == 0) {
			legendData = d.slice(1);
		} else {
			data.push(d.slice(1));
		}
	});

	//console.log(data)
	var messageData = data;
	var dataTemp = [];

	data.forEach(function(d, i) {
		dataTemp[i] = [];
		d.forEach(function(e, j) {

			var t = e[1];
			dataTemp[i].push(t);

		})

	})

	that.dataset = dataTemp;

	var chord = d3.layout.chord()
		.padding(.05)
		.matrix(that.dataset);

	var colorset = [];
	var innerRadius = Math.min(that.width - that.margin.left - that.margin.right,
			that.height - that.margin.top - that.margin.bottom) * .47,
		outerRadius = innerRadius * 1.1;

	var svg = that.svg
		.append("g")
		.attr("transform", "translate(" + that.width / 2 + "," + that.height / 2 + ")");

	svg.append("g").attr("class", "path").selectAll("path")
		.data(chord.groups)
		.enter().append("path")
		.style("fill", function(d) {

			return that.colorset[d.index];
		})
		.style("stroke", function(d) {
			return that.colorset[d.index];
		})
		.attr("d", d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius))
		.on("mouseover", fade(.1))
    	.on("mouseout", fade(1));

	var ticks = svg.append("g")
		.attr("class", "text")
		.selectAll("g")
		.data(chord.groups)
		.enter().append("g").selectAll("g")
		.data(groupTicks)
		.enter().append("g")
		.attr("transform", function(d) {
			return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")" + "translate(" + outerRadius + ",0)";
		});

	ticks.append("line")
		.attr("x1", 1)
		.attr("y1", 0)
		.attr("x2", 5)
		.attr("y2", 0)
		.style("stroke", "#000");

	ticks.append("text")
		.attr("class", "text")
		.attr("x", function(d) {
			return d.angle > Math.PI ? 4 : 16;
		})
		.attr("dy", ".35em")
		.attr("text-anchor", function(d) {
			return d.angle > Math.PI ? "end" : null;
		})
		.attr("transform", function(d) {
			return d.angle > Math.PI ? "rotate(180)translate(-25)" : null;
		})
		.text(function(d) {
			return d.label;
		});

	svg.append("g")
		.attr("class", "chord")
		.selectAll("path")
		.data(chord.chords)
		.enter().append("path")
		.attr("id", "mouseNode")
		.attr("d", d3.svg.chord().radius(innerRadius))
		.style("fill", function(d, i) {
			return that.colorset[d.target.index]
		})
		.attr("class", function(d, i) {

			var domObj = d3.select(this)[0][0];

			var textObj = {}

			textObj.parentG = ticks;

			textObj.x = d.angle > Math.PI ? 4 : 16;

			textObj.y = 0;

			textObj.data = d.label

			var obj = {
				dom: domObj,
				data: messageData[d.source.index][d.target.index],
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

	function groupTicks(d) {
		var k = (d.endAngle - d.startAngle) / d.value;
		//d3.range(0, d.value, 1000) 这样设置的坐标刻度在边上
		return d3.range(d.value / 2, d.value, d.value / 2)
			.map(function(v, i) {
				return {
					angle: v * k + d.startAngle,
					label: legendData[d.index],
				};
			});
	}


	function fade(opacity) {
		return function(g,i) {
			svg.selectAll(".mouse-obj")
				.filter(function(d) {
					return d.source.index != i && d.target.index != i;
				})
				.transition()
				.style("opacity", opacity);
		};
	}

}
STH.UIChart.prototype.updatecircleArc = function() {
	this.drawcircleArc()


}