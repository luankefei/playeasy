
'use strict'

/**
 * @name  detail-save.js
 * @description  负责保存的js
 * @author  sunken
 * @date 2015.8.6
 */
define(function(require, exports) {

    var buildMap = {

        'html': ''
    }

    var defaults = {

        id: 0,
        authorId: 0,
        templateId: 0,
        type: 0,
        title: '',
        description: '',
        content: '',
        createDate: '',
        lastModify: ''
    }


    /*
    {
        id: 0,
        authorId: 0,
        templateId: 0,
        type: 0,
        title: '',
        description: '',
        content: '',
        createDate: '',
        lastModify: ''
    }
    */

    // 将数据保存到数据库
    function save() {}

    // canvas指页面中唯一的同名id画布
    function canvasToJson() {

        var data = JSON.parse(JSON.stringify(defaults))

        var canvas = $('#canvas')
        var controls = canvas.find('.control')
            
        for (var i = 0; i < controls.length; i++) {

            // 处理所有标签属性attr
            // 处理所有css样式
            // 处理data中保存的数据

            console.log(controls.eq(i).data('data'))
        }

        return data
    }

    // 根据type生成文件
    exports.build = function(type) {

        // step 1: 弹出提示窗口
        // step 2: 点击保存按钮，触发canvasToJson
        // step 3: 写入到数据库

        var data = canvasToJson()

        
        console.log('根据type生成文件')
    }
})