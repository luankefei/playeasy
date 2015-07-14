
'use strict'

/**
 * @name  detail-init.js
 * @description  detail页面的初始化模块
 * @author  sunken
 * @date 2015.7.14
 */
define(function(require, exports, module) {

    var control = require('./detail-control')

    var init = {}

    init.loadChartLib = function() {

        // 加载highcharts
        seajs.use('/public/lib/adapters/standalone-framework.src.js', function() {
            seajs.use(['/public/lib/highcharts.src.js'])
        })
    }

    // 初始化页面各部分
    init.loadPage = function() {

        // 加载左侧添加工具条
        $('#add-bar').load('/view/detail-addbar.html')

        // 添加顶部公共工具条
        $('#start-bar').load('/view/detail-startbar.html')

        // 加载右侧工具条
        $('#chart-bar').load('/view/detail-chartbar.html')
    }

    // 初始化页面工具条事件
    init.bindToolEvent = function() {

        // 创建图表
        $('#add-chart').on('click', function() {

            var chart = control.create('chart')
            // var types = ['line', 'column', 'pie', 'bar', 'area', 'scatter', 'gauge', 'heatmap']
            // chart.type = types[parseInt(Math.random() * 100 % 7)]
            chart.init()
        })
    }

    module.exports = init
})

/**
 * 
 */