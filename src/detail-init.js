
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
    var LoadTimer = function() {

        this.count = 0
        this.now = 0
        this.callback = null

        this.step = function() {

            ++this.now

            if (this.now === this.count) {

                this.callback && this.callback()
            }
        }

        return this
    }

    init.loadChartLib = function() {

        // 加载highcharts
        seajs.use('/public/lib/adapters/standalone-framework.src.js', function() {
            seajs.use(['/public/lib/highcharts.src.js'])
        })
    }

    // 初始化页面各部分
    init.loadPage = function() {

        // 启动计数器，全部加载完成后，执行事件绑定
        var timer = new LoadTimer()

        timer.count = 4
        timer.callback = function() {

            init.bindToolEvent()
        }

        // 加载完成后，进行计数
        var loadCallback = function() {

            timer.step()
        }

        // 加载左侧添加工具条
        $('#add-bar').load('/view/detail-addbar.html', loadCallback)

        // 添加顶部公共工具条
        $('#start-bar').load('/view/detail-startbar.html', loadCallback)

        // 加载左侧数据工具条
        $('#left-bar').load('/view/detail-leftbar.html', loadCallback)

        // 加载右侧工具条
        $('#chart-bar').load('/view/detail-chartbar.html', loadCallback)
    }

    // 初始化页面工具条事件
    // TODO: 很多临时处理，需要重构
    init.bindToolEvent = function() {

        // 创建图表
        $('#add-chart').on('click', function() {

            var chart = control.create('chart')

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
 * 2015.7.14
 * 增加LoadTimer类，负责页面加载的流程控制
 */