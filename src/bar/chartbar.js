

'use strict'

/**
 * @name  chartbar.js
 * @description  图表工具条
 * @author  sunken
 * @date 2015.7.16
 */
define(function(require, exports) {

    var Controlbar = require('./controlbar')

    // 工具条在初次添加控件的时候初始化，通过单例创建
    function ChartBar() {

        // 当前选中的面板
        this.currentPanelIndex = 0

        // 初始化工具条
        this.init = function() {

            // 初始化和重置走不同流程

            // 初始化选项，下拉框
            
            // 初始化事件
            
            // 重置选中状态

            // 显示工具条

            console.log(this.target)


        }
    }

    ChartBar.prototype = new Controlbar()

    exports.init = function(target) {


        // TODO: 测试创建
        return new ChartBar()
    }
})

/**
 */