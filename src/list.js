
'use strict'

/**
 * @name  list.js
 * @description  列表页的入口js
 * @author  sunken
 * @date 2015.7.9
 */

define(function(require) {

    var setting = {
        models: [],
        page: 1,
        perPage: 5,

        column: null,
        columnWidth: 255,
        templateWidth: 220,
        nodata: false
    }

    // 获取全部模板
    var getTemplate = function(page, perPage, callback) {

        $.ajax({
            type: 'get',
            url: '/template',
            success: function(data) {

                callback && callback(data)
            }
        })
    }

    // 获取各列的高度，返回一个数组
    var getColumnHeight = function() {

        var heightArr = []

        for (var i = 0; i < setting.column; i++) {

            // 取每一列的最后一个元素，计算高度和位置
            var columnArr = $('.template[data-column="' + i + '"]')

            // 取出最后一个元素，计算高度和位置
            if (columnArr.length > 0) {

                var lastObj = columnArr[columnArr.length - 1]

                // TODO: magic number 15 貌似是padding-top
                var columnHeight = parseInt($(lastObj).attr('data-y'))
                    + parseInt($(lastObj).height())
                    + 15

                heightArr.push(columnHeight)

            } else {

                heightArr.push(0)
            }
        }

        return heightArr
    } // end function -> findColumn

    var getShorter = function(heightArr, option) {

        // 获得最小数
        var min = null
        var minColumn = 0

        for (var i = 0; i < heightArr.length; i++) {

            if (i == 0) {

                min = heightArr[i]

            } else {

                if (heightArr[i] < min) {

                    min = heightArr[i]
                    minColumn = i
                }
            }
        }

        if (option == 'column') {

            return minColumn

        } else {

            return min
        }
    }

    // TODO: 排序貌似有问题，现在是乱序，应该是按照imgReady的返回顺序进行排列的
    var layoutTemplates = function(data) {

        var heightArr = getColumnHeight()
        var dataArr = []

        // 这里模拟了瀑布流插入，预算高度
        for (var i = 0; i < data.length; i++) {

            var thumbnail = data[i]['thumbnail']

            // 延长i的生命周期至imgReady回调
            ! function(i, thumbnail) {
                
                var callback = function() {

                    var width = this.width,
                        height = this.height,
                        rate = width / setting.templateWidth,
                        tempData = data[i]

                    var shorterColumn = getShorter(heightArr, 'column')

                    width = setting.templateWidth
                    height = height / rate
                    // description 75 + padding-bottom 20
                    height += 95
                    
                    // 设置瀑布流模板的显示属性
                    tempData['column'] = shorterColumn
                    tempData['y'] = parseInt(heightArr[shorterColumn])
                    tempData['x'] = shorterColumn * setting.columnWidth
                    tempData['thumbnail'] = thumbnail

                    // 将数据插入
                    dataArr.push(tempData)

                    // 给最短的一列加上一格
                    heightArr[shorterColumn] += parseInt(height)
                } // end function callback

                $.imgReady(thumbnail, callback)

            } (i, thumbnail)
        }   // end for

        var wait = setInterval(function() {

            if (data.length > 0 
                && typeof dataArr !== 'undefined' 
                && dataArr.length > 0) {

                clearInterval(wait)

                showTemplates(dataArr)
            }

        }, 300)
    }

    var showTemplates = function(data) {

        var template = $('.template')[0]
        var templateArr = []

        for (var i = 0; i < data.length; i++) {

            var t = $(template).clone(true)
            var m = data[i]

            t.css('left', m.x + 'px')
            t.css('top', m.y + 'px')
            t.attr('data-column', m.column)
            t.attr('data-y', m.y + 'px')

            t.find('.image')
                .attr('data-id', m.id)
                .attr('src', m.thumbnail)

            t.find('.description').text(m.name)
            t.find('.entry').attr('href', '/#!/detail?id=' + m.id)

            $('#waterfall').append(t)
        }

        // 使瀑布流的所有模板同时显示
        $('#waterfall').find('.template').show()
    }

    var init = function() {

        // 初始化瀑布流区域 #waterfall
        // 列数 = 页面宽度 / 列宽
        setting.column = parseInt(document.body.clientWidth / setting.columnWidth)

        // 容器宽度 = 列数 * 列宽
        $('#waterfall').css('width', setting.column * setting.columnWidth + 'px')

        // 获取template
        getTemplate(1, 10, function(d) {

            layoutTemplates(d.data)
        })
    }

    // 测试接口
    ! function() {

        init()

    } ()
})
