
'use strict'

/**
 * @name  list.js
 * @description  列表页的入口js
 * @author  sunken
 * @date 2015.7.9
 */

define(function(require) {

    var models = [],
        heightArr = [],
        page = 1,
        perPage = 5,
        reading = false,
        columnWidth = 255,
        column = null,
        nodata = false

    var getTemplate = function(page, perPage, callback) {

        var loading = true

        $.ajax({
            type: 'get',
            url: '/template',
            before: function(req) {

                var start = (page - 1) * perPage
                var end = page * perPage

                req.setRequestHeader('range', start + ',' + end)
            },  
            success: function(data) {

                console.log(data)

                reading = false

                callback && callback(data)
            }
        })
    }

    var layoutTemplates = function(data) {

        console.log('layout templates')
    }

    var init = function() {

        select.column = parseInt(document.body.clientWidth / select.columnWidth)

        // 获取template
        selectAjax.getTemplate(1, 10, function(data) {

            layoutTemplates(data)
        })
    }

    // 测试接口
    ! function() {

        getTemplate(1, 10, function(data) {

            console.log('get template sucess callback')
        })

    } ()
})
