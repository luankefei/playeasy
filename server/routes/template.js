
'use strict'

/**
 * @name  template.js
 * @author sunken
 * @description template模块的入口
 * @date 2015.7.9
 */
var Template = require('../models/template.js')

exports.getTemplates = function(req, res) {

    // 从数据库中获取模板
    Template.getTemplates(function(err, templates) {

        res.send({

            code: 0,
            message: '执行成功',
            data: templates
        })
    })
}