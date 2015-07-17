
'use strict'

/**
 * @name  detail-controlbar.js
 * @description  控件工具条模块
 * @author  sunken
 * @date 2015.7.16
 */
define(function(require, exports, module) {

    var chartbar = require('./bar/chartbar')
    var controlbar = {}

    // 根据传入的对象类型，初始化不同的工具条    
    controlbar.init = function(target) {

        // 获取当前选中控件类型
        var type = target.getAttribute('data-type')

        // 控件类型映射
        var map = {

            'chart': (function() {
                return chartbar.init(target)
            })(),

            'text': null
        }

        var bar = map[type]

        bar.target = target
        bar.init()
    }

    module.exports = controlbar
})

/**
 */