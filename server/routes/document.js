
'use strict'

/**
 * @name  document.js
 * @author sunken
 * @description document模块的入口
 * @date 2015.8.6
 */
var Document = require('../models/document')

// 根据userId获取documents列表
exports.getDocuments = function(req, res) {

    var user = req.session.user

    console.log(Document)

    if (user) {

        Document.getDocumentsByUserId(user.id, function(err, documents) {

            console.log('in callback function')
            console.log(documents)

            res.send(documents)
        })
    }




    // console.log(req)

    // if (req.body.user)


    //Document.getDocumentsByUserId(function(err, documents) {})

}

// 根据Id获取document
exports.getDocumentById = function(req, res) {

    // Document.getDocumentById(function(err, documents) {



    // })

}






exports.getTemplate = function(req, res) {

    // 从数据库中获取模板
    Template.getTemplate(function(err, templates) {

        res.send({

            code: 0,
            message: '执行成功',
            data: templates
        })
    })
}