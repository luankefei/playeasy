
'use strict'

/**
 * @name  detail-controlbar.js
 * @description  控件工具条
 * @author  sunken
 * @date 2015.7.16
 */
define(function(require, exports) {

    var ControlBar = require('./detail-controlbar')

    // 工具条在初次添加控件的时候初始化，通过单例创建
    function ChartBar() {

        // 当前选中的面板
        this.currentPanelIndex = 0

        // 

    }

    ChartBar.prototype = new ControlBar()

    exports.init = function(target) {


        // TODO: 测试创建
        return new ChartBar()
    }
})

/**
 */