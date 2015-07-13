STH.UIChart.prototype.drawcirclePack = function() {
	var that = this
		//todo  清空 svg中的内容
	d3.select(that.svg)[0][0][0][0].innerHTML = '';
	// 无数据, 不绘图
	if (that.dataset.length < 1) {
		return;
	}

	var root = that.dataset;
	var colorset = []
	var outerRadius = d3.min([that.width - that.margin.left - that.margin.right,
		that.height - that.margin.top - that.margin.bottom
	]);
	var innerRadius = outerRadius;
	var x = d3.scale.linear()
		.range([0, innerRadius]);

	var y = d3.scale.linear()
		.range([0, innerRadius]);

	var colorsT = [];
	colorsT[0] = (that.colorset[1] == null ? '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6) : that.colorset[1]);
	colorsT[1] = (that.colorset[2] == null ? '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6) : that.colorset[2]);

	var colordata = d3.rgb(colorsT[0]).hsl();
	var color = d3.scale.linear()
		.domain([-1, 5])
		.range(["hsl(" + Math.round(colordata.h) + "," + Math.round(colordata.s * 100) + "%," + 80 + "%)",
			"hsl(" + Math.round(colordata.h) + "," + Math.round(colordata.s * 100) + "%," + 20 + "%)"
		])
		.interpolate(d3.interpolateHcl)

	var rScale = d3.scale.linear().domain([d3.min(that.dataset, function(d) {
		return parseFloat(d[1]) == null ? 0 : parseFloat(d[1])
	}), d3.max(that.dataset, function(d) {
		return parseFloat(d[1]) == null ? 0 : parseFloat(d[1])
	})]).range([2, 8])

	var pack = d3.layout.pack()
		.padding(2)
		.size([that.width - that.margin.left - that.margin.right,
			that.height - that.margin.top - that.margin.bottom])
		.value(function(d) {
			return d.size;
		})

	var focus = root,
		nodes = pack.nodes(root);
	nodes.x = that.width * 0.5;
	nodes.y = that.height * 0.5;
	content = that.svg.append("g")
		.attr("class", "content")
		.attr("transform", "translate(" + that.margin.left + "," + that.margin.top + ")")
	content.selectAll("circle")
			.data(nodes)
			.enter()				
			.append("circle")		
			.attr("transform", function(d) {
				return "translate(" + d.x + "," + d.y + ")";
			})
			.attr("r", function(d) {
				return 0
			})
			.style("fill", function(d) {
				return d.children ? color(d.depth) : colorsT[1];
			})
			.attr("class", function(d, i) {

	            var domObj = d3.select(this)[0][0];

	          	var textObj = {}

				textObj.parentG = content;

				textObj.x = d.x;

				textObj.y = d.y;

				textObj.data = d.message[0]

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
	        .on("click", function(d, i) {

	            if (that.linkChart != null && that.linkChart != "undefined") {
	                var chart = d3.select(this)[0][0]
	                STH.util.clickEvent(chart, that)
	            }

	        })
	        .transition()
			.duration(that.animate)
	        .attr("r", function(d) {
				return d.r;
			})
        that.hasMessage()
	
}
STH.UIChart.prototype.updatecirclePack = function() {
	var that = this
	var root = that.dataset;
	var colorset = []
	var outerRadius = d3.min([that.width - that.margin.left - that.margin.right,
		that.height - that.margin.top - that.margin.bottom
	]);
	var innerRadius = outerRadius;
	var x = d3.scale.linear()
		.range([0, innerRadius]);

	var y = d3.scale.linear()
		.range([0, innerRadius]);

	var colorsT = [];
	colorsT[0] = (that.colorset[1] == null ? '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6) : that.colorset[1]);
	colorsT[1] = (that.colorset[2] == null ? '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6) : that.colorset[2]);

	var colordata = d3.rgb(colorsT[0]).hsl();
	var color = d3.scale.linear()
		.domain([-1, 5])
		.range(["hsl(" + Math.round(colordata.h) + "," + Math.round(colordata.s * 100) + "%," + 80 + "%)",
			"hsl(" + Math.round(colordata.h) + "," + Math.round(colordata.s * 100) + "%," + 20 + "%)"
		])
		.interpolate(d3.interpolateHcl)

	var rScale = d3.scale.linear().domain([d3.min(that.dataset, function(d) {
		return parseFloat(d[1]) == null ? 0 : parseFloat(d[1])
	}), d3.max(that.dataset, function(d) {
		return parseFloat(d[1]) == null ? 0 : parseFloat(d[1])
	})]).range([2, 8])

	var pack = d3.layout.pack()
		.padding(2)
		.size([that.width - that.margin.left - that.margin.right,
			that.height - that.margin.top - that.margin.bottom])
		.value(function(d) {
			return d.size;
		})

	var focus = root,
		nodes = pack.nodes(root);
	nodes.x = that.width * 0.5;
	nodes.y = that.height * 0.5;
	content = that.svg.select(".content")

	circles = content.selectAll("circle")
					.data(nodes)
		
	circles.exit()
			.transition()
			.duration(that.animate)
			.attr("r", function(d) {
	      	  	return 0
	   		 })
			.remove(); 	
	
	circles.transition()
			.duration(that.animate)
			.attr("transform", function(d) {
				return "translate(" + d.x + "," + d.y + ")";
			})
			.attr("r", function(d) {
				return d.r;
			})
			.style("fill", function(d) {
				return d.children ? color(d.depth) : colorsT[1];
			})

	circles.enter()
			.append("circle")	
			.style("fill", function(d) {
				return d.children ? color(d.depth) : colorsT[1];
			})
			.attr("transform", function(d) {
				return "translate(" + d.x + "," + d.y + ")";
			})
			.attr("r", function(d) {
				return 0;
			})	
			.transition()
			.duration(that.animate)
			.attr("r", function(d) {
	      	  	return d.r;
	   		 })
	
	 circles.call(commonEvent)   

    function commonEvent() {

		this.attr("class", function(d, i) {

				var domObj = d3.select(this)[0][0];

				var textObj = {}

				textObj.parentG = content;

				textObj.x = d.x;

				textObj.y = d.y;

				textObj.data = d.message[0]

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
			.on("click", function(d, i) {
				if (that.linkChart != null && that.linkChart != "undefined") {
					var chart = d3.select(this)[0][0]
					STH.util.clickEvent(chart, that)
				}
			})
			
	}  			
			
	that.updateMessage()
			
        
}