
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

    // 重置控件的选中状态
    control.initSelected = function(target) {

        // case 1: 当前控件未被选中，进入选中流程
        if (!$(target).hasClass('selected')) {

            var selected = $('.control.selected')

            // 先清除之前的选中状态
            if (selected.length > 0) {

                selected.removeClass('selected')
            }

            $(target).addClass('selected')

            return false
        }

        // case 2: 当前控件已被选中
        return true
    }

    // 在create时，直接调用初始化，返回创建的dom对象
    control.create = function(type) {

        var obj = eval('new ' + type[0].toUpperCase() + type.substring(1) + '()')
        var target = obj.init()

        return target
    }
   
    module.exports = control
})

/**
 * 2015.7.13
 * 增加控件的创建流程
 * 增加控件的拖拽事件
 * 增加对Highcharts的调用
 * 2015.7.16
 * 增加initControlSelected函数，供detail模块调用，用来初始化控件选中状态
 * 修改了control.create函数，创建对象后，直接调用初始化
 */