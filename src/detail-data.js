
'use strict'

/**
 * @name  detail-data.js
 * @description  数据框体的功能、事件
 * @author  sunken
 * @date 2015.7.15
 */
define(function(require, exports) {

    var convert = require('./detail-convert')

    var handleUpload = function() {

        var reader = new FileReader()
        var file = this.files[0]

        reader.readAsText(this.files[0])

        reader.onload = function() {

            var text = convert.format(reader.result, file.type)

            console.log(text)
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

        PE.toggleShadow()
    })

    // 本地上传
    $('#upload').on('change', function() {

        handleUpload.call(this)
    })
})