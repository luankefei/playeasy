
'use strict'

/**
 * @name  detail-data.js
 * @description  数据框体的功能、事件
 * @author  sunken
 * @date 2015.7.15
 */
define(function(require, exports) {

    var convert = require('./detail-convert')

    // 给新添加的列名绑定拖放事件
    function bindDrop() {

        // 获取含有拖拽属性的标签
        var nodes = $('.data-column:not([draggable])')

        // 添加属性，激活拖放
        nodes.attr('draggable', 'true')

        nodes.on('dragstart', function(e) {

            console.log('dragstart')

            var name = e.target.innerHTML

            e.dataTransfer.setData('name', name)
        })
    }

    // 将上传好的数据字段，生成html代码并显示在列表的左侧
    // TODO: 低效率
    var displayOnDataList = function(name, data) {

        var wrap = $('#left-bar > .data')
        
        var dl = $.create('dl'),
            dt = $.create('dt'),
            dd = $.create('dd'),
            ul = $.create('ul')

        dl.append(dt)
            .append(dd)
            .data(data)

        dt.html(name)

        var html = '',
            className = 'data-column'

        for (var k in data[0]) {

            html = html + '<li class="' + className + '">' + k + '</li>'
        }

        ul.html(html)
        dd.append(ul)
        
        wrap.append(dl)
    }

    var handleUpload = function() {

        var reader = new FileReader()
        var file = this.files[0]

        reader.readAsText(this.files[0])

        reader.onload = function() {

            var data = convert.format(reader.result, file.type)

            // 显示在数据列表上
            displayOnDataList(file.name, data)

            // 给新添加的列明绑定拖放事件
            bindDrop()
        }
    }

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
        // TODO: 重置整个数据源配置流程

        PE.toggleShadow()
    })

    // 本地上传
    $('#upload').on('change', function() {

        handleUpload.call(this)
    })
})

/**
 * 2015.7.27
 * 修改了displayOnDataList的dom生成，准备添加拖拽事件
 * 增加了bindDrop函数，用于激活drop事件
 */