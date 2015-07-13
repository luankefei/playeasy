STH.UIChart.prototype.drawcircleBubble = function() {
    var that = this
        //todo  清空 svg中的内容
    d3.select(that.svg)[0][0][0][0].innerHTML = '';
    // 无数据, 不绘图
    if (that.dataset.length < 1) {
        return;
    }

    var data = STH.util.upToJson(that.dataset)

    var typeArr = STH.util.getcircleBubbleTypeArr(data)

    var colors = [],
        format = d3.format(",d");

    var bubble = d3.layout.pack()
        .sort(null)
        .size([that.width, that.height])
        .padding(1.5);

    var content = that.svg.append("g")
        .attr("class", "content");

    var root = data;

    for (var j = 0; j < data.children.length; j++) {
        if (j < that.colorset.length) {
            color = that.colorset[j]
        } else {
            hsl = "hsl(" + Math.random() * 1000 + ", 70%, 60%)";
            color = d3.hsl(hsl).rgb().toString();
        }
        colors.push(color)
    }

    var node = content.selectAll("circle")
        .data(bubble.nodes(classes(root))
       			 .filter(function(d) {
               		 return !d.children;
        	}))
        .enter().append("circle")
        .attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y + ")";
        })  
        .attr("r", function(d) {
            return 0
        })
        .style("fill", function(d, i) {
            num = STH.util.getTypeIndex(d.packageName, typeArr)
            return colors[num]
        })
        .attr("class", function(d, i) {

            var domObj = d3.select(this)[0][0];
            var textObj = {}

            textObj.parentG = content;

            textObj.x = d.x;

            textObj.y = d.y;

            textObj.data = d.message[1]

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
        .ease("bounce")
        .attr("r", function(d) {
            return d.r;
        });
        that.hasMessage()
    function classes(root) {
        var classes = [];
        
        recurse(null, root);
        return {
            children: classes
        };
	    function recurse(name, node) {

	        if (node.children) {
	            node.children.forEach(function(child) {
	                recurse(node.name, child);
	            });
	        } else {
	            classes.push({
	                packageName: name,
	                className: node.name,
	                value: node.size,
	                message: node.message

	            });
	        }
	    }
        /* d3.select(self.frameElement).style("height", that.height + "px");

         return colors;*/
        
	}
}
STH.UIChart.prototype.updatecircleBubble = function() {
	//this.drawcircleBubble()
    var that = this
  
    var data = STH.util.upToJson(that.dataset)

    var typeArr = STH.util.getcircleBubbleTypeArr(data)

    var colors = [],
        format = d3.format(",d");

    var bubble = d3.layout.pack()
        .sort(null)
        .size([that.width, that.height])
        .padding(1.5);

    var content = that.svg.select(".content")

    var root = data;

    for (var j = 0; j < data.children.length; j++) {
        if (j < that.colorset.length) {
            color = that.colorset[j]
        } else {
            hsl = "hsl(" + Math.random() * 1000 + ", 70%, 60%)";
            color = d3.hsl(hsl).rgb().toString();
        }
        colors.push(color)
    }
   
    var node = content.selectAll("circle")
      			 .data(bubble.nodes(classes(root))
       			 .filter(function(d) {
               		 return !d.children;
        	}))
     			
    node.exit()
		.transition()
		.duration(that.animate)
		.attr("r", function(d) {
      	  return 0
   		 })
		.remove();   		

    node.transition()
		.duration(that.animate) 
		.attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y + ")";
        }) 			
		.ease("bounce")
        .attr("r", function(d) {
            return d.r;
        });

    node.enter().append("circle")
    	.attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y + ")";
        })
        .attr("r", function(d) {
            return 0
        })
        .style("fill", function(d, i) {
            num = STH.util.getTypeIndex(d.packageName, typeArr)
            return colors[num]
        })
        .transition()
		.duration(that.animate)  			
		.ease("bounce")
        .attr("r", function(d) {
            return d.r;
        });

    node.call(commonEvent)   

    function commonEvent() {

		this.attr("class", function(d, i) {

				var domObj = d3.select(this)[0][0];

				 var textObj = {}

	            textObj.parentG = content;

	            textObj.x = d.x;

	            textObj.y = d.y;

	            textObj.data = d.message[1]

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
    function classes(root) {
        var classes = [];
        
        recurse(null, root);
        return {
            children: classes
        };
	    function recurse(name, node) {

	        if (node.children) {
	            node.children.forEach(function(child) {
	                recurse(node.name, child);
	            });
	        } else {
	            classes.push({
	                packageName: name,
	                className: node.name,
	                value: node.size,
	                message: node.message

	            });
	        }
	    }
   
}
}