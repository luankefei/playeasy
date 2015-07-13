STH.UIChart.prototype.drawsimpleForce = function() {
	var that = this
		//todo  清空 svg中的内容
	d3.select(that.svg)[0][0][0][0].innerHTML = '';
	// 无数据, 不绘图
	if (that.dataset.length < 1) {
		return;
	}

	var data = [];
	that.dataset.forEach(function(d, i) {
		var obj = {
			source: d[0],
			target: d[1],
			size: parseFloat(d[2]) == null ? 0 : parseFloat(d[2]),
			message: d
		}
		data.push(obj);
	})
	that.dataset = data;

	var lScale = d3.scale.linear()
		.domain([d3.min(that.dataset, function(d) {
			return d.size;
		}), d3.max(that.dataset, function(d) {
			return d.size;
		})])
		.range([1, 3]);
	var dScale = d3.scale.linear()
		.domain([d3.min(that.dataset, function(d) {
			return d.size;
		}), d3.max(that.dataset, function(d) {
			return d.size;
		})])
		.range([that.width * 0.25, that.width * 0.05])
	var links = that.dataset;
	var nodes = {};

	links.forEach(function(link) {

		link.source = nodes[link.source] || (nodes[link.source] = {
			name: link.source,
			message: link.message
		});
		link.target = nodes[link.target] || (nodes[link.target] = {
			name: link.target,
			message: link.message
		});
	});
	var force = d3.layout.force()
		.nodes(d3.values(nodes))
		.links(links)
		.size([that.width, that.height])
		.linkDistance(function(d) {
			return dScale(d.size);
		})
		.charge(-50)
		.alpha(1)
		.start();
	var rScale = d3.scale.linear()
		.domain([d3.min(force.nodes(), function(d) {
			return d.weight;
		}), d3.max(force.nodes(), function(d) {
			return d.weight;
		})])
		.range([5, 10])
	var circle = that.svg.selectAll("circle")
		.data(force.nodes())
		.enter()
		.append("circle")
		.attr("r", function(d, i) {

			return rScale(d.weight);
		})
		.style("fill", function(d, i) {
			if (i == 0) {
				return that.colorset[2]
			}
			return that.colorset[3];
		})
		.attr("class", function(d, i) {

			var domObj = d3.select(this)[0][0];
			//var textObj = {};

			/*textObj.parentG = that.svg;

			textObj.x = null;

			textObj.y = null;

			textObj.data = d.message*/

			var obj = {
				dom: domObj,
				data: d.message,
				//text: textObj
			}

			STH.util.MY.data(domObj, "data", obj);

			return "mouse-obj";
		})
		.on("click", function(d) {
			/*key = d.message
			chartLink.link(key, linkSelector);*/
			if (that.linkChart != null && that.linkChart != "undefined") {
				var chart = d3.select(this)[0][0]
				STH.util.clickEvent(chart, that)
			}
		})
		.call(force.drag)

	var text = that.svg.selectAll("text")
		.data(force.nodes())
		.enter()
		.append("text")
		.attr("class", "text")
		.text(function(d) {
			return d.name;
		})


	var line = that.svg.selectAll("line")
		.data(force.links())
		.enter()
		.append("line")
		.style("stroke", function(d, i) {
			return that.colorset[4];
		})
		.style("stroke-width", function(d) {

			return 2;
		})

	force.on("tick", tick)

	function tick() {
		circle.attr("cx", function(d, i) {
				return d.x;
			})
			.attr("cy", function(d, i) {
				return d.y;
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
		line.attr("x1", function(d) {
				return d.source.x;
			})
			.attr("y1", function(d) {
				return d.source.y;
			})
			.attr("x2", function(d) {
				return d.target.x;
			})
			.attr("y2", function(d) {
				return d.target.y;
			})

		text.attr("x", function(d, i) {
				return d.x;
			})
			.attr("y", function(d, i) {
				return d.y;
			});


	}
}
STH.UIChart.prototype.updatesimpleForce = function() {
	this.drawsimpleForce()
}