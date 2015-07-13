STH.UIChart.prototype.drawprocessBar = function() {
	var that = this
		//todo  清空 svg中的内容
	d3.select(that.svg)[0][0][0][0].innerHTML = '';
	// 无数据, 不绘图
	if (that.dataset.length < 1) {
		return;
	}
	
	var dataset = []
	that.dataset.forEach(function(d, i) {
		if (i < 2) {
		dataset.push(d[1]);
	}
	});

	var outerR = 150;
	var innerR = outerR * 0.8
	var barH = outerR * 0.2;
	var path = "M100.151,150.267c-5.376,0-100.017,9.734-100.017,9.734s94.641,9.732,100.017,9.732c5.375,0,9.732-4.357,9.732-9.732C109.884,154.624,105.526,150.267,100.151,150.267z";
	//进度条的进度
	var sum = d3.sum(dataset)
	var pointer = (dataset[0] * 100 / sum).toFixed(2)	
	var endA = d3.scale.linear()
		.domain([0, sum])
		.range([-Math.PI * 0.5, Math.PI * 0.5])
		//指针的偏移；
	var endA2 = d3.scale.linear()
		.domain([0, sum])
		.range([0, 180])
	d3.select(that.svg[0][0].parentNode)
		.attr("viewBox", "0 0 500 364")

	var pie = d3.layout.pie();
	var arc1 = d3.svg.arc()
		.innerRadius(innerR)
		.outerRadius(outerR);
	var arc = d3.svg.arc()
		.innerRadius(innerR)
		.outerRadius(outerR)

	var content = that.svg.selectAll(".arc")
		.data(new Array([dataset[1]]))
		.enter()
		.append("g")
		.attr("class","content")

	content.append("path")
		.attr("fill", function() {
			return that.colorset[2];
		})
		.attr("class", function(d, i) {
			
			var domObj = d3.select(this)[0][0];

			var textObj = {};

			var angle = 180 * pointer *0.01
			
			var x = Math.abs(Math.sin(angle) * outerR)

			var y = Math.abs(Math.cos(angle) * outerR)

			textObj.parentG = content;

			textObj.x = (that.width*0.5 + x -23) +(outerR-x )* 0.35;

			textObj.y = that.height - outerR * 0.7 - (y *0.5) ;
		
			textObj.data = dataset[1]

			var obj = {
				dom: domObj,
				data: that.dataset[1],
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
		.attr("d", arc1.startAngle((-Math.PI * 0.5)).endAngle(Math.PI * 0.5))
		.attr("transform", "translate(" + (0.5 * that.width) + "," + (that.height - outerR * 0.7) + ")")

	content.selectAll(".arc")
		.data(function() {
			return pie(new Array([dataset[0]]));
		})
		.enter().append("path")
		.attr("fill", function() {
			return that.colorset[3];
		})
		.attr("class", "arc")
		.attr("transform", "translate(" + (0.5 * that.width) + "," + (that.height - outerR * 0.7) + ")")
		.attr("class", function(d, i) {

			var domObj = d3.select(this)[0][0];

			var textObj = {};

			var angle = 180 * pointer *0.01
			
			var x = Math.abs(Math.sin(angle) * outerR)

			var y = Math.abs(Math.cos(angle) * outerR)
			textObj.parentG = content;

			textObj.x = (that.width*0.5 - x ) -(outerR-x )* 0.5;

			textObj.y = that.height - outerR * 0.7 - (y * 0.5);
		
			textObj.data = dataset[0]

			//if (that.time)

			var obj = {
				dom: domObj,
				data: that.dataset[0],
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
			//mouseEvent.mouseOut();
		})
		.on("click", function(d, i) {

			if (that.linkChart != null && that.linkChart != "undefined") {
				var chart = d3.select(this)[0][0]
				STH.util.clickEvent(chart, that)
			}

		})
		.transition()
		.duration(that.animate)
		.ease("linear")
		.attrTween("d", function(d) {
			var s = eval(-Math.PI * 0.5);
			var e = eval(-Math.PI * 0.5);
			var i = d3.interpolate({
				startAngle: endA(0),
				endAngle: endA(0)
			}, {
				startAngle: endA(0),
				endAngle: endA(dataset[0])
			})
			return function(t) {
				return arc(i(t))
			};
		})

	content.append("circle")
		.attr("cx", 0.5 * that.width)
		.attr("cy", that.height - outerR * 0.7)
		.attr("r", (outerR - innerR) * 0.5)
		.attr("fill", function() {
			return that.colorset[3];
		});
	content.append("polygon")
		.attr("points", "" + (0.5 * that.width - innerR) + "," + (that.height - outerR * 0.7) + " " + (0.5 * that.width) + "," + (that.height - outerR * 0.7 + (outerR - innerR) * 0.5) + " " + (0.5 * that.width) + "," + (that.height - outerR * 0.7 - (outerR - innerR) * 0.5))
		.style("fill", function() {
			return that.colorset[3];
		})
		.transition()
		.duration(that.animate)
		.ease("linear")
		.attrTween("transform", function() {
			var i = d3.interpolate([endA2(0), 0.5 * that.width, that.height - outerR * 0.7], 
				[endA2(dataset[0], 0.5 * that.width, that.height - outerR * 0.7)])
			return function(t) {
				return "rotate(" + i(t) + ")"
			}
		});
	
	that.hasMessage()
}
STH.UIChart.prototype.updateprocessBar = function() {
	this.drawprocessBar()
	
}
