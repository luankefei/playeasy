

'use strict'

/**
 * @name  chartbar.js
 * @description  图表工具条
 * @author  sunken
 * @date 2015.7.16
 */
define(function(require, exports) {

    var Controlbar = require('./controlbar')
    var chartBar = null

    // 工具条在初次添加控件的时候初始化，通过单例创建
    function ChartBar() {
    
        // 当前选中控件对象
        this.target = null

        // 生成工具条的容器
        this.renderTo = null

        // 当前选中的面板
        this.currentPanelIndex = 0

        // 图表类型
        this.currentChartType = 'bar'

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


        // 构造函数，负责初始化整个工具条对象
        ! function() {

            // 初始化：加载右侧工具条
            $('#chart-bar').load('/view/detail-chartbar.html')
            

        } ()





        // TODO: 可扩展大量图表组件属性，与图表组建支持达成一致
        // 
        // 
        // 根据选中对象，进行初始化
        this.init = function() {

            console.log('初始化右侧工具条')

            // 根据当前选中控件的属性，重置工具条属性
            var chart = $(this.target).data('chart')


            console.log(chart)

            //this.target = chart

            // 初始化和重置走不同流程


            // 初始化选项，下拉框
            
            // 初始化事件
            
            // 重置选中状态

            // 显示工具条
           
            // 然后调用刷新函数，变更DOM
            // 
            // 最后激活事件
            // 
            // 
            // 考虑事件是否有回收必要
            // 
            // 显示工具条
        }
    }

    ChartBar.prototype = new Controlbar()

    exports.init = function(target) {

        if (chartBar === null) {

            chartBar = new ChartBar()
        }

        chartBar.target = target
        chartBar.init()

        return chartBar
    }
})

/**
 */