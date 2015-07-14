
'use strict'

/**
 * @name  list.js
 * @description  列表页的入口js
 * @author  sunken
 * @date 2015.7.9
 */
define(function(require, exports) {

    var init = require('./detail-init')

    exports.init = function() {

        // 初始化图表库
        init.loadChartLib()

        // 初始化页面各部分
        init.loadPage()

        // TODO: 初始化页面工具条事件，应该在loadPage的回调中执行
        // setTimeout(function() {

        //     init.bindToolEvent()

        // }, 1000)

        // 控件的拖拽事件
        $('.control-selected').live('mousedown', function(e) {

            var target = $(this)
            var mouseStart = { x: e.pageX, y: e.pageY },
                controlStart = { 
                    x: target.position().left,
                    y: target.position().top
                }
            
            $(document).on('mousemove', function(e) {

                var x = e.pageX - mouseStart.x + controlStart.x + 'px',
                    y = e.pageY - mouseStart.y + controlStart.y + 'px'

                target.css('left', x)
                    .css('top', y)
            })

            $(document).on('mouseup', function() {

                // 回收拖拽事件
                $(document).off('mousemove')
                $(document).off('mouseup')
            })
        })
    }
})

/**
 * 2015.7.13
 * 增加控件的创建流程
 * 增加控件的拖拽事件
 * 增加对Highcharts的调用
 * 将控件部分代码移动到了detail-control文件中，通过require引入
 */