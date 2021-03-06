

'use strict'

/**
 * @name  chartbar.js
 * @description  图表工具条
 * @author  sunken
 * @date 2015.7.16
 */

// TODO: 这个文件文件需要整体重构
define(function(require, exports) {

    var Controlbar = require('./controlbar'),
        styleEditor = require('../component/style-editor')

    var chartBar = null

    // 按照当前选中的chart对象，初始化属性
    // 传入的参数bar是工具条对象
    var initOptions = function(bar, chart) {

        // 初始化下拉列表
        bar.chartTypeSupports = SETTING.chart.supportsType

        // 初始化series
        bar.seriesCount = chart.data.series.length
    }

    // 刷新DOM
    var refreshRender = function() {

        // TODO: 初始化图表类型列表
        var html = ''

        for (var i = 0; i < this.chartTypeSupports.length; i++) {

            html = html
                + '<li>'
                + this.chartTypeSupports[i]
                + '</li>'
        }

        // TODO: 调用刷新时，工具条还没初始化好，无法获取下拉列表            
        var waitCount = 10

        // 尝试10次，每次200毫秒
        var wait = setInterval(function() {

            var chartTypeList = $('#select-chart-type ul')

            if (chartTypeList.length > 0) {

                chartTypeList.html(html)

                clearInterval(wait)
            }

            if (waitCount === 0) {

                console.log('init chartbar timeout.')

                clearInterval(wait)

            } else {

                --waitCount
            }

        }, 200)

        var base = this

        // TODO: 测试的timeout
        setTimeout(function() {

        // 初始化series输入框
        // TODO: 这里的代码和add-series点击事件重复
        // 如果seriesCount大于当前数量，增加
        // 如果seriesCount小于当前数量，删除
        // TODO: 第一次执行，工具条页面代码还没有加载完成，会进入add条件
        var currentSeries = $('#chart-bar .pair input[data-name="series"]'),
            currentSeriesLength = currentSeries.length

        if (base.seriesCount > currentSeriesLength) {

            for (var i = currentSeriesLength; i < base.seriesCount; i++) {

                var container = $('#chart-bar .pair')
                var dl = $.create('dl').addClass('clearfix')

                dl.html('<dt></dt><dd></dd>')
                dl.find('dd').html('<input class="textbox" type="text" data-name="series" data-sarial="' + i + '" />')

                container[0].insertBefore(dl[0], $('#add-series').parent()[0])
            }

        // TODO: 测试通过
        } else if (base.seriesCount < currentSeriesLength) {

            for (var i = currentSeriesLength; i >= base.seriesCount; i--) {

                currentSeries.eq(i).parent().parent().remove()
            }
        }

        }, 500)
    }

    // 工具条在初次添加控件的时候初始化，通过单例创建
    function ChartBar(render) {
    
        // 当前选中控件对象
        this.target = null

        // 生成工具条的容器
        this.render = null

        // 当前选中的面板
        this.currentPanelIndex = 0

        // 支持的图表类型
        this.chartTypeSupports = []

        //
        this.seriesCount = 1

        // 数据
        this.data = []

        // 拖放事件的处理函数
        var dropHandler = function(e) {

            console.log('in')

            var data = getDataByColumn.call(this, e.dataTransfer.getData('name'))

            // TODO: 频繁操作，应该提取为公共对象
            // TODO: 很多属性都应该用shadow dom代替，现阶段为了直观用attr处理
            // TODO: 暂时，只有series需要index属性
            // 
            var chart = $('.control.selected').data('chart'),
                name = $(this).attr('data-name'),
                index = $(this).attr('data-sarial')
                
            index = !!index ? parseInt(index) : 0

            var hash = {

                xAxis: function(data) {
                    
                    chart.data.xAxis.categories = data
                },

                series: function(data) {

                    chart.data.series[index].data = data
                },

                'colors': ''
            }

            // TODO: 应该用一个函数处理数据的关系，如sereis1 映射到 series[0].data
            hash[name].call(null, data)

            chart.redraw()
        }

        // 按照列名和表名从数据源获取数据
        var getDataByColumn = function(name) {

            this.value = name

            // 按照列名获取数据
            var tableName = $('#select-data').find('.select-value').html()
            var columnName = this.value

            var data = $('#left-bar section.data').find('dt[data-name="' + tableName + '"]')
                .data('data')

            // 将json按字段名提取，生成数组
            var dataArr = []

            data.forEach(function(v) {

                var temp = parseFloat(v[columnName])

                dataArr.push(!!temp ? temp : v[columnName])
            })

            return dataArr
        }

        // 绑定事件
        var bindEvents = function(render) {

            // chart-title keyup事件的延迟状态
            var chartTitleWait = false

            // 改变图表标题
            $('#chart-title').on('keyup', function() {

                var chart = $('.control.selected').data('chart')

                chart.data.title.text = this.value

                // 这里需要做延迟处理
                if (!chartTitleWait) {

                    chartTitleWait = setTimeout(function() {
                        
                        chart.redraw()

                        chartTitleWait = false

                    }, 500)
                }
            })

            // 添加series，点击后生成dom，并修改当前选中图表的config，初始化时重置
            $('#add-series').on('click', function(e) {

                var container = $(this).parent().parent()

                var index = container.find('input[data-name="series"]').length
                var dl = $.create('dl').addClass('clearfix')

                dl.html('<dt></dt><dd></dd>')
                dl.find('dd').html('<input class="textbox" type="text" data-name="series" data-sarial="' + index + '" />')

                container[0].insertBefore(dl[0], $(this).parent()[0])

                // 为新添加的输入框绑定拖放事件
                var input = dl.find('input')

                input.on('dragover', function(e) {

                    e.preventDefault()
                })

                input.on('drop', dropHandler)

                // 增加当前选中图表的series
                $('.control.selected').data('chart').addSeries()

                e.preventDefault()
                e.stopPropagation()
            })

            // 尝试整合数据面板的拖拽
            $('#chart-bar .pair input').on('drop', dropHandler)

            // 组织dragover的默认行为
            $('#chart-bar .pair input').on('dragover', function(e) {

                e.preventDefault()
            })

            // 选择数据表
            // TODO: 需要重构
            $('#select-data').on('click', function(e) {
                
                // 通过e.target进行区分，点击的是列表项还是列表本身    
                if (e.target === this) {

                    // 每次点击选择数据表，重置下拉列表中的选项
                    // 每次选中图表，都要重置下拉列表当前选中项
                    var nodes = $('#left-bar').find('section.data')
                        .find('dt')

                    var tables = []

                    // 向数组中添加所有的表名
                    for (var i = 0; i < nodes.length; i++) {

                        tables.push(nodes[i].innerHTML)
                    }

                    // 向下拉列表中追加内容
                    var ul = $('#select-data').find('ul')
                    var html = ''

                    tables.forEach(function(v, i, a) {

                        html += '<li>' + v + '</li>'
                    })

                    ul.html(html)
                } // end if
            })
            
            // 切换图表工具条面板
            $(render).find('.tabbar li').on('click', function() {

                // 移除过期的状态，设置新状态
                $(this).parent().find('.selected').removeClass('selected')
                $(this).addClass('selected')

                var index = $(this).index()

                $(render).find('.settings')
                    .hide()
                    .eq(index)
                    .show()
            })

            // 切换图表类型，委托
            $('#select-chart-type').on('click', function(e) {

                if (e.target.nodeName === 'LI') {

                    var target = $('.control.selected')

                    // 获取当前选中的图表对象
                    var chart = target.data('chart'),
                        data = target.data('data')

                    // 重置类型，并重绘图表
                    var type = e.target.innerHTML
                    
                    data.chart.type = type

                    chart.redraw()
                }                
            })

            // 编辑图表样式
            $('#chart-style').on('click', function() {

                var renderId = 'style-editor',
                    render = $('#' + renderId)

                if (render.length === 0 || render.css('display') === 'none') {

                    render.show()

                    // 初始化编辑控件
                    styleEditor.init(renderId, null, '/public/css/style-editor.css')

                } else {

                    render.hide()
                }
            })
        }   

        // 构造函数，负责初始化整个工具条对象
        ! function(base) {

            base.target = $('.control.selected')[0]
            base.render = render

            // 初始化：加载右侧工具条
            $(base.render).load('/view/detail-chartbar.html', function() {

                // 最后激活事件，在构造函数内执行，保证事件只绑定一次
                bindEvents.call(base, base.render)
            })
            
        } (this)

        // 根据选中对象，进行初始化
        this.init = function() {

            // 根据当前选中控件的属性，重置工具条属性
            var chart = $(this.target).data('chart')

            // 根据选中的图表，初始化选项，下拉框
            initOptions(this, chart)
           
            // 调用刷新函数，变更DOM
            refreshRender.call(this)
            
            // 显示工具条
            this.render.style.display = 'block'
        }
    }

    ChartBar.prototype = new Controlbar()

    exports.init = function(target) {

        if (chartBar === null) {

            var render = $('#chart-bar')

            // 传递的是dom对象
            chartBar = new ChartBar(render[0])
        }

        return chartBar
    }
})

/**
 * 2015.7.18
 * 修改init函数，将事件绑定移动到chartbar的构造函数内执行
 * 2015.7.20
 * 修改了对外暴露的init函数，现在只负责返回chartbar对象 
 * 修改了initOptions，添加了测试代码
 * 修改了refreshRender，用setInterval做等待，考虑到代码量和不优雅的实现，后面会重构
 * 修改了initEvents，增加编辑样式按钮的点击事件
 * 2015.7.21
 * 修改了chart-style的点击事件，窗口打开状态下点击该按钮，会执行关闭动作
 * 增加select-chart-type点击事件，用户切换图表类型，并将类型记录到当前选中图表的data
 * 2015.7.22
 * 重构了initOptions，类型从全局配置SETTING中获取
 * 重构了ChartBar，删除了未被使用的属性
 * 修改了bindEvents，增加面板切换事件
 * 增加了select-data点击事件，用于选择数据表
 * 2015.7.27
 * 更新#select-data的点击事件，增加了e.target判断，修复了之前列表项点击事件失效的bug
 * 2015.7.28
 * 将右侧数据面板的拖拽绑定数据改为通用事件
 * 修改了drop事件，分离出独立的函数dropHandler
 */