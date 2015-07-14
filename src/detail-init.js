
'use strict'

/**
 * @name  detail-init.js
 * @description  detail页面的初始化模块
 * @author  sunken
 * @date 2015.7.14
 */
define(function(require, exports, module) {

    var init = {}

    // 初始化页面各部分
    init.loadPage = function() {

        // 加载左侧添加工具条
        $('#add-bar').load('/view/detail-addbar.html')


        // 加载右侧工具条
        $('#chart-bar').load('/view/detail-chartbar.html')
    }

    module.exports = init
})

/**
 * 
 */