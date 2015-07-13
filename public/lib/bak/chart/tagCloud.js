STH.UIChart.prototype.drawtagCloud = function () {
    var that = this
    //todo  清空 svg中的内容
    d3.select(that.svg)[0][0][0][0].innerHTML = '';
    // 无数据, 不绘图
    if (that.dataset.length < 1) {
        return;
    }

    var cloud = null;
    var sum = d3.sum(that.dataset, function (d, i) {
        // if(i == 1) {d[1] = 0;}
        return d[1];
    });
    var word = [];

    var sScale = d3.scale.linear()
        .domain([0, sum])
        .range([0, that.width]);
    that.dataset.forEach(function (d, i) {

        var temp = {
            text: d[0] == null ? '' : d[0],
            value: d[1] == null ? '' : d[1],
            size: sScale(d[1] == null ? 0 : d[1]),
            href: d[2] == null ? '' : d[2],
            message: d
        };
        word.push(temp)
    })

    cloud = d3.layout.cloud();
    cloud
        .size([that.width, that.height])
        .words(word)
        .padding(10)
        .rotate(function (d, i) {
            return (i * 90) % 180 == 0 ? 0 : i * 90;
        })
        .font("Impact")
        .fontSize(function (d) {
            return d.size;
        })
        .on("end", _drawTagCloud)
        .start();


    // 绘制云标签

    function _drawTagCloud(words, bounds) {
        that.svg.append("g")
            .attr("transform", "translate(" + (that.width / 2) + "," + (that.height / 2) + ")")
            .selectAll("text")
            .data(words)
            .enter()
            //.append("a")
            //.attr("xlink:href", function(d) {
            //	console.log(d)
            //	return d.href|| "#";
            //})

            //.attr("target", "_bank")
            .append("text")
            .style({
                "font-size": function (d) {
                    return 0 + "px";
                },
                "font-family": 'impact',
                'fill': function (d, i) {
                    if (i < that.colorset.length) {
                        color = that.colorset[i]
                    } else {
                        hsl = "hsl(" + Math.random() * 1000 + ", 70%, 60%)";
                        color = d3.hsl(hsl).rgb().toString();
                    }
                    return color;
                } // end fill()
            })
            .text(function (d) {
                return d.text;
            })
            .attr("href", function(d) {
                return d.href || "#"
            })
            .attr({
                "text-anchor": "middle",
                "transform": function (d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                }
            })

            .style("font-size", function (d) {
                return d.size + "px";
            })
            .attr("class", function (d, i) {
                var domObj = d3.select(this)[0][0];
                var obj = {
                    dom: domObj,
                    data: d.message
                }

                STH.util.MY.data(domObj, "data", obj);

                return "mouse-obj";
            })
            .on("mouseover", function (d, i) {

                d3.select(this)
                    .attr("opacity", 0.4);
                var temp = STH.util.MY.data(d3.select(this)[0][0], "data")

                that.mouseover(temp);
                /*var obj = $(d3.select(this)[0][0]).data("data-mouse");
                 var key = chartJson.data[i]

                 mouseEvent.mouseOver(eval(obj));

                 mouseLink.mouse(key, chartJson.selector);*/

            })
            .on("mouseout", function () {

                d3.select(this)
                    .attr("opacity", 1);

                that.mouseout();
                /*mouseEvent.mouseOut();*/
            })
            .on("click", function (d, i) {

                if (that.linkChart != null && that.linkChart != "undefined") {
                    var chart = d3.select(this)[0][0]
                    STH.util.clickEvent(chart, that)
                }

            })
    }
}
STH.UIChart.prototype.updatetagCloud = function () {
    this.drawtagCloud()
}