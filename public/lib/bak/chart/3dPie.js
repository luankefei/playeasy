STH.UIChart.prototype.draw3dPie = function() {
	var that = this
	d3.select(that.svg)[0][0][0][0].innerHTML = '';
	if (that.dataset.length == 0) {
		return;
	}
	var Donut3D = {};
	var data = [];

	function jsonData(dataset) {

		dataset.forEach(function(d, i) {
			var temp = {
				label: "i" + i,
				value: d[1],
				color: that.colorset[i],
				enabled: false
			};
			data.push(temp);
		});
		return data;
	};

	function pieTop(d, rx, ry, ir) {
		if (d.endAngle - d.startAngle == 0) return "M 0 0";
		var sx = rx * Math.cos(d.startAngle),
			sy = ry * Math.sin(d.startAngle),
			ex = rx * Math.cos(d.endAngle),
			ey = ry * Math.sin(d.endAngle);

		var ret = [];
		ret.push("M", sx, sy, "A", rx, ry, "0", (d.endAngle - d.startAngle > Math.PI ? 1 : 0), "1", ex, ey, "L", ir * ex, ir * ey);
		ret.push("A", ir * rx, ir * ry, "0", (d.endAngle - d.startAngle > Math.PI ? 1 : 0), "0", ir * sx, ir * sy, "z");
		return ret.join(" ");
	}

	function pieOuter(d, rx, ry, h) {
		var startAngle = (d.startAngle > Math.PI ? Math.PI : d.startAngle);
		var endAngle = (d.endAngle > Math.PI ? Math.PI : d.endAngle);

		var sx = rx * Math.cos(startAngle),
			sy = ry * Math.sin(startAngle),
			ex = rx * Math.cos(endAngle),
			ey = ry * Math.sin(endAngle);

		var ret = [];
		ret.push("M", sx, h + sy, "A", rx, ry, "0 0 1", ex, h + ey, "L", ex, ey, "A", rx, ry, "0 0 0", sx, sy, "z");
		return ret.join(" ");
	}

	function pieInner(d, rx, ry, h, ir) {
		var startAngle = (d.startAngle < Math.PI ? Math.PI : d.startAngle);
		var endAngle = (d.endAngle < Math.PI ? Math.PI : d.endAngle);

		var sx = ir * rx * Math.cos(startAngle),
			sy = ir * ry * Math.sin(startAngle),
			ex = ir * rx * Math.cos(endAngle),
			ey = ir * ry * Math.sin(endAngle);

		var ret = [];
		ret.push("M", sx, sy, "A", ir * rx, ir * ry, "0 0 1", ex, ey, "L", ex, h + ey, "A", ir * rx, ir * ry, "0 0 0", sx, h + sy, "z");
		return ret.join(" ");
	}

	function getPercent(d) {
		return (d.endAngle - d.startAngle > 0.2 ?
			Math.round(1000 * (d.endAngle - d.startAngle) / (Math.PI * 2)) / 10 + '%' : '');
	}
	Donut3D.draw = function(svg, data, x, y,
		rx /*radius x*/ , ry /*radius y*/ , h /*height*/ , ir /*inner radius*/ ) {

		var _data = d3.layout.pie().sort(null).value(function(d) {
			return d.value;
		})(data);


		var content = svg.append("g")
			.attr("transform", "translate(" + x + "," + y + ")")
			.attr("class", "content");
		var g = content.selectAll(".g")
			.data(_data)
			.enter()
			.append("g");

		g.append("path")
			.attr("class", "innerSlice")
			.style("fill", function(d) {
				return d3.hsl(d.data.color).darker(0.7);
			})
			.attr("d", function(d) {
				return pieInner(d, rx + 0.5, ry + 0.5, h, ir);
			})

			.each(function(d) {
				this._current = d;
			});
		g.append("path")
			.attr("class", "topSlice")
			.style("fill", function(d) {
				return d.data.color;
			})
			.style("stroke", function(d) {
				return d.data.color;
			})
			.attr("d", function(d) {
				return pieTop(d, rx, ry, ir);
			})

			.each(function(d) {
				this._current = d;
			})

		g.append("path")
			.attr("class", "outerSlice")
			.style("fill", function(d) {
				return d3.hsl(d.data.color).darker(0.7);
			})
			.attr("d", function(d) {
				return pieOuter(d, rx - .5, ry - .5, h);
			})

			.each(function(d) {
				this._current = d;
			});

		g.attr("class", function(d, i) {

			var domObj = d3.select(this)[0][0];

			var textObj = {};

				textObj.parentG = content;

				textObj.x =  rx * (Math.cos(d.startAngle) + Math.cos(d.endAngle)) * 0.5;

				textObj.y = parseFloat(ry * (Math.sin(d.startAngle) + Math.sin(d.endAngle)) * 0.5);

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
				// 联动 mouseover
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
				var vectx, vecty;
				vectx = 10 * Math.cos((d.startAngle + d.endAngle) * 0.5)
				vecty = 10 * Math.sin((d.startAngle + d.endAngle) * 0.5)
				d.enabled = !d.enabled;
				if (d.enabled) {
					d3.select(this)
						.attr("transform", "translate(" + vectx + "," + vecty + ")")
				} else {
					d3.select(this)
						.attr("transform", "translate(" + "0" + "," + "0" + ")")
				}
				/*key = chartJson.data[i];
				chartLink.link(key, linkSelector);*/

			})
	}

	Donut3D.draw(that.svg,
		jsonData(that.dataset),
		that.width * 0.5,
		that.height * 0.5 - Math.min(that.width * 0.5, that.height * 0.5) * 0.1,
		Math.min(that.width * 0.5, that.height * 0.5) * 0.85,
		Math.min(that.width * 0.5, that.height * 0.5) * 0.3,
		Math.min(that.width * 0.5, that.height * 0.5) * 0.2,
		0);

	that.hasMessage()
}
STH.UIChart.prototype.update3dPie = function() {
	this.draw3dPie();

}