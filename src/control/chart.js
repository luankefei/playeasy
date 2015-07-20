
'use strict'

/**
 * @name  chart.js
 * @description  控件基类
 * @author  sunken
 * @date 2015.7.14
 */
define(function(require, exports, module) {

    var Control = require('./control')

    function Chart() {

        // 图表类型
        this.type = 'bar'
        // dom对象
        this.target = null
        // highcharts对象
        this.chart = null
        // 绘图数据
        this.data = null

        this.draw = function() {

            var base = this

            // 先加载默认数据
            // TODO: 路径应该有配置文件
            $.get('/public/data/chart.json', function(data) {

                base.data = data

                // 绘制前设置renderTo属性，否则会初始化为默认值null
                base.data.chart.renderTo = base.target
                base.chart = new Highcharts.Chart(base.data)

                // 将图表对象与dom对象关连
                $(base.target).data('chart', base.chart)
                $(base.target).data('data', base.data)
            })
        }

        // TODO: 多控件公用的代码        
        this.init = function() {

            var target = $.create('div')
                .addClass('control')
                .attr('data-type', 'chart')
                .css('position', 'absolute')
                .css('top', 0)
                .css('left', 0)
                .appendTo('.block-selected')

            this.target = target[0]

            this.draw()

            // 返回dom对象
            return this.target
        }

        return this
    }

    Chart.prototype = new Control()
   
    module.exports = Chart
})

/**
 * 2015.7.13
 * 增加控件的创建流程
 * 增加控件的拖拽事件
 * 增加对Highcharts的调用
 * 2015.7.17
 * 增加了data属性，绘图数据将记录在这里
 * 修改了draw函数，绘图结束后，将图表对象与dom对象关连
 */