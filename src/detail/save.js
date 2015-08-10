
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

    // 整合数据
    function mixData() {

        var data = JSON.parse(JSON.stringify(defaults))
        var canvas = $('#canvas')

        var title = canvas.data('title'),
            id = canvas.data('id'),
            templateId = canvas.data('templateId')

        data.title = !!title ? title : data.title
        data.id = !!id ? id : data.id
        data.templateId = !!templateId ? templateId : data.templateId

        return data
    }

    // 将数据保存到数据库
    function save() {}

    // canvas指页面中唯一的同名id画布
    function canvasToJson() {

        var data = mixData()

        console.log('canvas to json')
        console.log(data)

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

    // 初始化整个save模块
    exports.init = function() {

    }

    // 根据documentId更新文档数据
    exports.update = function(documentId) {

        console.log('update')
    }

    // 根据type生成文件
    exports.create = function(params) {

        // step 1: 弹出提示窗口
        // step 2: 点击保存按钮，触发canvasToJson
        // step 3: 写入到数据库，锁死整个页面，显示写入进度
        // step 4: 根据请求返回的documentId，重置canvas的documentId
        var data = canvasToJson()

        console.log('create')

        
        // console.log('根据type生成文件')
    }
})

// {
//     id: 0,
//     authorId: 0,
//     templateId: 0,
//     type: 0,
//     title: '',
//     description: '',
//     content: '',
//     createDate: '',
//     lastModify: ''
// }

/**
 * 2015.8.10
 * 
 */