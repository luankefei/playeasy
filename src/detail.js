
'use strict'

/**
 * @name  list.js
 * @description  列表页的入口js
 * @author  sunken
 * @date 2015.7.9
 */
define(function(require, exports) {

    var init = require('./detail-init')
        // toolbar = require('./detail-toolbar'),
        // controlbar = require('./detail-controlbar')

    exports.init = function() {

        // 初始化图表库
        init.loadChartLib()

        // 初始化页面各部分
        init.loadPage()

        // 控件的拖拽事件
        $('.control').live('mousedown', function(e) {

            // 如果不是鼠标左键，直接退出
            if (e.which !== 1) {

                return false
            }

            var target = $(this)
            var mouseStart = { x: e.pageX, y: e.pageY },
                controlStart = {
                    x: target.position().left,
                    y: target.position().top
                }                

            // 选中当前控件
            init.selectControl(this)

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
 * 2015.7.14
 * 引入了detail-init模块
 * 重构了部分代码
 * 2015.7.16
 * 修改了控件拖拽事件，mousedown时会调用init模块的selectControl
 */