
'use strict'

/**
 * @name  styleEditor.js
 * @description  图表样式编辑控件
 * @author  sunken
 * @date 2015.7.20
 */
define(function(require, exports, module) {

    var editor = null

    // 控件类
    function Editor(id, renderTo, styleUrl) {

        this.id = null
        this.renderTo = null
        this.styleUrl = null
        this.target = null

        var initTemplate = function() {

            $.create('textarea').appendTo(editor)
        }

        var loadCss = function(url) {

            // 如果有styleUrl，加载
            if (url) {

                $.loadCss(url)
            }            
        }

        var getData = function() {

            // 需要根据series 0的属性，过滤出允许修改的值
            // var chart = $('.control.selected').data('chart').series[0],
            var data = $('.control.selected').data('data')

            // TODO: renderTo属性指向的是dom对象，所以改为null
            data.chart.renderTo = null
            data = JSON.stringify(data, null, 4)

            return data
        }

        // TODO: 需要重构
        var initTemplate = function(data) {

            var node = null
            var html = '<div class="frame-head">'
                    + '<span>图表样式编辑</span>'
                    + '<a href="javascript:;">X</a>'
                    + '</div>'
                    + '<textarea id="plugin-code-mirror"></textarea>'

            // 如果renderTo没有指定，就创建dom对象
            if (this.renderTo === null) {

                // TODO: container应该抽离成属性
                var container = $('#fs-view')

                node = $.create('div').appendTo(container)
                node.attr('id', this.id)
            
            } else {

                node = $('#' + this.renderTo)
            }

            node.html(html)

            var textarea = node.find('textarea')

            textarea.html(data)

            // 将dom对象记录到target属性
            this.target = node[0]

            return {
                node: node[0],
                textarea: textarea[0]
            }
        }

        // TODO: 配置文件
        function initCodeMirror(textarea) {

            $.loadCss('/public/lib/codemirror.css')
            
            seajs.use('/public/lib/codemirror.js', function() {
                seajs.use('/public/lib/mode/javascript/javascript.js', function() {

                    var editor = CodeMirror.fromTextArea(textarea, {
                        mode: 'application/json',
                        styleActiveLine: true,
                        lineNumbers: true,
                        lineWrapping: true
                    })

                    editor.on('change', function(editor, changes) {

                        var value = editor.getValue(),
                            target = $('.control.selected')

                        try {

                            value = JSON.parse(editor.getValue())

                            value.chart.renderTo = target[0]

                            var chart = target.data('chart')

                            chart.data = value

                            chart.redraw()

                        } catch(e) {

                        }
                    })
                })
            })
        }

        function bindEvent(node) {

            var target = $(node).find('.frame-head')
            var frame = target.parent()

            // 激活拖拽事件
            target.drag(function(e, mouseStart, controlStart) {

                var left = e.pageX - (mouseStart.x - controlStart.x),
                    top = e.pageY - (mouseStart.y - controlStart.y)

                frame
                    .css('margin', 0)
                    .css('left', left + 'px')
                    .css('top', top + 'px')

            }, frame[0])

            // 激活关闭按钮
            target.find('a').on('click', function() {

                frame.hide()
            })
        }

        ! function(base) {

            base.id = id
            base.renderTo = renderTo
            base.styleUrl = styleUrl

            // case 1: 检查必要属性，如果缺少则退出
            if (!base.id) {

                return new Error('创建失败，缺少必要属性')
            }

            // step 1: 加载css
            loadCss(base.styleUrl)
            
            // step 2: 获取数据
            var data = getData()

            // step 3: 初始化dom结构
            var template = initTemplate.call(base, data)

            // step 4: 初始化codeMirror
            initCodeMirror(template.textarea)

            // step 5: 激活窗口事件
            bindEvent(template.node)

        } (this)

        this.init = function() {

            initTemplate()
        }
    }

    // init函数只生成唯一的edtior，这是一个单例控件
    exports.init = function(id, renderTo, styleUrl) {

        if (editor === null) {

            editor = new Editor(id, renderTo, styleUrl)
        }

        return editor
    }
})

/**
 * 2015.7.20
 * 增加了create函数，用于构建组件
 * 构造Editor时，增加了三个参数：id、renderTo、styleUrl
 * 将create函数变更为自运行函数
 * 2015.7.21
 * 重构了构造函数中的流程，拆分成私有函数
 * 添加了事件支持
 * 在initCodeMirror中增加了change事件
 * 2015.7.22
 * 修改了codemirror的change事件，移除全部highcharts api。只对chart对象的方法进行调用
 */