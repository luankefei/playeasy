

'use strict'

/**
 * @name  chartbar.js
 * @description  图表工具条
 * @author  sunken
 * @date 2015.7.16
 */

// TODO: 这个文件文件需要整体重构
define(function(require, exports) {

    var Controlbar = require('./controlbar')
    var chartBar = null

    // 按照当前选中的chart对象，初始化属性
    var initOptions = function(bar) {

        console.log(bar)
    }

    // 刷新DOM
    var refreshRender = function() {

        // TODO: 初始化图表类型列表
        var chartTypeList = $('#select-chart-type ul')
        var html = ''

        for (var i = 0; i < this.chartTypeSupport.length; i++) {

            html = html 
                + '<li>' 
                + this.chartTypeSupport[i] 
                + '</li>'
        }

        chartTypeList.html(html)

        console.log('图表类型列表初始化完成')
    }

    // 工具条在初次添加控件的时候初始化，通过单例创建
    // TODO: 部分属性应该抽离到配置文件中
    // TODO: 属性需要重新规划，哪些需要属性，为什么需要
    function ChartBar(render) {
    
        // 当前选中控件对象
        this.target = null

        // 生成工具条的容器
        this.render = null

        // 当前选中的面板
        this.currentPanelIndex = 0

        // TODO: 图表类型，其实是选中了support中的第一项
        this.currentChartType = 'bar'

        // 支持的图表类型
        this.chartTypeSupport = ['bar', 'pie']

        // 坐标轴开关
        this.axis = true

        // 信息开关
        this.message = false

        // 图例
        this.legend = false

        // 时间轴
        this.timeAxis = false

        // 数据
        this.data = []

        // 标题
        this.title = ''
        
        // x轴标题
        this.xTitle = ''

        // y轴标题
        this.yTitle = ''

        // 激活事件
        var initEvents = function(render) {

            // 下拉列表的点击事件
            // TODO: 找不到下拉列表的render对象，需要记录。其他控件也一样
            $(render).on('click', function() {

                console.log('render clicked')
            })
        }   

        // 构造函数，负责初始化整个工具条对象
        ! function(base) {

            base.render = render

            // 初始化：加载右侧工具条
            $(base.render).load('/view/detail-chartbar.html')

            // 最后激活事件，在构造函数内执行，保证事件只绑定一次
            initEvents(base.render)
            
        } (this)


        // TODO: 可扩展大量图表组件属性，与图表组建支持达成一致
        // 根据选中对象，进行初始化
        this.init = function() {

            // 根据当前选中控件的属性，重置工具条属性
            var chart = $(this.target).data('chart')

            // 初始化选项，下拉框
            initOptions(this)
           
            // 然后调用刷新函数，变更DOM
            refreshRender.call(this)
            
            // 显示工具条
            this.render.style.display = 'block'
        }
    }

    ChartBar.prototype = new Controlbar()

    exports.init = function(target) {

        if (chartBar === null) {

            var render = $('#chart-bar')

            // 传递的是dom对象
            chartBar = new ChartBar(render[0])
        }

        chartBar.target = target
        chartBar.init()

        return chartBar
    }
})



/**
 * 2015.7.18
 * 修改init函数，将事件绑定移动到chartbar的构造函数内执行
 */