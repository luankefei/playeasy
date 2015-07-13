STH.UIChart.prototype.drawpieSolid = function() {
	var that = this;
	d3.select(this.svg)[0][0][0][0].innerHTML = '';
	if (that.dataset.length == 0 || that.dataset[0].length == 0) {

		return false;
	}

	var dataNum = [];
	var outerRadius = Math.min(that.width - that.margin.left - that.margin.right,
		that.height - that.margin.top - that.margin.bottom) / 2;
	var arc = d3.svg.arc()
		.outerRadius(outerRadius);
	var pie = d3.layout.pie()
		.sort(null)
		.value(function(d) {
			return d[1]
		});

	content = that.svg.append('g')
		.attr('transform', 'translate(' + (that.width / 2 + that.margin.left) + ',' + (outerRadius + that.margin.top) + ')')
		.attr("class", "content")

	rect = content.selectAll('path')
		.data(pie(that.dataset))
		.enter()
		.append('path')
		.attr({
			'fill': function(d, i) {
				d.enabled = true;
				return that.colorset[i];
			},
			'd': 0,
		})
		.attr("class", function(d, i) {

			var domObj = d3.select(this)[0][0];
			var textObj = {};

			textObj.parentG = content;

			textObj.x = (outerRadius*0.8)*Math.cos((d.startAngle+d.endAngle)/2-Math.PI/2);

			textObj.y = (outerRadius*0.8)*Math.sin((d.startAngle+d.endAngle)/2-Math.PI/2);

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
		.on("click", function(e, i) {
			var vectx, vecty;
			vectx = 10 * Math.cos((e.startAngle + e.endAngle) / 2 - Math.PI / 2)
			vecty = 10 * Math.sin((e.startAngle + e.endAngle) / 2 - Math.PI / 2)
			e.enabled = !e.enabled;
			if (!e.enabled) {
				d3.select(this)
					.attr("transform", "translate(" + vectx + "," + vecty + ")")
			} else {
				d3.select(this)
					.attr("transform", "translate(" + "0" + "," + "0" + ")")
			}
			if (that.linkChart != null && that.linkChart != "undefined") {
					var chart = d3.select(this)[0][0]
					STH.util.clickEvent(chart, that)
			}

		})
		.transition()
		.duration(that.animate)
		.attrTween('d', tweenPie) //transition.attrTween在不同attr属性值之间平滑过渡
		.transition()
		.ease('elastic')

        function tweenPie(b) {
            b.innerRadius = 0;
            var i = d3.interpolate({startAngle: 6.28, endAngle: 6.28}, b);
            return function(t) { return arc(i(t)); };
        }

    that.hasMessage()    
}
STH.UIChart.prototype.updatepieSolid = function() {
	//this.drawpieSolid()
	var that = this;	
	var dataNum = [];
	var outerRadius = Math.min(that.width - that.margin.left - that.margin.right,
		that.height - that.margin.top - that.margin.bottom) / 2;
	var arc = d3.svg.arc()
		.outerRadius(outerRadius);
	var pie = d3.layout.pie()
		.sort(null)
		.value(function(d) {
			return d[1]
		});

	content = that.svg.select(".content")
		
	rect = content.selectAll('path')
		.data(pie(that.dataset))

	rect.exit()
		.transition()
        .duration(that.animate)
        .attr("d",0)
        .remove();

    rect.transition()    	
   		.duration(that.animate)      		
		.attr("fill",function(d,i) {
			d.enabled = true;
			return that.colorset[i];
		})						
		//.transition()
		//.ease('elastic')
   		.attrTween("d", function(d) {
			this._current = this._current || d;
			var interpolate = d3.interpolate(this._current, d);
			this._current = interpolate(0);
			return function(t) {
				return arc(interpolate(t));
			};
		}) //transition.attrTween在不同attr属性值之间平滑过渡
		

	rect.enter()
		.append("path")	
		.attr({
			'fill': function(d, i) {
				d.enabled = true;
				return that.colorset[i];
			},
			'd': 0
		})
		/*.attr("fill",function(d, i) {
				d.enabled = true;
				return that.colorset[i];
		})*/
		.transition()		
        .duration(that.animate)
        .attrTween("d", function(d) {
			this._current = this._current || d;
			var interpolate = d3.interpolate(this._current, d);
			this._current = interpolate(0);
			return function(t) {
				return arc(interpolate(t));
			};
		})

   		//.attrTween('d', tweenPie) //transition.attrTween在不同attr属性值之间平滑过渡
	
		
			
	rect.call(commonEvent);
    
    function commonEvent() {
        rect.attr("class", function(d, i) {
            var domObj = d3.select(this)[0][0];

            var textObj = {};

			textObj.parentG = content;

			textObj.x = (outerRadius*0.8)*Math.cos((d.startAngle+d.endAngle)/2-Math.PI/2);

			textObj.y = (outerRadius*0.8)*Math.sin((d.startAngle+d.endAngle)/2-Math.PI/2);

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