
'use strict'

/**
 * @name  template.js
 * @author sunken
 * @description file模块的入口
 * @date 2015.7.15
 */
var File = require('../models/file.js')

exports.upload = function(req, res) {

    res.send({

        code: 0,
        message: '上传成功',
        data: []
    })




    // 从数据库中获取模板
    // Template.getTemplate(function(err, templates) {

    //     res.send({

    //         code: 0,
    //         message: '执行成功',
    //         data: templates
    //     })
    // })
}