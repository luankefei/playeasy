
'use strict'

/**
 * @name  detail-control.js
 * @description  导出control对象，负责对象处理的流程
 * @author  sunken
 * @date 2015.7.13
 */
define(function(require, exports, module) {

    var Chart = require('./control/chart')
        // text = require('./detail-text'),
        // image = require('./detail-image'),
        // button = require('./detail-button'),


    
    var control = {}

    function Control() {

        this.type = null
        this.sarial = null
    }

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