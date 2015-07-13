/**
 * @name main
 * @description 此文件用来对外提供接口，ie11+支持const关键字，如果报错替换var
 * @author zhangyujie
 * @version  0.1
 * chart 默认hideMessageData = true,hideAxisData = false
 *
 *
 */
const STH = {}

// 对外提供
STH.createChart = function(chartSettings) {

    var objParent = new STH.UIChart(chartSettings)
    var obj = Object.create(objParent)


    obj.create();

    obj.loadData = function (newSetting) {

        obj.load(newSetting)

        obj.reDraw()


    }
    obj.connectChart = function (linkchart) {

        obj.connect(linkchart)
    }

    obj.hideAxis = function() {

        obj._hideAxis()

    }

    obj.showAxis = function() {

        obj._showAxis()

    }

    obj.hideMessage = function() {

        obj._hideMessage();

    }

    obj.showMessage = function() {

        obj._showMessage();

    }

    return obj;
}

/*
*解绑图例  1, 图表重绘   2, 图例重绘
*/

STH.createLegend = function(legendSettings) {

    var objParent  = new STH.UILegend(legendSettings);
    var obj = Object.create(objParent)

    obj.create()


    obj.bindChart = function (chart) {

        obj.bind(chart)

        obj.update()

    }

    obj.unbindChart = function(chart) {

        obj.unbind(chart)

        obj.update()

    }


    return obj
}
/*
*解绑时间轴  1, 图表重绘   2, 时间轴重绘
*/
STH.createTimeAxis = function(timeAxisSettings) {

    var objParent  = new STH.UITimeAxis(timeAxisSettings);

    var obj =  Object.create(objParent)
    obj.create()

    obj.bindChart = function (chart) {

        obj.bind(chart)

        obj.update()

    }

    obj.unbindChart = function(chart) {

        obj.unbind(chart)

        obj.update()

    }

    return obj

}
/**
 * @name core
 * @description 此文件提供核心函数，如ajax，字符串处理等
 * @author zhangyujie
 * @version 0.1
 */
STH.core = {}


/**
 * 判断页面中是否存在与参数src相同的script标签
 * @return { bool }
 */
STH.core.checkScript = function(url) {

    var nodes = document.querySelectorAll('script')

    for (var i = 0; i < nodes.length; i++) {

        var src = nodes[i].getAttribute('src')

        if (src === url) {
            return nodes[i]
        }
    }

    return true
}

/**
 * 加载js文件，在完成加载后执行回调
 * @param  {string}   url
 * @param  {Function} callback
 * @return {undefined}
 */
STH.core.loadScript = function(url, callback) {

    // 在添加前进行判断，不重复添加
    var state = STH.core.checkScript(url)

    if (state === true) {

        // 创建一个新节点，并插入到html页面
        var body = document.getElementsByTagName('body')[0]
        var node = document.createElement('script')

        node.src = url
        node.type = 'text/javascript'

        body.appendChild(node)

        node.onload = function() {

            node.loaded = true

            callback && callback()
        }

    } else {

        // 等待绘图文件加载完成
        var wait = setInterval(function() {

            if (document.readyState === 'complete') {

                clearInterval(wait)

                callback && callback()
            }

        }, 100)
    }
}

/**
 * @name resource
 * @description 此文件是提供配置参数和基本数据
 * @author zhangyujie
 * @version 0.1
 */
STH.resource = {}

STH.resource.font = {
    size: '14px',
    color: 'rgb(83, 88, 95)'
}

STH.resource.chartFile = {

    '3dBar': '/public/lib/chart/3dBar.js',
    'cardinalLine': '/public/lib/chart/cardinalLine.js',
    'linearLine': '/public/lib/chart/linearLine.js',
    'lengthBar': '/public/lib/chart/lengthBar.js',
    '3dPie': '/public/lib/chart/3dPie.js',
    'pieSolid': '/public/lib/chart/pieSolid.js',
    'pieEmpty': '/public/lib/chart/pieEmpty.js',
    'triangle':'/public/lib/chart/triangle.js',
    'stackCrossBar':'/public/lib/chart/stackCrossBar.js',
    'triangleBar':'/public/lib/chart/triangleBar.js',
    'statBubble':'/public/lib/chart/statBubble.js',
    'freeBubble':'/public/lib/chart/freeBubble.js',
    '3dBubble':'/public/lib/chart/3dBubble.js',
    'solidScatter':'/public/lib/chart/solidScatter.js',
    'freeScatter':'/public/lib/chart/freeScatter.js',
    'stackArea':'/public/lib/chart/stackArea.js',
    'brokeArea':'/public/lib/chart/brokeArea.js',
    'crossBar':'/public/lib/chart/crossBar.js',
    'groupCrossBar':'/public/lib/chart/groupCrossBar.js',
    'pieBar':'/public/lib/chart/pieBar.js',
    'circleBubble':'/public/lib/chart/circleBubble.js',
    'stackBar':'/public/lib/chart/stackBar.js',
    'circleSplice':'/public/lib/chart/circleSplice.js',
    'chinaMap':'/public/lib/chart/chinaMap.js',
    'chinaMapCircle':'/public/lib/chart/chinaMapCircle.js',
    'chinaMapLine':'/public/lib/chart/chinaMapLine.js',
    'simpleTree':'/public/lib/chart/simpleTree.js',
    'circlePack':'/public/lib/chart/circlePack.js',
    'simpleForce':'/public/lib/chart/simpleForce.js',
    'humanShort':'/public/lib/chart/humanShort.js',
    'humanMany':'/public/lib/chart/humanMany.js',
    'processBar':'/public/lib/chart/processBar.js',
    'circleArc':'/public/lib/chart/circleArc.js',
    'rectCloud':'/public/lib/chart/rectCloud.js',
    'tagCloud':'/public/lib/chart/tagCloud.js',
    'KLine':'/public/lib/chart/KLine.js'
}

STH.resource.imageFile = {
    'pauseButton': '/STH/images/pauseImg.jpg',
    'playButton': '/STH/images/playImg.jpg',
    'nextButton': '/STH/images/nextImg.jpg',
    'prevButton': '/STH/images/prevImg.jpg'
}

STH.resource.jsonData = {
    'china':'/STH/data/json/china.json'
}

STH.resource.csvData = {
    'china': '/STH/data/csv/china.csv'
}
// 此文件用来绘制图表
STH.UIControl = function() {

    // properties
    this.width
    this.height
    this.selector

    this.enabled
    this.selected
    this.state
    this.animate

    // style
    this.background

    // func
    this.sendAction = function() {
       
    }

    // events



    //return this
}
// 此文件用来绘制图表
STH.UIChart = function(settings) {

    // properties

    this.width = settings.width

    this.height = settings.height

    this.animate = settings.animate || 1000

    this.selector = settings.selector

    this.type = settings.type

    this.circle = null

    this.legend = null

    this.legendData = null

    this.showMessageData = false

    this.showAxisData = true

    this.margin = settings.margin || {
        left: 40,
        top: 20,
        right: 40,
        bottom: 50
    }

    this.xScale = settings.xScale

    this.yScale = settings.yScale

    this.rScale = settings.rScale

    this.dataset = settings.dataset || STH.util.getExampleData(this.type);

    //原声dataset
    this.original = this.dataset

    this.colorset = settings.colorset || [
        '#a2a497', '#2f0d20', '#fde4c5',
        '#e3001b', '#800000', '#a31e24',
        '#cc3c31', '#e30c1e', '#e63b21',
        '#f8533d', '#f2976a', '#f4ba9d'
    ]


    this.isDraw = false

    this.colorset = STH.util.getColors(this.colorset,
        this.original.length - this.colorset.length);

    //原生colorset
    this.originalColor = this.colorset;

    this.svg = null

    this.axisStyle = {
        'fill': 'none',
        'stroke': 'rgb(167, 170, 169)',
        'shape-rendering': 'crispEdges'
    }

    this.textStyle = {
        fill: STH.resource.font.color,
        'font-size': STH.resource.font.size
    }

    // func
    this._createSvg = function() {

        d3.select(this.selector).select("svg")
            .remove()
        this.svg = null;
        this.svg = d3.select(this.selector)
            .append('svg').attr('class', 'svg')
            .attr('width', this.width)
            .attr('height', this.height)
            .attr('viewBox', '0 0 ' + this.width + ' ' + this.height)
    }


    this.create = function() {

        this.dataset = this.convert(this.dataset);
        this.legendBindDataset = this.dataset
        this._create();

    }
    this._create = function() {

        var url = STH.resource.chartFile[this.type]

        var base = this

        STH.core.loadScript(url, function() {



            base._createSvg()

            var fn = base['draw' + base.type]

            if (base.isDraw) {

                var wait = setInterval(function() {

                    if (!base.isDraw) {
                        clearInterval(wait)
                    }

                    fn.apply(base, null)

                }, 100)
            } else {

                fn.apply(base, null)



            }



        })

    }

    // evnets
    return this
}

STH.UIChart.prototype = new STH.UIControl()



//时间轴 切换  更新数据  数据是最原始的数据
STH.UIChart.prototype.update = function(data) {

    this.dataset = data


    this.dataset = this.convert(this.dataset);
    //todo
    this.change("none");

    if (typeof this.legend != "undefined" && this.legend != null) {
        //恢复图表原有颜色
        this.colorset = this.originalColor;
        this.legend.update(this)

    }

}

//图例切换   变化数据   数据是处理过的数据
STH.UIChart.prototype.change = function(type) {
        var url = STH.resource.chartFile[this.type]
        var base = this
        if (this.reDrawFlag) {

            STH.core.loadScript(url, function() {

                var fn = base['draw' + base.type]

                fn.apply(base, null)

            })
            this.reDrawFlag = !this.reDrawFlag
        } else {

            STH.core.loadScript(url, function() {

                var fn = base['update' + base.type]

                fn.apply(base, null)

            })

        }


    }
    // todo 抽取到数据组件
STH.UIChart.prototype.getLegend = function() {

    var lengthData = this.legendData;

    return lengthData;

}
STH.UIChart.prototype.mouseover = function(mouseObj) {


    var data = mouseObj.data;
    var obj = mouseObj.dom;
    var position = obj.getBoundingClientRect();
    var Top = document.documentElement.scrollTop;
	var Left = document.documentElement.scrollLeft;

    var tooltip = d3.select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("left", (position.left + position.right) / 2  + Left + "px")
		.style("top", (position.top + position.bottom) / 2 + Top + "px")
        .style("position", "absolute")
        .style("width", "auto")
        .style("height", "30px")
        .style("padding", "5px")
        .style("background-color", "#ccc")
        .style("color", "#000")
        .style("z-index", "100")
        .style("border-radius", "10px")
        .style("-webkit-border-radius", "10px")
        .style("-moz-border-radius", "10px")
        .style("pointer-events", "none")
        .text(data);

}
STH.UIChart.prototype.mouseout = function() {

    d3.selectAll(".tooltip").remove();

}
STH.UIChart.prototype.mousemove = function() {

}
STH.UIChart.prototype.click = function() {

}
STH.UIChart.prototype.load = function(newSetting) {

        this.width = newSetting.width || this.width;
        this.height = newSetting.height || this.height;
        this.selector = newSetting.selector || this.selector;
        this.colorset = newSetting.colorset || this.colorset;
        this.dataset = newSetting.dataset || this.dataset;

    }
    //多图联动, linkChart是子图表
STH.UIChart.prototype.connect = function(linkChart) {

    this.linkChart = linkChart

}
STH.UIChart.prototype.link = function(key, linkChart) {
    console.log("进入绑定事件")
        //父图表key －  主键
    var fatherKey = key[this.primaryKey];

    //从原始数据中筛选数据
    var linkDataset = linkChart.original;

    var newLinkDataset = [];

    for (var i = 0; i < linkDataset.length; i++) {

        var linkData = linkDataset[i]

        if (linkData[linkChart.foreignKey] == fatherKey) {

            newLinkDataset.push(linkData)
        }

    }

    linkChart.dataset = newLinkDataset;


    if (linkChart.timeAxis != "undefined" && linkChart.timeAxis != null) {

        linkChart.filterData = linkChart.dataset;
        linkChart.timeAxis.update();

    } else {

        linkChart.update(newLinkDataset);

    }


}

//点击切换图表类型时候将所有的内容重绘 时间轴, 图表, 图例
STH.UIChart.prototype.reDraw = function() {
    this.reDrawFlag = true;
    //纪录原始数据
    this.original = this.dataset;
    //如果有时间轴就直接绑定时间轴，图表就更新, 否则直接更新图表
    if (this.timeAxis) {
       
        this.timeAxis.bind(this)
        this.timeAxis.update();
    } else {
        this.create();
    }

}

STH.UIChart.prototype.hasMessage = function() {

    if (this.showMessageData) {

        this.drawMessage()

    } else {

        this.svg.select(".content")
            .selectAll('.text-obj')
            .remove()
    }

}
STH.UIChart.prototype._showMessage = function() {

    this.showMessageData = true

    this.hasMessage()

}
STH.UIChart.prototype._hideMessage = function() {

    this.showMessageData = false

    this.hasMessage()

}


STH.UIChart.prototype.hasAxis = function() {

    if (this.showAxisData) {

        this.svg.select(".xAxis")
            .style("display", "block")

        this.svg.select(".yAxis")
            .style("display", "block")
    } else {
        this.svg.select(".xAxis")
            .style("display", "none")
        this.svg.select(".yAxis")
            .style("display", "none")
    }

}

STH.UIChart.prototype._showAxis = function() {

    this.showAxisData = true

    this.hasAxis()

}

STH.UIChart.prototype._hideAxis = function() {

    this.showAxisData = false

    this.hasAxis()

}

STH.UIChart.prototype.drawMessage = function() {

    if (this.showMessageData) {
        var mouseObjs = this.svg.selectAll(".mouse-obj")[0]

        var mouseObj = {};

        var textObj = {};

        if (this.type == "simpleTree") {
            this.svg.selectAll(".node").append("text")
                .data(mouseObjs)
                .attr("class", "text-obj")
                .text(function(d, i) {
                    mouseObj = STH.util.MY.data(mouseObjs[i], "data")
                    textObj = mouseObj.text
                    return textObj.data
                })
                .attr("x", function(d, i) {
                    mouseObj = STH.util.MY.data(mouseObjs[i], "data")
                    textObj = mouseObj.text
                    return textObj.x
                })
                .attr("dy", function(d, i) {
                    mouseObj = STH.util.MY.data(mouseObjs[i], "data")
                    textObj = mouseObj.text
                    return textObj.dy
                })
                .attr("text-anchor", textObj.anchor)

        } else {

            for (var i = 0; i < mouseObjs.length; i++) {

                mouseObj = STH.util.MY.data(mouseObjs[i], "data")

                textObj = mouseObj.text

                textObj.parentG.append("text")
                    .attr("class", "text-obj")
                    .text(textObj.data)
                    .attr("x", function() {
                        if (textObj.x !== undefined) {
                            return textObj.x
                        }
                    })
                    .attr("y", function() {
                        if (textObj.y !== undefined) {
                            return textObj.y
                        }
                    })
                    .attr("transform", function() {
                        if (textObj.transform !== undefined) {
                            return textObj.transform
                        }
                    })
            }
        }
    }
}

STH.UIChart.prototype.updateMessage = function() {
    var mouseObjs = this.svg.selectAll(".mouse-obj")[0]

    var mouseObj = {};

    var textObj = {};
    //var data = this.dataset;
  
    var content = this.svg.select('.content')
    var text = content.selectAll(".text-obj")
        .data(mouseObjs)
    if (!this.showMessageData) {
        return;
    }
    text.transition()
        .duration(this.animate)
        .text(function(d, i) {
            mouseObj = STH.util.MY.data(content.selectAll(".mouse-obj")[0][i], "data")
            textObj = mouseObj.text
            return textObj.data;
        })
        .attr("x", function(d, i) {
            mouseObj = STH.util.MY.data(content.selectAll(".mouse-obj")[0][i], "data")
            textObj = mouseObj.text
            return textObj.x
        })
        .attr("y", function(d, i) {
            mouseObj = STH.util.MY.data(content.selectAll(".mouse-obj")[0][i], "data")
            textObj = mouseObj.text
            return textObj.y
        })

    text.exit()
        /*.transition()
        .duration(this.animate)
        .attr("y", function(d, i) {
            mouseObj = STH.util.MY.data(content.selectAll(".mouse-obj")[0][i], "data")
            textObj = mouseObj.text
            return textObj.y
        })
        .attr("x", 0)*/
        .remove();

    text.enter()
        .append('text')
        .attr("class", "text-obj")
        .attr("x", 0)
        .attr("y", function(d, i) {
            mouseObj = STH.util.MY.data(content.selectAll(".mouse-obj")[0][i], "data")
            textObj = mouseObj.text
            return textObj.y
        })
        .transition()
        .duration(this.animate)
        .attr("x", function(d, i) {
            mouseObj = STH.util.MY.data(content.selectAll(".mouse-obj")[0][i], "data")
            textObj = mouseObj.text
            return textObj.x
        })
        .attr("y", function(d, i) {
            mouseObj = STH.util.MY.data(content.selectAll(".mouse-obj")[0][i], "data")
            textObj = mouseObj.text
            return textObj.y
        })
        .text(function(d, i) {
            mouseObj = STH.util.MY.data(content.selectAll(".mouse-obj")[0][i], "data")
            textObj = mouseObj.text
            return textObj.data;
        })

}

//绘制坐标轴:type x轴, y轴
//scale 比例尺,
//position: left, bottom, right,top
//tickValues :
STH.UIChart.prototype.drawAxis = function(type, scale, position, tickValues, transform) {
    var axis = d3.svg.axis()
        .scale(scale)
        .orient(position)
        .tickValues(tickValues)

    this.svg.append('g')
        .attr('class', type)
        .attr('transform', 'translate(' + transform[0] + ',' + transform[1] + ')')
        .call(axis)

    this.svg.selectAll(".tick line").attr(this.axisStyle)
    this.svg.selectAll(".tick text").attr(this.textStyle)
    this.svg.selectAll(".xAxis path").attr(this.axisStyle)
    this.svg.selectAll(".yAxis path").attr(this.axisStyle)
}
STH.UIChart.prototype.updateAxis = function(type, scale, position, tickValues, transform) {
    var axis = d3.svg.axis()
        .scale(scale)
        .orient(position)
        .tickValues(tickValues)

    this.svg.select("." + type)
        .transition()
        .duration(this.animate)
        .call(axis)

}
//根据原始dataset 转换数据  转成图例所需数组形式
STH.UIChart.prototype.convert = function(data) {
    this.isDraw = true;

    var legendData = [];

    //原始数据的转换
    switch (this.type) {
        case '3dBar':
        case 'lengthBar':
        case '3dPie':
        case 'pieSolid':
        case 'pieEmpty':
        case 'triangle':
        case 'triangleBar':
        case 'crossBar':
        case 'humanShort':
        case 'humanMany':

            for (var i = 0; i < data.length; i++) {

                legendData.push(data[i][0])

            }
            break;
        case 'cardinalLine':
        case 'linearLine':
        case 'stackCrossBar':
        case 'groupCrossBar':
        case 'statBubble':
        case 'stackArea':
        case 'brokeArea':
        case 'stackBar':
        

            data = STH.util.groupData(data).slice(1);


            data.forEach(function(d, i) {

                legendData.push(d.slice(0, 1)[0])

                d.shift();
            })
            
            break;

        case 'freeBubble':
        case '3dBubble':
        case 'solidScatter':
        case 'freeScatter':
        case 'circleBubble':

            data = STH.util.upToThree(data);

            var getType = STH.util.getTypeArr(data)

            data.forEach(function(d, i) {
                legendData.push(getType[i])

            })
            break;

        case 'pieBar':
        case 'circleSplice':


            data = STH.util.sort(data);

            for (var i = 0; i < data.length; i++) {

                legendData.push(data[i][0])

            }

            break;

        case 'simpleTree':
        case 'circlePack':

            data = STH.util.upToSimpleJson(data,data[0],0)

            break;

        case 'circleArc':

             data = STH.util.groupData(data,this.type)
             break;


    }

    this.legendData = legendData
    this.isDraw = false;

    return data;

}
STH.UILegend = function(settings) {

    this.dataset = settings.dataset || {}

    this.margin = settings.margin || {
        left: 20,
        right: 20,
        top: 20,
        bottom: 20
    }

    this.width = settings.width
    this.height = settings.height

    // todo 命名
    this.widths = settings.widths || []
    this.eleWidth = settings.eleWidth || 40
    this.eleHeight = settings.eleHeight || 15
    this.textWidths = settings.textWidth || []
    this.textHeight = settings.textHeight || []
    this.fontSize = settings.fontSize || 12
    this.fill = settings.fill || 'black'
    this.spacing = settings.fill || 50
    this.column = settings.column || 3
    this.selector = settings.selector
    // 图例的颜色定义
    this.textAncher = settings.textAncher || 'start'

    this.defaultData = ["电商", "微商", "互联网", "计算机"]

    this.colorset =[
        '#a2a497', '#2f0d20', '#fde4c5',
        '#e3001b', '#800000', '#a31e24',
        '#cc3c31', '#e30c1e', '#e63b21',
        '#f8533d', '#f2976a', '#f4ba9d'
    ]
    this.svg = null

}

STH.UILegend.prototype = new STH.UIControl()

STH.UILegend.prototype.create = function() {

    if(typeof  this.svg == "undefined" ||  this.svg == null) {

        this.svg = d3.select(this.selector)
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height)
            .attr('viewBox', '0 0 ' + this.width + ' ' + this.height)

    }

    d3.select(this.svg)[0][0][0][0].innerHTML = '';
    if(typeof this.chart != "undefined" && this.chart != null) {

        if (this.chart.legendData.length == 0 ) {

            return;
        }

        var chartObj = this.chart

        this.dataset = chartObj.getLegend()

        var dataBackup = chartObj.dataset.concat()
        var dataNull = chartObj.dataset.concat()

        var titleBackup = this.dataset.concat()
        var titleNull = this.dataset.concat()

        var colorBackup = chartObj.colorset.concat()
        var colorNull = chartObj.colorset.concat()

    } else {

        var chartObj = null;

        this.dataset = this.defaultData;
    }




    if (this.dataset == null) {
        return false
    }



    var eleClass = 'item'
    //rect的宽度和高度需要改变
    this.eleWidth = (this.width - this.margin.left - this.margin.right)/20


    var svg	= this.svg.append('g')
        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")

    var eleLength = this.dataset.length

    for (var i = 0; i < eleLength; i++) {
        var change = STH.util.getBLen(this.dataset[i] + '')
        this.textWidths[i] = change * this.fontSize * 0.5
        this.widths[i] = this.eleWidth + this.textWidths[i] + this.spacing

    }

    var point = { // 输出legendItem相关变量
        row: 0, // 当前行   hikhhg
        column: 0, // 当前列
        width: 0, // 已输出legendItem的总宽度
    }
    var that = this
    var eles = svg.selectAll(eleClass)
        .data(that.dataset)
        .enter()
        .append('g')
        .attr('class', eleClass)
        .attr('transform', function(d, i) {
            var x, y

            if (point.column != 0) {
                point.width += that.widths[i - 1]
            }

            if (point.width + that.widths[i] > that.width) {
                point.column = 0
                if (i != 0) {
                    point.row++
                }
            }

            x = parseInt(point.width % that.width)
            y = point.row * that.height / 3

            if (point.column == 0) {
                x = 0
                point.width = 0
            }

            point.column++

            return 'translate(' + x + ',' + y + ')'
        })
    eles.append('text')
        .attr({
            'x': that.eleWidth + 8,
            'y': that.eleHeight,
            'width': function(d, i) {
                return that.textWidths[i]
            },
            'height': that.textHeight,
            'font-size': STH.resource.font.size,
            'dy': '-0.15em'
        })
        .attr('class', 'text')
        .style({
            'text-anchor': that.textAnchor,
        })
        .text(function(d) {
            return d
        })
    eles.insert('rect', 'rect')
        .attr({
            'x': 0,
            'y': 0,
            'width': that.eleWidth,
            'height': that.eleHeight,
            'fill': function(d, i) {
                return that.colorset[i]
            }
        })

    // 命名
    var g_legendItem = svg.selectAll('.' + eleClass)

    var positionArray = {
        x: [],
        y: []
    }
    var transform, array, x, y

    for (var i = 0; i < g_legendItem[0].length; i++) {
        transform = d3.select(g_legendItem[0][i]).attr('transform')

        array = transform.split(',')

        x = parseFloat(array[0].slice(10))
        y = parseFloat(array[1].slice(0, -1))
        positionArray.x.push(x)
        positionArray.y.push(y)
    }

    var max_width = d3.max(positionArray.x) + 30
    var max_height = d3.max(positionArray.y) + 10

    //eles.attr('transform', 'translate(' + (that.width - max_width) / 2 + ',' + that.margin.top + ')')

    // legendItem click效果
    // click的信号量  true：添加内容 false：删除内容
    var isAdd = []
    //判断点击还是删除
    var type ;
    for (var i = 0; i < that.dataset.length; i++) {
        // 初始化信号量
        isAdd[i] = true
    }

    eles.on('click', function(d, i) {
        if(chartObj == null) {
            return ;
        }
        //更新数据
        isAdd[i] = isAdd[i] ? false : true
        // 添加
        if (isAdd[i]) {
            type = "add"
            dataNull[i] = dataBackup[i]
            chartObj.dataset = dataNull.slice(0)

            titleNull[i] = titleBackup[i]
            that.dataset = titleNull.slice(0)


            colorNull[i] = colorBackup[i]
            chartObj.colorset = colorNull.slice(0)

            for (var j = 0; j < that.dataset.length; j++) {
                if (chartObj.dataset[j] == null) {
                    chartObj.dataset.splice(j, 1)
                    that.dataset.splice(j, 1)
                    chartObj.colorset.splice(j, 1)
                    j--
                }
            }

            d3.select(this).select('rect')
                .attr('fill', function() {
                    return colorBackup[i]
                })

        } else {
            type = "delete"
            dataNull[i] = null
            chartObj.dataset = dataNull.slice(0)

            titleNull[i] = null
            that.dataset = titleNull.slice(0)


            colorNull[i] = null
            chartObj.colorset = colorNull.slice(0)

            for (var i = 0; i < that.dataset.length; i++) {
                if (chartObj.dataset[i] == null) {
                    chartObj.dataset.splice(i, 1)
                    that.dataset.splice(i, 1)
                    chartObj.colorset.splice(i, 1)
                    i--
                }
            }


            d3.select(this).select('rect')
                .attr('fill', '#ccc')

        }

        chartObj.change(type)

    })
}

STH.UILegend.prototype.bind = function(chart) {

    this.chart = chart

    if (!chart) {
        return
    }

    this.colorset = chart.colorset

    chart.legend = this

}
STH.UILegend.prototype.unbind = function(chart) {

    this.chart = null

    chart.legend = null

    chart.colorset = chart.originalColor

  

    chart.dataset = chart.legendBindDataset

    chart.change()

}
STH.UILegend.prototype.update = function(chart) {

    this.create(this.chart)

}





STH.UITimeAxis = function(settings) {

    this.column = settings.column
    this.margin = settings.margin || {
        left: 10,
        top: 10,
        bottom: 10,
        right: 10
    }

    this.selector = settings.selector
    this.width = settings.width
    this.height = settings.height
    this.autoPlay = false
    this.autoTime = 1000
    this.defaultData = settings.dataset||[{
            key: "2010",
            value: []
        }, {
            key: "2011",
            value: []
        }, {
            key: "2012",
            value: []
        }

    ]



    this.svg = null


}
STH.UITimeAxis.prototype = new STH.UIControl()

STH.UITimeAxis.prototype.create = function() {

    var that_chart = this.chart;
    var that = this
    if (typeof that_chart != "undefined" && that_chart != null) {

        //that_chart.filterData 是 图表经过筛选列后保留的数据 －> 用于父子图表联动使用
        if (that_chart.filterData != null && that_chart.filterData != "undefined") {

            this.dataset = STH.util.groupByColumn(that_chart.filterData, this.column).conKey

        } else {

            this.dataset = STH.util.groupByColumn(that_chart.original, this.column).conKey
        }
        //根据列 重组数据


    } else {

        this.dataset = this.defaultData;

    }



    var width = this.width
    var colors = this.colorset
    if(this.svg == null || typeof this.svg == "undefined") {

        this.svg = d3.select(this.selector)
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height)
            .attr('viewBox', '0 0 ' + this.width + ' ' + this.height)
    }
    d3.select(this.svg)[0][0][0][0].innerHTML = ''
    var svg =  this.svg;

    var timeAxis = this.timeAxis

    var timeLine = svg.append('g').classed('timeLine', true)
        .attr('transform', 'translate('+this.margin.left+',' + (this.margin.top) + ')')
    var timeLineHeight = that.height - that.margin.top - that.margin.bottom
    var timeLineWidth = that.width - that.margin.left - that.margin.right


    //时间轴两端线的高度
    var lineHeight = (that.height - that.margin.top - that.margin.bottom)/2

    //圆点的半径
    var r = lineHeight/6
    var imageWidth = lineHeight/2
    var imageHeight = lineHeight/2



    var sideWidth = imageWidth

    var spacing = 7

    var buttonWidth = sideWidth * 3 + spacing * 3

    //暂停、播放按钮的高度
    var buttonHeight = imageHeight;

    var lineWidth = that.width - buttonWidth - that.margin.left - that.margin.right

    var button = timeLine.append('g').classed('button', true)
        .attr('transform', 'translate(0, '+ (timeLineHeight-buttonHeight)/2+')')
    var line = timeLine.append('g').classed('line', true)
        .attr({
            'class': 'line',
            'transform': function() {
                var x = buttonWidth
                var y = timeLineHeight/2/*(timeLineHeight-buttonHeight)/2 + buttonHeight/2*/
                return 'translate(' + x + ',' + y + ')'
            },
        })

    var buttonX = sideWidth + spacing
    var scale = d3.scale.ordinal()
    var keys = []

    this.dataset.forEach(function(d) {
        keys.push(d.key)
    })

    scale.domain(keys)

    scale.rangePoints([0, lineWidth], 0.5)

    var tAxis = d3.svg.axis()
        .scale(scale)
        .orient('bottom')

    line.call(tAxis)

    this.dataset.forEach(function(d, i) {

        var circle = line.append('circle')
            .attr({
                'cx': scale(d.key),
                'r': r,
                'fill': 'white',
                'stroke': 'black',
                'stroke-width': 2
            })

        STH.util.MY.data(circle[0][0], 'value', d.value)
    })


        // auto周
    var selected = 0

    // chartJson.data = chartJson.timeAxis.data[selected].value
    var autoTime = that.autoTime // auto周期
    var autoPlay = that.autoPlay
    var autoRun
    var pauseImg = autoPlay ? STH.resource.imageFile['pauseButton'] : STH.resource.imageFile['playButton']

    if (autoPlay) {
        autoRun = setInterval(function() {
            _plusSelect()
            _upPoint()
        }, autoTime)
    }

    var _autoOff = function() {
        clearInterval(autoRun)
            // 播放按钮播放
        autoPlay = false
        svg.select('.pause image').attr('xlink:href', STH.resource.imageFile['playButton'])
    }

    var _autoOn = function() {
        autoRun = setInterval(function() {
            _plusSelect()
            _upPoint()
        }, autoTime)

        // 播放按钮暂停
        autoPlay = true
        svg.select('.pause image').attr('xlink:href', STH.resource.imageFile['pauseButton'])
    }

    line.selectAll('circle').filter(':nth-child(' + (selected + 1 + this.dataset.length + 1) + ')').attr({
        'fill': 'black',
        'stroke': '#a2a497',
    })

    var _plusSelect = function() {
        selected++
        selected = parseInt(selected % that.dataset.length)
    }

    var _cutSelect = function() {
        selected--
        selected += that.dataset.length
        selected = parseInt(selected % that.dataset.length)
    }

    var _upPoint = function() {
        line.selectAll('circle')
            .filter(':nth-child(' + (selected + 1 + that.dataset.length + 1) + ')')
            .attr({
                'fill': 'black',
                'stroke': '#a2a497',
            })
        line.selectAll('circle').filter(function(d, i) {
            return i != selected
        }).attr({
            'fill': 'white',
            'stroke': 'black',
        })

        if (typeof that_chart != "undefined" && that_chart != null) {


            that_chart.update(that.dataset[selected].value)

        }

    }

    //click事件
    line.selectAll('.tick').on('click', function(d, i) {
        // 改变当前指针
        d3click(i)
    })


    line.selectAll('circle').on('click', function(d, i) {
        // 改变当前指针
        d3click(i)
    })

    function d3click(n) {

        if (n != selected) {
            selected = n
            _upPoint()
            _autoOff()
        }
    }

    // clearInterval()
    var prevBtn = button.append('g').classed('prev', true)
        .append('image')
        .attr({
            'x': 0,
            'y': 0,
            'xlink:href': STH.resource.imageFile['prevButton'],
            'width': sideWidth,
            'height': sideWidth,
        })
        .on('click', function() {
            _cutSelect()
            _upPoint()
            _autoOff()
        })

    var pauseBtn = button.append('g').classed('pause', true)
        .append('image')
        .attr({
            'x': buttonX,
            'y': 0,
            'xlink:href': pauseImg,
            'width': sideWidth,
            'height': sideWidth,
        })
        .on('click', function() {
            autoPlay ? _autoOff() : _autoOn()
        })
    var nextBtn = button.append('g').classed('next', true)
        .append('image')
        .attr({
            'x': 2 * buttonX,
            'y': 0,
            'xlink:href': STH.resource.imageFile['nextButton'],
            'width': sideWidth,
            'height': sideWidth,
        })
        .on('click', function() {
            _plusSelect()
            _upPoint()
            _autoOff()
        })

    line.append('line')
        .attr({
            'x1': '0',
            'y1': -lineHeight/2,
            'x2': '0',
            'y2': lineHeight/2,
            'stroke': 'black',
            'stroke-width': '2'
        })

    line.append('line')
        .attr({
            'x1': lineWidth,
            'y1': -lineHeight/2,
            'x2': lineWidth,
            'y2': lineHeight/2,
            'stroke': 'black',
            'stroke-width': '2'
        })

    svg.selectAll('.line path')
        .attr('fill', 'none')
        .attr('stroke', 'rgb(167, 170, 169)')
        .attr('shape-rendering', 'crispEdges')


    svg.selectAll('.tick text')
        .attr('fill', 'rgb(83, 88, 95)')
        .attr('font-family', 'sans-serif')
        .attr('font-size', STH.resource.font.size)
        .attr("dy", "1em")
    if (typeof that_chart != "undefined") {
        _upPoint()
    }


}

STH.UITimeAxis.prototype.bind = function(chart) {

    this.chart = chart

    chart.timeAxis = this

}

STH.UITimeAxis.prototype.unbind = function(chart) {

    this.chart = null

    chart.timeAxis = null



    chart.update(chart.original)

}

STH.UITimeAxis.prototype.update = function() {

    this.create();

}
STH.util = {}

STH.util.clickEvent = function(chart, that) {

    var temp = STH.util.MY.data(chart, "data").data

    key = temp;

    that.link(key, that.linkChart);

}

STH.util.toRound = function(Num, num) {
    var num10 = 1;
    for (var i = 0; i < num; i++) {
        num10 = num10 * 10;
    }

    var Num = Num * num10;
    Num = Math.ceil(Num);
    Num = Num / 100;
    return Num;

}

STH.util.getBLen = function(val) {
    if (val == null) {
        return 0
    } else {
        return val.replace(/[^\x00-\xff]/g, '01').length
    }
}

STH.util.textWidth = function(text) {
    //var sensor = "<pre>" + text + "</pre>";
    var sensor = document.createTextNode(text)
    var pre = document.createElement("pre");
    pre.appendChild(sensor);
    var id = document.getElementById('legend')
    id.appendChild(pre)
    pre.setAttribute('class', 'pre');
    document.getElementsByClassName('pre')[0].style.float = 'left';
    document.getElementsByClassName('pre')[0].style.visibility = 'hidden';



    var width = pre.offsetWidth;

    id.removeChild(pre);
  
        //return width;

}

STH.util.clearZero = function(data, val) {

    var flag
    var newdata = []
    for (var i = 0; i < data[0].length; i++) {
        flag = false;
        newdata[i] = []
        for (var j = 0; j < data.length; j++) {
            for (var q = 0; q < data[0].length; q++) {
                if (data[j][i][q] != 0) {
                    flag = true;
                    break;
                }
            }
            for (var w = data.length; w > 0; w--) {

                if (data[j][i][w] != 0) {

                    flag = true;
                    break;
                }
            }

        }
        if (flag) {
            for (var k = 0; k < data.length; k++) {
                newdata[i].push(data[k][i])
            }
        }
    }

    for (var p = 0; p < newdata.length; p++) {
        if (newdata[p].length == 0) {
            delete newdata[p]
        }
    }

    for (var u = 0; u < 2; u++) {
        STH.util.arrayRemove(newdata, undefined)
    }
    for (var i = 0; i < newdata[0].length; i++) {
        val[i] = []
        for (var j = 0; j < newdata.length; j++) {
            val[i].push(newdata[j][i])

        }
        for (var u = 0; u < 2; u++) {
            STH.util.arrayRemove(val[i], undefined)
        }
    }

}

STH.util.arrayIndexof = function(arr, val) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == val) {

            return i;

        }
    }
    return -1;
};

STH.util.arrayRemove = function(arr, val) {

    var index = STH.util.arrayIndexof(arr, val);

    if (index > -1) {
        arr.splice(index, 1);
    }
}

STH.util.upToSimpleJson = function(dataset, node, n) {

    var jsondata = {
            "name": node[0],
            "size": node[3],
            "children": [],
            "message": node
        }
        //遍历一下看看这个node有没有孩子；
    for (var i = 0; i < dataset.length; i++) {
        var data = dataset[i];
        //如果第node的孩子
        if (data[1] == n + 1 && data[2] == node[0]) {

            var tempdata = {
                "name": data[0],
                "size": data[3],
                "message": data
            }

            jsondata.children.push(STH.util.upToSimpleJson(dataset, data, n + 1))

        }
    }

    if (!jsondata.children.length) {
        jsondata.children = null
    }


    return jsondata
}

STH.util.upToJson = function(data) {
    var dataset = {
        'name': 'parent',
        'children': []
    }

    for (var i = 0; i < data.length; i++) {

        var currentType = 0
        var obj = {
            'name': data[i][0][currentType],

            'children': []
        }
        for (var j = 0; j < data[i].length; j++) {
            var e = data[i][j]

            var last = {
                'name': e[1],
                'size': e[2],
                'message': e
            }
            obj.children.push(last)
        }

        dataset.children.push(obj)
    }

    return dataset
}

STH.util.getTypeIndex = function(name, arr) {

    var index = -1

    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === name) {
            index = i

            break
        }
    }

    return index
}

STH.util.groupByColumn = function(original, n) {
    var dataset = []
    var typeArr = []
    var keys_value = [];
    var key;
    var obj = {

    };
    var values = [];
    var exist = false
    var currentType = ''
    var data = original;
    var typeCol = n

    for (var i = 0; i < data.length; i++) {
        // 读取数据的type，如果数组已存在，就添加，否则创建新数组
        exist = true
        currentType = data[i][typeCol]

        if (typeArr.length == 0) {
            typeArr.push(currentType)

        } else {

            for (var j = 0; j < typeArr.length; j++) {
                if (typeArr[j] == currentType) {
                    exist = j

                    break
                }
            }

            if (typeof exist === 'boolean') {
                typeArr.push(currentType)

                exist = true
            }
        }

        if (typeof exist === 'number') {
            dataset[exist].push(data[i])

        } else {
            dataset.push(new Array(data[i]))
        }
    }

    for (var i = 0; i < dataset.length; i++) {
        obj = {};
        key = dataset[i][0][n];

        obj.key = key;
        obj.value = dataset[i];
        keys_value.push(obj);

    }

    return {
        noKey: dataset,
        conKey: keys_value
    }

}
STH.util.sort = function(array) {
    var temp = [];

    for (var i = 0; i < array.length; i++) {

        for (var j = i; j < array.length; j++) {


            if (array[i][1] < array[j][1]) {
                temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        }
    }

    return array;

}
STH.util.transformArray = function(array) {

    var newArray = [];
    for (var i = 0; i < array[0].length; i++) {
        newArray[i] = []

        for (var j = 0; j < array.length; j++) {

            newArray[i].push((array[j][i]))
        }

    }


    return newArray;
}
STH.util.getTypeArr = function(dataset) {
    var typeArr = []

    for (var i = 0; i < dataset.length; i++) {
        var d = dataset[i][0][0]

        var inArray = false

        for (var j = 0; j < typeArr.length; j++) {
            if (typeArr[j] === d) {
                inArray = true

                break
            }
        }

        if (inArray === false) {
            typeArr.push(d)
        }
    }

    return typeArr
}
STH.util.getcircleBubbleTypeArr = function(dataset) {
    var typeArr = []

    for (var i = 0; i < dataset.children.length; i++) {
        var d = dataset.children[i].name
        var inArray = false

        for (var j = 0; j < typeArr.length; j++) {
            if (typeArr[j] === d) {
                inArray = true

                break
            }
        }

        if (inArray === false) {
            typeArr.push(d)
        }
    }

    return typeArr
}
STH.util.upToThree = function(data) {
        var dataset = []
        var typeArr = []

        var exist = false
        var currentType = ''
            //var typeCol = data[0].length - 1
        var typeCol = 0

        for (var i = 0; i < data.length; i++) {
            // 读取数据的type，如果数组已存在，就添加，否则创建新数组
            exist = true
            currentType = data[i][typeCol]

            if (typeArr.length == 0) {
                typeArr.push(currentType)

            } else {

                for (var j = 0; j < typeArr.length; j++) {
                    if (typeArr[j] == currentType) {
                        exist = j

                        break
                    }
                }

                if (typeof exist === 'boolean') {
                    typeArr.push(currentType)

                    exist = true
                }
            }

            if (typeof exist === 'number') {
                dataset[exist].push(data[i])

            } else {
                dataset.push(new Array(data[i]))
            }
        }

        return dataset
    }
    //数据表 形式－> excel表形式
STH.util.groupData = function(data, type) {

    //由第一列分类
    var groupColumn = STH.util.groupByColumn(data, 0).noKey;

    if (type == "circleArc") {
        var groupRow = groupColumn;
        var n = 0;
        var m = 2;
        var q = 1;
    } else {
        //由第二列分类
        var groupRow = STH.util.groupByColumn(data, 1).noKey;
        var n = 1;
        var m = 1;
        var q = 2;
    }

    //整合之后数组的第一行
    var row1 = [];
    //整合之后数组的第一列
    var column1 = [];
    //补充元素的数据
    var fill = [];


    for (var i = 0; i < groupRow.length; i++) {
        row1.push(groupRow[i][0][n]);
    }
    for (var j = 0; j < row1.length + 1; j++) {
        fill.push(0)
    }
    var tempData = [];

    for (var j = 0; j < groupColumn.length; j++) {
        var temp = groupColumn[j];
        //作为最终数组中元素的第一列
        column1.push(temp[0][0]);

        var xy = temp[0][0];
        tempData[j] = [];
        tempData[j].push(xy);

        for (var p = 0; p < row1.length; p++) {
            //第一行数据中的某个元素
            var x = row1[p];
            //flag用于标识
            var flag = false;

            for (var i = 0; i < temp.length; i++) {
                var ij = temp[i][m];

                if (ij == x) {

                    tempData[j].push(temp[i]);
                    /*tempData[j].push(temp[i][q])*/
                    flag = true;
                }

            }


            if (!flag) {
                tempData[j].push(fill);
            }

        }


    }
    row1.unshift(" ")
    tempData.unshift(row1);

    return tempData;

}
STH.util.getColors = function(colors, number) {

    var colorset = [],
        color,
        i,
        hsl;

    for (i = 0; i < number; i++) {
        ///这样定义的随机色的亮度和饱和度会固定，随机色的颜色也会比较的好看
        hsl = "hsl(" + Math.random() * 1000 + ", 70%, 60%)";
        color = d3.hsl(hsl).rgb().toString();
        colorset.push(color);
    }

    return colors.concat(colorset);
}
STH.type = [
    "3dBar",
    "3dPie",
    "3dBubble",
    "brokeArea",
    "cardinalLine",
    "chinaMap",
    "chinaMapLine",
    "chinaMapCircle",
    "circleArc",
    "circleBubble",
    "circlePack",
    "circleSplice",
    "crossBar",
    "freeBubble",
    "freeScatter",
    "groupCrossBar",
    "humanMany",
    "humanShort",
    "lengthBar",
    "linearLine",
    "pieBar",
    "pieEmpty",
    "pieSolid",
    "processBar",
    "rectCloud",
    "simpleForce",
    "simpleTree",
    "solidScatter",
    "stackArea",
    "stackBar",
    "stackCrossBar",
    "statBubble",
    "tagCloud",
    "triangle",
    "triangleBar",
    "KLine"

]
STH.util.MY = function() {
    var expando = ''

    function getData(cache, name) {
        return cache[name];
    }

    function setData(cache, name, value) {
        cache[name] = value;
    }

    function getCache(obj) {
        obj[expando] = obj[expando] || {};
        return obj[expando];
    }

    return {
        data: function(obj, name, value) {
            var cache = getCache(obj);

            if (value === undefined) {
                return getData(cache, name);
            } else {
                setData(cache, name, value);
            }
        }
    }
}()
STH.util.getExampleData = function(type) {
    var dataset = [];

    switch (type) {
        case 'linearLine':
        case 'cardinalLine':
        case 'stackCrossBar':
        case 'stackBar':
        case 'groupCrossBar':
        case 'brokeArea':
        case 'statBubble':
        case 'stackArea':
            var dataset = [
                ["A区", "一月", 48, "北京", "密云县", "李四", "互联网", "2011"],
                ["A区", "二月", 76, "上海", "朝阳区", "王五", "手机", "2011"],
                ["A区", "三月", 112, "上海", "海淀区", "马六", "软件", "2011"],
                ["A区", "四月", 99, "北京", "西城区", "小宏", "电商", "2011"],
                ["A区", "五月", 67, "上海", "东城区", "小明", "浏览器", "2011"],

                ["B区", "一月", 56.8, "北京", "密云县", "大佐", "互联网", "2011"],
                ["B区", "二月", 71, "上海", "朝阳区", "小强", "手机", "2011"],
                ["B区", "三月", 67.3, "上海", "海淀区", "小林", "软件", "2011"],
                ["B区", "四月", 86.3, "上海", "西城区", "大宝", "电商", "2011"],
                ["B区", "五月", 78, "北京", "东城区", "大山", "浏览器", "2011"],

                ["C区", "一月", 91.2, "上海", "密云县", "天天", "互联网", "2011"],
                ["C区", "二月", 89, "北京", "朝阳区", "大卡", "手机", "2011"],
                ["C区", "三月", 88.6, "上海", "海淀区", "小霞", "软件", "2011"],
                ["C区", "四月", 150.7, "北京", "西城区", "小林", "电商", "2011"],
                ["C区", "五月", 10, "上海", "东城区", "小牧", "浏览器", "2011"],

                ["D区", "一月", 20, "上海", "密云县", "宁次", "互联网", "2011"],
                ["D区", "二月", 40, "北京", "朝阳区", "丁次", "手机", "2011"],
                ["D区", "三月", 30, "上海", "海淀区", "明日香", "软件", "2011"],
                ["D区", "四月", 70, "上海", "西城区", "鹿丸", "电商", "2011"],
                ["D区", "五月", 5, "北京", "东城区", "阿猫", "浏览器", "2011"],

                ["E区", "一月", 30, "上海", "密云县", "天天", "互联网", "2012"],
                ["E区", "二月", 50, "上海", "朝阳区", "大卡", "手机", "2012"],
                ["E区", "三月", 60, "上海", "海淀区", "小霞", "软件", "2012"],
                ["E区", "四月", 10, "北京", "西城区", "小林", "电商", "2012"],
                ["E区", "五月", 30, "北京", "东城区", "小牧", "浏览器", "2012"],

                ["F区", "一月", 40, "北京", "密云县", "宁次", "互联网", "2012"],
                ["F区", "二月", 30, "上海", "朝阳区", "丁次", "手机", "2012"],
                ["F区", "三月", 40, "上海", "海淀区", "明日香", "软件", "2012"],
                ["F区", "四月", 89, "上海", "西城区", "鹿丸", "电商", "2012"],
                ["F区", "五月", 23, "北京", "东城区", "阿猫", "浏览器", "2012"],

                ["G区", "一月", 30, "上海", "密云县", "小明", "互联网", "2012"],
                ["G区", "二月", 44, "上海", "朝阳区", "王五", "手机", "2012"],
                ["G区", "三月", 56, "上海", "海淀区", "马六", "软件", "2012"],
                ["G区", "四月", 60, "北京", "西城区", "小宏", "电商", "2012"],
                ["G区", "五月", 78, "北京", "东城区", "小明", "浏览器", "2012"],

                ["H区", "一月", 56, "上海", "密云县", "小A", "互联网", "2012"],
                ["H区", "二月", 80, "上海", "朝阳区", "小爱", "手机", "2012"],
                ["H区", "三月", 44, "上海", "海淀区", "小仁", "软件", "2012"],
                ["H区", "四月", 120, "北京", "西城区", "小卡", "电商", "2012"],
                ["H区", "五月", 48, "北京", "东城区", "小李", "浏览器", "2012"],

                ["I区", "一月", 60, "上海", "密云县", "小明", "互联网", "2013"],
                ["I区", "二月", 43, "上海", "朝阳区", "王五", "手机", "2013"],
                ["I区", "三月", 56, "上海", "海淀区", "马六", "软件", "2013"],
                ["I区", "四月", 23, "北京", "西城区", "小宏", "电商", "2013"],
                ["I区", "五月", 50, "北京", "东城区", "小明", "浏览器", "2013"],

                ["J区", "一月", 23, "上海", "密云县", "大佐", "互联网", "2013"],
                ["J区", "二月", 77, "上海", "朝阳区", "小强", "手机", "2013"],
                ["J区", "三月", 34, "上海", "海淀区", "小林", "软件", "2013"],
                ["J区", "四月", 67, "北京", "西城区", "大宝", "电商", "2013"],
                ["J区", "五月", 48, "北京", "东城区", "大山", "浏览器", "2013"],

                ["K区", "一月", 87, "上海", "密云县", "小明", "互联网", "2013"],
                ["K区", "二月", 35, "上海", "朝阳区", "王五", "手机", "2013"],
                ["K区", "三月", 15, "上海", "海淀区", "马六", "软件", "2013"],
                ["K区", "四月", 58, "北京", "西城区", "小宏", "电商", "2013"],
                ["K区", "五月", 76, "北京", "东城区", "小明", "浏览器", "2013"],

                ["L区", "一月", 45, "上海", "密云县", "小山", "互联网", "2013"],
                ["L区", "二月", 27, "上海", "朝阳区", "小佐", "手机", "2013"],
                ["L区", "三月", 86, "上海", "海淀区", "小鹰", "软件", "2013"],
                ["L区", "四月", 76, "北京", "西城区", "小二", "电商", "2013"],
                ["L区", "五月", 89, "北京", "东城区", "小智", "浏览器", "2013"]


            ];

            break;
        case 'pieSolid':
        case 'crossBar':
        case 'lengthBar':
        case 'triangleBar':
        case 'triangle':
        case 'pieBar':
        case 'pieEmpty':
        case 'humanMany':
        case 'circleSplice':
        case '3dPie':
        case '3dBar':
            dataset = [
                ["1号", 48.5, "马六", "北京", "互联网", "男性", "腾讯", '2009'],
                ["2号", 76.1, "马六", "上海", "手机", "女性", "百度", '2009'],
                ["3号", 12.7, "马六", "北京", "软件", "男性", "360", '2009'],
                ["4号", 29.7, "马六", "上海", "软件", "男性", "360", '2009'],

                ["5号", 70.7, "马六", "北京", "软件", "男性", "360", '2009'],
                ["6号", 60.7, "马六", "上海", "软件", "男性", "360", '2009'],
                ["7号", 99.2, "马六", "上海", "电商", "女性", "阿里", '2010'],
                ["8号", 34, "张三", "北京", "浏览器", "男性", "腾讯", '2010'],

                ["9号", 45, "张三", "上海", "互联网", "女性", "百度", '2010'],
                ["10号", 23, "张三", "上海", "互联网", "女性", "百度", '2010'],
                ["11号", 78, "张三", "北京", "手机", "男性", "360", '2011'],
                ["12号", 122, "张三", "上海", "软件", "女性", "阿里", '2011'],

                ["13号", 132, "张三", "北京", "电商", "男性", "腾讯", '2011'],
                ["14号", 34, "李四", "上海", "浏览器", "女性", "百度", '2012'],
                ["15号", 67, "李四", "上海", "互联网", "男性", "360", '2012'],
                ["16号", 45, "李四", "北京", "浏览器", "女性", "阿里", '2012']
            ];
            break;
        case 'humanShort':
        case 'processBar':
            dataset = [
                ["一月", 48.5, 5871852, "北京", "北京", "一月", "男性", "2011"],
                ["二月", 76.1, 5871852, "北京", "上海", "一月", "男性", "2011"],

                ["一月", 56.5, 5871852, "上海", "北京", "一月", "男性", "2012"],
                ["二月", 56.7, 5871852, "上海", "上海", "一月", "男性", "2012"],

                ["一月", 80.5, 5871852, "北京", "北京", "一月", "男性", "2013"],
                ["二月", 23.4, 5871852, "北京", "上海", "一月", "男性", "2013"],

                ["一月", 34.6, 5871852, "上海", "北京", "一月", "男性", "2014"],
                ["二月", 78.5, 5871852, "上海", "上海", "一月", "男性", "2014"]

            ];
            break;
        case 'chinaMap':
            dataset = [
                ['辽宁省', 100, "北京", 5871852, "上海", "一月", "男性", "2011"],
                ['河北省', 200, "北京", 5871852, "上海", "一月", "男性", "2011"],
                ['北京市', 700, "北京", 5871852, "上海", "一月", "男性", "2011"],
                ['上海市', 600, "北京", 5871852, "上海", "一月", "男性", "2011"],
                ['江苏省', 500, "北京", 5871852, "上海", "一月", "男性", "2011"],
                ['吉林省', 400, "北京", 5871852, "上海", "一月", "男性", "2011"],
                ['黑龙江省', 300, "北京", 5871852, "上海", "一月", "男性", "2011"],
                ['内蒙古自治区', 200, "北京", 5871852, "上海", "一月", "男性", "2011"],
                ['青海省', 100, "北京", 5871852, "上海", "一月", "男性", "2011"],
                ['山东省', 100, "北京", 5871852, "上海", "一月", "男性", "2011"],
                ['天津市', 200, "北京", 5871852, "上海", "一月", "男性", "2011"],
                ['宁夏回族自治区', 50, "北京", 5871852, "上海", "一月", "男性", "2011"],
                ['陕西省', 80, "北京", 5871852, "上海", "一月", "男性", "2011"],
                ['台湾省', 400, "北京", 5871852, "上海", "一月", "男性", "2011"],
                ['海南省', 200, "北京", 5871852, "上海", "一月", "男性", "2011"],
                ['河南省', 300, "北京", 5871852, "上海", "一月", "男性", "2011"],
                ['新疆维吾尔自治区', 50, "北京", 5871852, "上海", "一月", "男性", "2011"],
                ['甘肃省', 80, "北京", 5871852, "上海", "一月", "男性", "2011"],
                ['香港特别行政区', 300, "北京", 5871852, "上海", "一月", "男性", "2011"],
                ['西藏自治区', 100, "北京", 5871852, "上海", "一月", "男性", "2011"],
                ['四川省', 200, "北京", 5871852, "上海", "一月", "男性", "2011"],
                ['云南省', 100, "北京", 5871852, "上海", "一月", "男性", "2011"],
                ['贵州省', 100, "北京", 5871852, "上海", "一月", "男性", "2011"],
                ['澳门特别行政区', 300, "北京", 5871852, "上海", "一月", "男性", "2011"],
                ['广西壮族自治区', 50, "北京", 5871852, "上海", "一月", "男性", "2011"],
                ['广东省', 400, "上海", 5871852, "北京", "一月", "男性", "2011"],
                ['重庆市', 300, "上海", 5871852, "北京", "一月", "男性", "2011"],
                ['湖北省', 200, "上海", 5871852, "北京", "一月", "男性", "2011"],
                ['湖南省', 399, "上海", 5871852, "北京", "一月", "男性", "2011"],
                ['江西省', 300, "上海", 5871852, "北京", "一月", "男性", "2011"],
                ['安徽省', 200, "上海", 5871852, "北京", "一月", "男性", "2011"],
                ['福建省', 400, "上海", 5871852, "北京", "一月", "男性", "2011"],
                ['浙江省', 400, "上海", 5871852, "北京", "一月", "男性", "2011"],
                ['山西省', 200, "上海", 5871852, "北京", "一月", "男性", "2011"]
            ]
            break;
        case 'circleArc':
            dataset = [

                ["北京", 11975, "北京", 5871852, "上海", "一月", "男性", "2011"],
                ["北京", 5871, "上海", 5871852, "上海", "一月", "男性", "2011"],
                ["北京", 8916, "广州", 5871852, "上海", "一月", "男性", "2011"],
                ["北京", 300, "深圳", 5871852, "上海", "一月", "男性", "2011"],
                ["北京", 400, "山东", 5871852, "上海", "一月", "男性", "2011"],

                ["上海", 1951, "北京", 5871852, "上海", "一月", "男性", "2011"],
                ["上海", 10048, "上海", 5871852, "上海", "一月", "男性", "2011"],
                ["上海", 2060, "广州", 5871852, "上海", "一月", "男性", "2011"],
                ["上海", 400, "深圳", 5871852, "上海", "一月", "男性", "2011"],
                ["上海", 700, "山东", 5871852, "上海", "一月", "男性", "2011"],

                ["广州", 8010, "北京", 5871852, "上海", "一月", "男性", "2011"],
                ["广州", 16145, "上海", 5871852, "上海", "一月", "男性", "2011"],
                ["广州", 8090, "广州", 5871852, "上海", "一月", "男性", "2011"],
                ["广州", 484, "深圳", 5871852, "上海", "一月", "男性", "2011"],
                ["广州", 5624, "山东", 5871852, "上海", "一月", "男性", "2011"],

                ["深圳", 6907, "北京", 5871852, "上海", "一月", "男性", "2011"],
                ["深圳", 6753, "上海", 5871852, "上海", "一月", "男性", "2011"],
                ["深圳", 6676, "广州", 5871852, "上海", "一月", "男性", "2011"],
                ["深圳", 34534, "深圳", 5871852, "上海", "一月", "男性", "2011"],
                ["深圳", 43534, "山东", 5871852, "上海", "一月", "男性", "2011"],

                ["山东", 6907, "北京", 5871852, "上海", "一月", "男性", "2011"],
                ["山东", 6753, "上海", 5871852, "上海", "一月", "男性", "2011"],
                ["山东", 6676, "广州", 5871852, "上海", "一月", "男性", "2011"],
                ["山东", 34534, "深圳", 5871852, "上海", "一月", "男性", "2011"],
                ["山东", 43534, "山东", 5871852, "上海", "一月", "男性", "2011"],


                ["北京", 5667, "北京", 5871852, "上海", "一月", "男性", "2012"],
                ["北京", 7899, "上海", 5871852, "上海", "一月", "男性", "2012"],
                ["北京", 345, "广州", 5871852, "上海", "一月", "男性", "2012"],
                ["北京", 7895, "深圳", 5871852, "上海", "一月", "男性", "2012"],
                ["北京", 1895, "山东", 5871852, "上海", "一月", "男性", "2012"],

                ["上海", 5667, "北京", 5871852, "上海", "一月", "男性", "2012"],
                ["上海", 1045, "上海", 5871852, "上海", "一月", "男性", "2012"],
                ["上海", 567, "广州", 5871852, "上海", "一月", "男性", "2012"],
                ["上海", 3456, "深圳", 5871852, "上海", "一月", "男性", "2012"],
                ["上海", 24564, "山东", 5871852, "上海", "一月", "男性", "2012"],

                ["广州", 4556, "北京", 5871852, "上海", "一月", "男性", "2012"],
                ["广州", 1454, "上海", 5871852, "上海", "一月", "男性", "2012"],
                ["广州", 8567, "广州", 5871852, "上海", "一月", "男性", "2012"],
                ["广州", 453, "深圳", 5871852, "上海", "一月", "男性", "2012"],
                ["广州", 5563, "山东", 5871852, "上海", "一月", "男性", "2012"],

                ["深圳", 5674, "北京", 5871852, "上海", "一月", "男性", "2012"],
                ["深圳", 5673, "上海", 5871852, "上海", "一月", "男性", "2012"],
                ["深圳", 6743, "广州", 5871852, "上海", "一月", "男性", "2012"],
                ["深圳", 456, "深圳", 5871852, "上海", "一月", "男性", "2012"],
                ["深圳", 3435, "山东", 5871852, "上海", "一月", "男性", "2012"],

                ["山东", 3456, "北京", 5871852, "上海", "一月", "男性", "2012"],
                ["山东", 6743, "上海", 5871852, "上海", "一月", "男性", "2012"],
                ["山东", 6734, "广州", 5871852, "上海", "一月", "男性", "2012"],
                ["山东", 17345, "深圳", 5871852, "上海", "一月", "男性", "2012"],
                ["山东", 5645, "山东", 5871852, "上海", "一月", "男性", "2012"]
            ]

            break;
        case 'tagCloud':
        case 'rectCloud':
            dataset = [

                ["海云数据", 1200, "http://www.hiynn.com", 5871852, "上海", "一月", "男性", "2011"],
                ["微软大厦", 400, "http://www.baidu.com", 5871852, "上海", "一月", "男性", "2011"],
                ["中关村", 1000, "http://www.tueasy.com", 5871852, "上海", "一月", "男性", "2011"],
                ["海淀黄庄", 600, "http://www.tueasy.com", 5871852, "上海", "一月", "男性", "2011"],
                ["苏州街", 400, "http://www.tueasy.com", 5871852, "上海", "一月", "男性", "2011"],
                ["惠新西街南口", 500, "http://www.tueasy.com", 5871852, "上海", "一月", "男性", "2011"],
                ["亚运村", 1000, "http://www.tueasy.com", 5871852, "上海", "一月", "男性", "2011"],
                ["环球贸易大厦", 500, "http://www.tueasy.com", 5871852, "上海", "一月", "男性", "2011"],
                ["和平西桥", 500, "http://www.tueasy.com", 5871852, "上海", "一月", "男性", "2011"],
                ["和平里北街", 400, "http://www.tueasy.com", 5871852, "上海", "一月", "男性", "2011"],
                ["知春路", 500, "http://www.tueasy.com", 5871852, "上海", "一月", "男性", "2012"],
                ["雍和宫", 700, "http://www.tueasy.com", 5871852, "上海", "一月", "男性", "2012"],
                ["安贞门", 400, "http://www.tueasy.com", 5871852, "上海", "一月", "男性", "2012"],
                ["北土城", 500, "http://www.tueasy.com", 5871852, "上海", "一月", "男性", "2012"],
                ["健德门", 500, "http://www.tueasy.com", 5871852, "上海", "一月", "男性", "2012"],
                ["牡丹园", 700, "http://www.tueasy.com", 5871852, "上海", "一月", "男性", "2012"],
                ["天安门东", 1500, "http://www.tueasy.com", 5871852, "上海", "一月", "男性", "2012"],
                ["环球贸易大厦", 500, "http://www.tueasy.com", 5871852, "上海", "一月", "男性", "2012"]
            ]
            break;
        case 'circleBubble':
            dataset = [

                ["互联网", '腾讯', 5871852, 10, "北京", "一月", "男性", "2011"],
                ["互联网", '完美世界', 2745448, 10, "上海", "一月", "男性", "2011"],
                ["互联网", '盛大', 823077, 10, "上海", "一月", "男性", "2012"],
                ["互联网", '网易', 1572747, 10, "上海", "一月", "男性", "2012"],
                ["互联网", '36氪', 318, 10, "上海", "一月", "男性", "2013"],

                ["手机", '红米手机', 825683, 10, "北京", "一月", "男性", "2011"],
                ["手机", 'iphone5', 532949, 10, "上海", "一月", "男性", "2011"],
                ["手机", '小米手机3', 534913, 10, "北京", "一月", "男性", "2012"],
                ["手机", '三星', 55500, 10, "上海", "一月", "男性", "2012"],
                ["手机", 'ios', 5952, 10, "上海", "一月", "男性", "2013"],
                ["手机", 'android', 5446, 10, "上海", "一月", "男性", "2013"],
                ["手机", '4G', 4071, 10, "上海", "一月", "男性", "2013"],

                ["软件", '天天酷跑', 836669, 10, "北京", "一月", "男性", "2011"],
                ["软件", '微信', 385527, 10, "上海", "一月", "男性", "2011"],
                ["软件", '手机qq', 175621, 10, "北京", "一月", "男性", "2011"],
                ["软件", '快播', 110708, 10, "上海", "一月", "男性", "2012"],
                ["软件", '大众点评网', 84262, 10, "北京", "一月", "男性", "2012"],
                ["软件", '谷歌地图', 36903, 10, "上海", "一月", "男性", "2012"],
                ["软件", '美图秀秀', 29835, 10, "北京", "一月", "男性", "2012"],
                ["软件", '易信', 16639, 10, "北京", "一月", "男性", "2013"],
                ["软件", '高德地图', 15775, 10, "上海", "一月", "男性", "2013"],
                ["软件", '墨迹天气', 10939, 10, "上海", "一月", "男性", "2013"],
                ["软件", '美图秀秀', 8269, 10, "上海", "一月", "男性", "2013"],

                ["电商", '京东', 374721, 10, "上海", "一月", "男性", "2011"],
                ["电商", '支付宝', 276447, 10, "上海", "一月", "男性", "2011"],
                ["电商", '美团网', 159875, 10, "北京", "一月", "男性", "2012"],
                ["电商", '唯品会', 149885, 10, "北京", "一月", "男性", "2012"],
                ["电商", '余额宝', 52943, 10, "上海", "一月", "男性", "2012"],
                ["电商", '手机淘宝', 19115, 10, "北京", "一月", "男性", "2013"],
                ["电商", '微信支付', 1535, 10, "上海", "一月", "男性", "2013"],

                ["浏览器", '360浏览器', 35739, 10, "上海", "一月", "男性", "2011"],
                ["浏览器", '搜狗浏览器', 22094, 10, "北京", "一月", "男性", "2012"],
                ["浏览器", 'opera浏览器', 984, 10, "上海", "一月", "男性", "2013"],

                ["人物", '刘强东', 26584, 10, "上海", "一月", "男性", "2011"],
                ["人物", '马云', 13839, 10, "北京", "一月", "男性", "2011"],
                ["人物", '马化腾', 7027, 10, "北京", "一月", "男性", "2012"],
                ["人物", '雷军', 7027, 10, "上海", "一月", "男性", "2012"],
                ["人物", '李彦宏', 3587, 10, "上海", "一月", "男性", "2013"],

                ["门户网站", '百度', 24584, 10, "北京", "一月", "男性", "2011"],
                ["门户网站", '谷歌', 3839, 10, "上海", "一月", "男性", "2012"],
                ["门户网站", 'hao123', 56027, 10, "北京", "一月", "男性", "2013"]
            ]

            break;
        case 'chinaMapLine':
            dataset = [

                ["北京", "上海", 10, "上海", "一月", "男性", 45, "2011"],
                ["北京", "郑州", 10, "上海", "一月", "男性", 45, "2011"],
                ["北京", "哈尔滨", 10, "上海", "一月", "男性", 45, "2011"],
                ["北京", "济南", 10, "上海", "一月", "男性", 45, "2011"],
                ["北京", "南京", 10, "上海", "一月", "男性", 45, "2011"],
                ["北京", "台湾", 10, "上海", "一月", "男性", 45, "2011"],
                ["北京", "杭州", 10, "上海", "一月", "男性", 45, "2011"],
                ["北京", "昆明", 10, "上海", "一月", "男性", 45, "2011"],
                ["北京", "乌鲁木齐", 10, "上海", "一月", "男性", 45, "2011"],
                ["北京", "广州", 10, "上海", "一月", "男性", 45, "2011"],
                ["北京", "拉萨", 10, "上海", "一月", "男性", 45, "2011"],
                ["北京", "长春", 10, "上海", "一月", "男性", 45, "2011"],
                ["北京", "海口", 10, "上海", "一月", "男性", 45, "2011"],
                ["北京", "天津", 10, "上海", "一月", "男性", 45, "2011"],
                ["上海", "南京", 10, "上海", "一月", "男性", 45, "2011"],
                ["上海", "北京", 10, "上海", "一月", "男性", 45, "2011"],
                ["上海", "广州", 10, "上海", "一月", "男性", 45, "2011"],
                ["上海", "拉萨", 10, "上海", "一月", "男性", 45, "2011"],
                ["上海", "哈尔滨", 10, "上海", "一月", "男性", 45, "2011"],
                ["上海", "郑州", 10, "上海", "一月", "男性", 45, "2011"],
                ["上海", "兰州", 10, "上海", "一月", "男性", 45, "2011"],
                ["郑州", "广州", 10, "上海", "一月", "男性", 45, "2011"],
                ["郑州", "开封", 10, "上海", "一月", "男性", 45, "2011"],
                ["郑州", "新乡", 10, "上海", "一月", "男性", 45, "2011"],
                ["郑州", "焦作", 10, "上海", "一月", "男性", 45, "2011"],
                ["郑州", "北京", 10, "上海", "一月", "男性", 45, "2011"],
                ["郑州", "拉萨", 10, "上海", "一月", "男性", 45, "2011"],
                ["郑州", "哈尔滨", 10, "上海", "一月", "男性", 45, "2011"],
                ["郑州", "乌鲁木齐", 10, "上海", "一月", "男性", 45, "2011"],
                ["郑州", "上海", 10, "上海", "一月", "男性", 45, "2011"],
                ["郑州", "青岛", 10, "上海", "一月", "男性", 45, "2011"],
                ["郑州", "南宁", 10, "上海", "一月", "男性", 45, "2011"],
                ["乌鲁木齐", "北京", 10, "上海", "一月", "男性", 45, "2011"],
                ["乌鲁木齐", "上海", 10, "上海", "一月", "男性", 45, "2011"],
                ["乌鲁木齐", "广州", 10, "上海", "一月", "男性", 45, "2011"],
                ["乌鲁木齐", "哈尔滨", 10, "上海", "一月", "男性", 45, "2011"],
                ["乌鲁木齐", "拉萨", 10, "上海", "一月", "男性", 45, "2011"],
                ["乌鲁木齐", "兰州", 10, "上海", "一月", "男性", 45, "2011"],
                ["拉萨", "北京", 10, "上海", "一月", "男性", 45, "2011"],
                ["拉萨", "广州", 10, "上海", "一月", "男性", 45, "2011"],
                ["拉萨", "上海", 10, "上海", "一月", "男性", 45, "2011"],
                ["拉萨", "西安", 10, "上海", "一月", "男性", 45, "2011"],
                ["拉萨", "兰州", 10, "上海", "一月", "男性", 45, "2011"],
                ["拉萨", "哈尔滨", 10, "上海", "一月", "男性", 45, "2011"]
            ]
            break;
        case 'chinaMapCircle':
            dataset = [

                ["乌鲁木齐", 5000, 10, "上海", "一月", "男性", 45, "2011"],
                ["苏州", 133576, 10, "上海", "一月", "男性", 45, "2011"],
                ["上海", 99647, 10, "上海", "二月", "女性", 45, "2011"],
                ["常州", 86260, 10, "北京", "一月", "男性", 45, "2011"],
                ["广州", 82592, 10, "北京", "一月", "男性", 45, "2011"],
                ["杭州", 61728, 10, "北京", "一月", "男性", 45, "2011"],
                ["成都", 27424, 10, "北京", "一月", "男性", 45, "2011"],
                ["北京", 24841, 10, "北京", "一月", "男性", 45, "2011"],
                ["青岛", 20293, 10, "北京", "一月", "男性", 45, "2011"],
                ["武汉", 16488, 10, "上海", "一月", "男性", 45, "2011"],
                ["大连", 15027, 10, "上海", "一月", "男性", 45, "2011"],
                ["秦皇岛", 11892, 10, "上海", "一月", "男性", 45, "2011"],
                ["哈尔滨", 9670, 10, "上海", "一月", "男性", 45, "2011"],
                ["黄山", 9177, 10, "上海", "一月", "女性", 45, "2011"],
                ["三亚", 8805, 10, "上海", "一月", "女性", 45, "2011"],
                ["大理", 7875, 10, "上海", "一月", "女性", 45, "2011"],
                ["重庆", 7850, 10, "上海", "一月", "女性", 45, "2011"],
                ["天津", 7671, 10, "上海", "一月", "女性", 45, "2011"]
            ]
            break;
        case 'simpleForce':
            dataset = [

                ["张三", "李四", 10, "上海", "一月", "男性", 45, "2011"],
                ["张三", "王五", 23, "北京", "一月", "男性", 45, "2011"],
                ["张三", "马六", 45, "上海", "一月", "男性", 67, "2011"],
                ["张三", "小宏", 70, "上海", "一月", "女性", 50, "2011"],
                ["张三", "小明", 64, "上海", "二月", "男性", 45, "2011"],
                ["张三", "小红", 23, "上海", "二月", "女性", 45, "2011"],
                ["张三", "小C", 45, "上海", "二月", "男性", 45, "2011"],
                ["张三", "小刚", 130, "上海", "二月", "男性", 45, "2011"],
                ["张三", "大佐", 120, "上海", "二月", "男性", 45, "2012"],
                ["张三", "小强", 46, "北京", "二月", "男性", 45, "2012"],
                ["张三", "小林", 35, "上海", "一月", "男性", 45, "2012"],
                ["张三", "大宝", 32, "北京", "一月", "男性", 45, "2012"],
                ["张三", "大山", 43, "上海", "一月", "男性", 67, "2012"],
                ["张三", "小山", 54, "上海", "一月", "女性", 50, "2012"],
                ["张三", "小佐", 150, "上海", "二月", "男性", 45, "2012"],
                ["张三", "小鹰", 100, "上海", "二月", "女性", 45, "2012"],
                ["李四", "小二", 45, "上海", "二月", "男性", 45, "2011"],
                ["李四", "小智", 50, "上海", "二月", "男性", 45, "2011"],
                ["李四", "小军", 12, "上海", "二月", "男性", 45, "2011"],
                ["李四", "小B", 56, "北京", "二月", "男性", 45, "2011"],
                ["李四", "天天", 7, "上海", "一月", "男性", 45, "2011"],
                ["李四", "大卡", 80, "北京", "一月", "男性", 45, "2011"],
                ["李四", "小霞", 23, "上海", "一月", "男性", 67, "2011"],
                ["李四", "小林", 15, "上海", "一月", "女性", 50, "2012"],
                ["李四", "小牧", 23, "上海", "二月", "男性", 45, "2012"],
                ["李四", "小风", 16, "上海", "二月", "女性", 45, "2012"],
                ["李四", "小A", 14, "上海", "二月", "男性", 45, "2012"],
                ["李四", "小爱", 78, "上海", "二月", "男性", 45, "2012"],
                ["李四", "小仁", 50, "上海", "二月", "男性", 45, "2012"],
                ["李四", "小卡", 14, "北京", "二月", "男性", 45, "2012"],
                ["李四", "小李", 20, "北京", "二月", "女性", 45, "2012"]
            ];
            break;
        case 'circlePack':
        case 'simpleTree':
            dataset = [

                ["中国", 0, "中国", 0, "一月", "男性", 45, "2011"],
                ["北京", 1, "中国", 0, "一月", "男性", 45, "2011"],
                ["密云县", 2, "北京", 47.4, "一月", "男性", 45, "2011"],
                ["朝阳区", 2, "北京", 374.5, "一月", "男性", 45, "2011"],
                ["海淀区", 2, "北京", 348.4, "一月", "男性", 45, "2011"],
                ["西城区", 2, "北京", 128.7, "一月", "男性", 45, "2011"],
                ["东城区", 2, "北京", 90.8, "一月", "男性", 45, "2011"],
                ["房产区", 2, "北京", 98.6, "一月", "男性", 45, "2011"],
                ["丰台区", 2, "北京", 221.4, "一月", "男性", 45, "2011"],
                ["石景山", 2, "北京", 63.9, "一月", "男性", 45, "2011"],
                ["通州区", 2, "北京", 129.1, "一月", "男性", 45, "2011"],
                ["上海", 1, "中国", 0, "一月", "男性", 45, "2011"],
                ["宝山", 2, "上海", 42, "一月", "男性", 45, "2011"],
                ["青浦", 2, "上海", 90, "一月", "男性", 45, "2011"],
                ["广东", 1, "中国", 0, "一月", "男性", 45, "2011"],
                ["广州", 2, "广东", 0, "一月", "男性", 45, "2011"],
                ["中山", 3, "广州", 0, "一月", "男性", 45, "2011"],
                ["黄圃镇", 4, "中山", 37, "一月", "男性", 45, "2011"],
                ["佛山", 3, "广州", 45, "一月", "男性", 45, "2011"],

                ["中国", 0, "中国", 0, "一月", "男性", 45, "2012"],
                ["北京", 1, "中国", 0, "一月", "男性", 45, "2012"],
                ["密云县", 2, "北京", 47.4, "一月", "男性", 45, "2012"],
                ["朝阳区", 2, "北京", 374.5, "一月", "男性", 45, "2012"],
                ["海淀区", 2, "北京", 56.4, "一月", "男性", 45, "2012"],
                ["西城区", 2, "北京", 345.7, "一月", "男性", 45, "2012"],
                ["东城区", 2, "北京", 56.8, "一月", "男性", 45, "2012"],
                ["房产区", 2, "北京", 234.6, "一月", "男性", 45, "2012"],
                ["丰台区", 2, "北京", 556.4, "一月", "男性", 45, "2012"],
                ["石景山", 2, "北京", 573.9, "一月", "男性", 45, "2012"],
                ["通州区", 2, "北京", 565.1, "一月", "男性", 45, "2012"],
                ["河北", 1, "中国", 0, "一月", "男性", 45, "2012"],
                ["石家庄", 2, "河北", 454, "一月", "男性", 45, "2012"],
                ["廊坊", 2, "上海", 234, "一月", "男性", 45, "2012"],
                ["山西", 1, "中国", 0, "一月", "男性", 45, "2012"],
                ["太原", 2, "山西", 0, "一月", "男性", 45, "2012"],
                ["晋中", 3, "太原", 0, "一月", "男性", 45, "2012"],
                ["乌金山镇", 4, "晋中", 452, "一月", "男性", 45, "2012"],
                ["迎泽区", 3, "太原", 424, "一月", "男性", 45, "2012"]
            ];
            break;

        case 'freeScatter':
        case 'solidScatter':
            dataset = [

                ["男性", 174.0, 65.6, 60, "张三", "一月", "北京", 2013],
                ["男性", 175.3, 71.8, 73, "张三", "一月", "上海", 2012],
                ["男性", 193.5, 80.7, 80, "张三", "二月", "北京", 2012],
                ["男性", 186.5, 72.6, 76, "张三", "二月", "上海", 2012],
                ["男性", 187.2, 78.8, 70, "李四", "一月", "北京", 2011],
                ["男性", 181.5, 74.8, 69, "李四", "一月", "上海", 2012],
                ["男性", 184.0, 86.4, 80, "李四", "二月", "北京", 2013],
                ["男性", 184.5, 78.4, 70, "李四", "二月", "上海", 2011],
                ["男性", 175.0, 62.0, 76, "王五", "一月", "北京", 2012],
                ["男性", 184.0, 81.6, 70, "王五", "一月", "上海", 2013],
                ["男性", 184.0, 79.6, 73, "王五", "二月", "北京", 2013],
                ["女性", 161.2, 51.6, 60, "王五", "二月", "上海", 2013],
                ["女性", 167.5, 59.0, 58, "马六", "一月", "北京", 2013],
                ["女性", 159.5, 49.2, 66, "马六", "一月", "上海", 2013],
                ["女性", 157.0, 63.0, 57, "马六", "二月", "北京", 2013],
                ["女性", 155.8, 53.6, 61, "马六", "二月", "上海", 2013],
                ["女性", 172.5, 55.2, 52, "琪琪", "一月", "北京", 2011],
                ["女性", 154.4, 46.2, 55, "琪琪", "一月", "上海", 2012],
                ["女性", 176.5, 83.0, 50, "琪琪", "二月", "北京", 2012],
                ["女性", 160.7, 69.1, 52, "琪琪", "二月", "上海", 2011],
                ["女性", 163.2, 55.9, 53, "叭叭", "一月", "北京", 2013],
                ["女性", 152.4, 46.5, 59, "叭叭", "一月", "上海", 2012],
                ["女性", 157.5, 54.3, 64, "叭叭", "二月", "北京", 2012],
                ["女性", 180.3, 60.7, 65, "叭叭", "二月", "上海", 2013],
                ["女性", 165.0, 62.0, 61, "啾啾", "一月", "北京", 2011],
                ["青年", 161.2, 51.6, 57, "啾啾", "一月", "上海", 2012],
                ["青年", 163.5, 56.0, 54, "啾啾", "二月", "北京", 2011],
                ["青年", 157.5, 60.2, 53, "啾啾", "二月", "上海", 2012],
                ["青年", 166.0, 67.0, 51, "诗诗", "一月", "北京", 2013],
                ["青年", 167.8, 78.6, 57, "诗诗", "一月", "上海", 2012],
                ["青年", 156.5, 67.2, 48, "诗诗", "二月", "北京", 2011],
                ["青年", 153.4, 56.2, 51, "诗诗", "二月", "上海", 2013],
                ["青年", 167.5, 79.0, 60, "依依", "一月", "北京", 2011],
                ["青年", 165.7, 67.1, 49, "依依", "一月", "上海", 2012],
                ["青年", 164.2, 56.9, 60, "依依", "二月", "北京", 2013],
                ["青年", 156.4, 59.5, 62, "依依", "二月", "上海", 2013],
                ["青年", 156.5, 67.3, 68, "尔尔", "一月", "北京", 2012],
                ["青年", 170.3, 56.7, 63, "尔尔", "一月", "上海", 2013],
                ["青年", 156.0, 50.0, 64, "尔尔", "二月", "北京", 2011],
                ["儿童", 120.2, 40.6, 45, "尔尔", "二月", "上海", 2012],
                ["儿童", 130.5, 45.0, 42, "释义", "一月", "北京", 2011],
                ["儿童", 125.5, 50.2, 47, "释义", "一月", "上海", 2012],
                ["儿童", 123.0, 48.0, 48, "释义", "二月", "北京", 2013],
                ["儿童", 125.8, 43.6, 38, "释义", "二月", "上海", 2013],
                ["儿童", 131.5, 40.2, 42, "诗诗", "一月", "北京", 2012],
                ["儿童", 126.4, 38.2, 50, "诗诗", "一月", "上海", 2012],
                ["儿童", 120.5, 40.0, 55, "诗诗", "二月", "北京", 2011],
                ["儿童", 130.7, 43.1, 46, "诗诗", "二月", "上海", 2012],
                ["儿童", 127.2, 30.9, 51, "示儿", "一月", "北京", 2013],
                ["儿童", 135.4, 34.5, 49, "示儿", "一月", "上海", 2011],
                ["儿童", 127.5, 36.3, 55, "示儿", "二月", "北京", 2012],
                ["儿童", 139.3, 40.7, 41, "示儿", "二月", "上海", 2013],
                ["儿童", 142.0, 46.0, 37, "示三", "二月", "上海", 2011]
            ];
            break;

        case '3dBubble':
        case 'freeBubble':
            dataset = [

                ["男性", 174.0, 65.6, 60, "张三", "一月", "北京", 2013],
                ["男性", 175.3, 71.8, 73, "张三", "一月", "上海", 2012],
                ["男性", 193.5, 80.7, 80, "张三", "二月", "北京", 2012],
                ["男性", 186.5, 72.6, 76, "张三", "二月", "上海", 2012],
                ["男性", 187.2, 78.8, 70, "李四", "一月", "北京", 2011],
                ["男性", 181.5, 74.8, 69, "李四", "一月", "上海", 2012],
                ["男性", 184.0, 86.4, 80, "李四", "二月", "北京", 2013],
                ["男性", 184.5, 78.4, 70, "李四", "二月", "上海", 2011],
                ["男性", 175.0, 62.0, 76, "王五", "一月", "北京", 2012],
                ["男性", 184.0, 81.6, 70, "王五", "一月", "上海", 2013],
                ["男性", 184.0, 79.6, 73, "王五", "二月", "北京", 2013],
                ["女性", 161.2, 51.6, 60, "王五", "二月", "上海", 2013],
                ["女性", 167.5, 59.0, 58, "马六", "一月", "北京", 2013],
                ["女性", 159.5, 49.2, 66, "马六", "一月", "上海", 2013],
                ["女性", 157.0, 63.0, 57, "马六", "二月", "北京", 2013],
                ["女性", 155.8, 53.6, 61, "马六", "二月", "上海", 2013],
                ["女性", 172.5, 55.2, 52, "琪琪", "一月", "北京", 2011],
                ["女性", 154.4, 46.2, 55, "琪琪", "一月", "上海", 2012],
                ["女性", 176.5, 83.0, 50, "琪琪", "二月", "北京", 2012],
                ["女性", 160.7, 69.1, 52, "琪琪", "二月", "上海", 2011],
                ["女性", 163.2, 55.9, 53, "叭叭", "一月", "北京", 2013],
                ["女性", 152.4, 46.5, 59, "叭叭", "一月", "上海", 2012],
                ["女性", 157.5, 54.3, 64, "叭叭", "二月", "北京", 2012],
                ["女性", 180.3, 60.7, 65, "叭叭", "二月", "上海", 2013],
                ["女性", 165.0, 62.0, 61, "啾啾", "一月", "北京", 2011],
                ["青年", 161.2, 51.6, 57, "啾啾", "一月", "上海", 2012],
                ["青年", 163.5, 56.0, 54, "啾啾", "二月", "北京", 2011],
                ["青年", 157.5, 60.2, 53, "啾啾", "二月", "上海", 2012],
                ["青年", 166.0, 67.0, 51, "诗诗", "一月", "北京", 2013],
                ["青年", 167.8, 78.6, 57, "诗诗", "一月", "上海", 2012],
                ["青年", 156.5, 67.2, 48, "诗诗", "二月", "北京", 2011],
                ["青年", 153.4, 56.2, 51, "诗诗", "二月", "上海", 2013],
                ["青年", 167.5, 79.0, 60, "依依", "一月", "北京", 2011],
                ["青年", 165.7, 67.1, 49, "依依", "一月", "上海", 2012],
                ["青年", 164.2, 56.9, 60, "依依", "二月", "北京", 2013],
                ["青年", 156.4, 59.5, 62, "依依", "二月", "上海", 2013],
                ["青年", 156.5, 67.3, 68, "尔尔", "一月", "北京", 2012],
                ["青年", 170.3, 56.7, 63, "尔尔", "一月", "上海", 2013],
                ["青年", 156.0, 50.0, 64, "尔尔", "二月", "北京", 2011],
                ["儿童", 120.2, 40.6, 45, "尔尔", "二月", "上海", 2012],
                ["儿童", 130.5, 45.0, 42, "释义", "一月", "北京", 2011],
                ["儿童", 125.5, 50.2, 47, "释义", "一月", "上海", 2012],
                ["儿童", 123.0, 48.0, 48, "释义", "二月", "北京", 2013],
                ["儿童", 125.8, 43.6, 38, "释义", "二月", "上海", 2013],
                ["儿童", 131.5, 40.2, 42, "诗诗", "一月", "北京", 2012],
                ["儿童", 126.4, 38.2, 50, "诗诗", "一月", "上海", 2012],
                ["儿童", 120.5, 40.0, 55, "诗诗", "二月", "北京", 2011],
                ["儿童", 130.7, 43.1, 46, "诗诗", "二月", "上海", 2012],
                ["儿童", 127.2, 30.9, 51, "示儿", "一月", "北京", 2013],
                ["儿童", 135.4, 34.5, 49, "示儿", "一月", "上海", 2011],
                ["儿童", 127.5, 36.3, 55, "示儿", "二月", "北京", 2012],
                ["儿童", 139.3, 40.7, 41, "示儿", "二月", "上海", 2013],
                ["儿童", 142.0, 46.0, 37, "示三", "二月", "上海", 2011]
            ];
            break;
             case 'KLine' :
        	dataset = [
        		["2013/5/1",200,2302.6,2287.3,2362.94],
                ["2013/5/2",2300,2291.3,2288.26,2308.38],
                ["2013/5/3",2295.35,2346.5,2295.35,2346.92],
                ["2013/5/4",2347.22,2358.98,2337.35,2363.8],
                ["2013/5/5",2360.75,2382.48,2347.89,2383.76],
                ["2013/5/6",2383.43,2385.42,2371.23,2391.82],
                ["2013/5/7",2377.41,2419.02,2369.57,2421.15],
                ["2013/5/8",2425.92,2428.15,2417.58,2440.38],
                ["2013/5/9",2411,2433.13,2403.3,2437.42],
                ["2013/5/10",2432.68,2434.48,2427.7,2441.73],
                ["2013/5/11",2322.94,2314.16,2308.76,2330.88],
                ["2013/5/12",2320.62,2325.82,2315.01,2338.78],
                ["2013/5/13",2313.74,2293.34,2289.89,2340.71],
                ["2013/5/14",2297.77,2313.22,2292.03,2324.63],
                ["2013/5/15",2322.32,2365.59,2308.92,2366.16],
                ["2013/5/16",2364.54,2359.51,2330.86,2369.65],
                ["2013/5/17",2332.08,2273.4,2259.25,2333.54],
                ["2013/5/18",2274.81,2326.31,2270.1,2328.14],
                ["2013/5/19",2333.61,2347.18,2321.6,2351.44],
                ["2013/5/20",2340.44,2324.29,2304.27,2352.02]
        	];
        	break;
    }
    return dataset;
}
STH.util.scale = function(type, domainData, rangeType, rangeDomain, padding) {

    var scale = null

    if (type == 'ordinal') {

        scale = d3.scale.ordinal()

    } else if (type == 'linear') {

        scale = d3.scale.linear()

    } else if (type == "time") {

    	scale = d3.time.scale()

    }
   if (type == "time") {
    	console.log(111)
    	scale.domain(d3.extent(domainData)).ticks(2)
    } else {
    	scale.domain(domainData)
    }
    

    if (rangeType == 'range') {

        scale.range(rangeDomain)

    } else if (rangeType == 'rangeBands') {

        scale.rangeBands(rangeDomain, padding)

    } else if (rangeType == 'rangePoints') {

        scale.rangePoints(rangeDomain, padding)

    } else if (rangeType == 'rangeRoundBands') {

        scale.rangeRoundBands(rangeDomain, padding)

    }




    return scale
}

