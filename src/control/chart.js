
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
        this.data = {
            chart: {
                renderTo: null,
                type: this.type
            },

            xAxis: {

                label: {

                    enabled: true
                },

                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },

            // yAxis: '',

            yAxis: {
                title: ''
            },

            series: [{
                data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
            }],

            colors: ['#ed4441', '#eda7bb', '#ff6f76'],

            title: '',

            credits: {
                enabled: false
            },

            legend: {
                enabled: false
            }
        }

        this.draw = function() {

            // 绘制前设置renderTo属性，否则会初始化为默认值null
            this.data.chart.renderTo = this.target

            this.chart = new Highcharts.Chart(this.data)

            // 将图表对象与dom对象关连
            // $(this.target).data('data', this.data) 
            $(this.target).data('chart', this.chart)
        }

        // TODO: 多控件公用的代码        
        this.init = function() {

            var target = $.create('div')
                .addClass('control')
                .addClass('selected')
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