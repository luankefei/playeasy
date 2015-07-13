STH.UIChart.prototype.drawsimpleTree = function() {

	var that = this
		//todo  清空 svg中的内容
	d3.select(that.svg)[0][0][0][0].innerHTML = '';
	// 无数据, 不绘图
	if (that.dataset.length < 1) {
		return;
	}

	var root = that.dataset;
	var i = 0
	var r = d3.min([that.width, that.height]) * 0.02
	var tree = d3.layout.tree()
		.size([that.height - that.margin.bottom - that.margin.top,
			that.width - that.margin.left - that.margin.right
		]);

	var diagonal = d3.svg.diagonal()
		.projection(function(d) {
			return [d.y, d.x];
		});

	var content = that.svg.append("g")
		.attr("class", "content")
		.attr("transform", "translate(" + 2 * that.margin.left + ", " + that.margin.top + ")")

	root.x0 = that.height * 0.5 + that.margin.left;
	root.y0 = 0;
	init();

	function init() {
		if (root.children[1] != null) {
			toggle(root.children[1]);
		}
		update(root);
	}

	function toggle(d) {
		if (d != null) {
			if (d.children) {

				d._children = d.children;
				d.children = null;
			} else {
				d.children = d._children;
				d._children = null;
			}

		}
	}

	function toggleAll(d) {
		if (d.children) {
			d.children.forEach(toggleAll);
			toggle(d);
		}
	}

	function update(source) {
		var duration = that.animate
		var nodes = tree.nodes(root).reverse();
		nodes.forEach(function(d) {
			d.y = d.depth * (that.width * 0.15);
		});
		var node = content.selectAll("g.node")
			.data(nodes, function(d) {
				return d.id || (d.id = ++i);
			});
		var nodeEnter = node.enter().append("g")
			.attr("class", "node")
			.attr("transform", function(d) {
				return "translate(" + source.y0 + "," + source.x0 + ")"
			})

		nodeEnter.append("circle")
			.attr("r", 1e-6)
			.style("fill", function(d) {
				return d._children ? that.colorset[2] : that.colorset[3];
			})
			.attr("class", function(d, i) {

				var domObj = d3.select(this)[0][0];

				var textObj = {}

				textObj.parentG = nodeEnter;

				textObj.x = d.children || d._children ? -20 : 20;

				textObj.dy = 0.35;

				textObj.anchor = d.children || d._children ? "end" : "start";

				textObj.data = d.name == null ? d.regionName : d.name;

				//textObj.transform = "translate(" + source.y0 + "," + source.x0 + ")"

				var obj = {
					dom: domObj,
					data: d.message,
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
			.on("click", function(d) {
				if (that.linkChart != null && that.linkChart != "undefined") {
					var chart = d3.select(this)[0][0]
					STH.util.clickEvent(chart, that)
				}
				toggle(d);
				update(d);

				//key = d.message;
				//chartLink.link(key, linkSelector)
			})

		var nodeUpdate = node.transition()
			.duration(duration)
			.attr("transform", function(d) {
				return "translate(" + d.y + "," + d.x + ")";
			});

		nodeUpdate.select("circle")
			.attr("r", function(i) {
				return r
			})
			.style("fill", function(d) {
				return d._children ? that.colorset[2] : that.colorset[3];
			})


		/*nodeUpdate.select("text")
			.style("fill-opacity", 1);*/

		var nodeExit = node.exit()
			.transition()
			.duration(duration)
			.attr("transform", function(d) {
				return "translate(" + source.y + "," + source.x + ")";
			})
			.remove();
		nodeExit.select("circle")
			.attr("r", 1e-6)


		/*	nodeExit.select("text")
				.style("fill-opacity", 1e-6);*/


		var link = content.selectAll("path.link")
			.data(tree.links(nodes), function(d) {
				return d.target.id;
			})
		link.enter().insert("svg:path", "g")
			.attr("class", "link")
			.attr("d", function(d) {
				var o = {
					x: source.x0,
					y: source.y0
				};
				return diagonal({
					source: o,
					target: o
				});
			})
			.attr("fill", "none")
			.attr("stroke", that.colorset[4])
			.attr("stroke-width", "1.5px")
			.transition()
			.duration(duration)
			.attr("d", diagonal);
		link.transition()
			.duration(duration)
			.attr("d", diagonal);
		link.exit().transition()
			.duration(duration)
			.attr("d", function(d) {
				var o = {
					x: source.x,
					y: source.y
				};
				return diagonal({
					source: o,
					target: o
				});
			})
			.remove();
		nodes.forEach(function(d) {
			d.x0 = d.x;
			d.y0 = d.y;
		});
	}
	that.hasMessage()

}

STH.UIChart.prototype.updatesimpleTree = function() {
		this.drawsimpleTree()
}