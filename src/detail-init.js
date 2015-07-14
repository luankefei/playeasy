
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

        // 加载左侧数据工具条
        $('#left-bar').load('/view/detail-leftbar.html')

        // 加载右侧工具条
        $('#chart-bar').load('/view/detail-chartbar.html')
    }

    // 初始化页面工具条事件
    // TODO: 很多临时处理，需要重构
    init.bindToolEvent = function() {

        // 创建图表
        $('#add-chart').on('click', function() {

            var chart = control.create('chart')
            // var types = ['line', 'column', 'pie', 'bar', 'area', 'scatter', 'gauge', 'heatmap']
            // chart.type = types[parseInt(Math.random() * 100 % 7)]
            chart.init()
        })

        // 添加文本
        $('#add-text').on('click', function() {

            var text = control.create('text')

            text.init()
        })

        // 展开左侧数据工具条
        $('#add-data').on('click', function() {

            $('#left-bar').show()
        })

        // 建立数据库连接：开始
        $('#new-connect').on('click', function() {

            $('.new-connect').show()

            PE.toggleShadow()
        })

        // 建立数据源连接：下一页
        $('.new-connect button:not([data-id="3"])').on('click', function(e) {

            var index = $(this).attr('data-id')
            var currentPage = $('.new-connect .page[data-id="' + index + '"]')
            var currentProgress = $('.new-connect .bar li.selected')
                .next()
                .addClass('selected')

            currentPage.hide()
            currentPage.next().show()
        })

        // 建立数据源连接：完成
        $('.new-connect button[data-id="3"]').on('click', function(e) {

            $('.new-connect').hide()

            PE.toggleShadow()
        })
    }

    module.exports = init
})

/**
 * 
 */