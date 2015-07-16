
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

        this.draw = function() {

            this.chart = new Highcharts.Chart({
                chart: {
                    renderTo: this.target[0],
                    type: this.type
                },

                xAxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
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
            })
        }

        // TODO: 多控件公用的代码        
        this.init = function() {

            this.target = $.create('div')
                .addClass('control')
                .addClass('selected')
                .css('position', 'absolute')
                .css('top', 0)
                .css('left', 0)
                .appendTo('.block-selected')

            this.draw()

            // 返回dom对象
            return this.target[0]
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
 */