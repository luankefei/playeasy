
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

        ! function(base) {

            base.id = id
            base.renderTo = renderTo
            base.styleUrl = styleUrl

            var node = null

            // case 1: 检查必要属性，如果缺少则退出
            if (!base.id) {

                return new Error('创建失败，缺少必要属性')
            }

            // 如果有styleUrl，加载
            if (base.styleUrl) {

                $.loadCss(base.styleUrl)
            }

            // 如果renderTo没有指定，就创建dom对象
            if (base.renderTo === null) {

                // TODO: container应该抽离成属性
                var container = $('#fs-view')

                node = $.create('div').appendTo(container)
                node.attr('id', base.id)
            
            } else {

                node = $('#' + base.renderTo)
            }

            var data = $('.control.selected').data('data')

            // TODO: renderTo属性指向的是dom对象，所以改为null
            data.chart.renderTo = null
            data = JSON.stringify(data, null, 8)

            node.html('<textarea></textarea>')
            node.find('textarea').html(data)

            // 将dom对象记录到target属性
            base.target = node[0]

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
 */