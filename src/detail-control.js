
'use strict'

/**
 * @name  list.js
 * @description  列表页的入口js
 * @author  sunken
 * @date 2015.7.9
 */
define(function(require, exports, module) {

    var control = {}

    function Control() {

        this.type = null
        this.sarial = null
    }

    function Chart() {

        // 图表类型
        this.type = 'pie'
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
                        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                },

                series: [{
                    data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
                }],
                colors: ['#ed4441', '#eda7bb', '#ff6f76']
            })
        }
        
        this.init = function() {

            this.target = $.create('div')
                .addClass('control')
                .addClass('control-selected')
                .css('position', 'absolute')
                .css('top', 0)
                .css('left', 0)
                .appendTo('.block-selected')

            this.draw()
        }

        return this
    }

    Chart.prototype = new Control()

    control.create = function(type) {

        // TODO: eval
        return eval('new ' + type[0].toUpperCase() + type.substring(1) + '()')
    }
   
    module.exports = control
})

/**
 * 2015.7.13
 * 增加控件的创建流程
 * 增加控件的拖拽事件
 * 增加对Highcharts的调用
 */