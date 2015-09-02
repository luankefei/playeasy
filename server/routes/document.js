
'use strict'

/**
 * @name  document.js
 * @author sunken
 * @description document模块的入口
 * @date 2015.8.6
 */
var Document = require('../models/document')

// 创建文档
exports.createDocument = function(req, res) {

    var param = req.body

    Document.createDocument(param, function(err, data) {

        res.send(data)
    })
}

// 根据userId获取documents列表
exports.getDocuments = function(req, res) {

    var user = req.session.user

    if (user) {

        Document.getDocumentsByUserId(user.id, function(err, documents) {

            res.send(documents)
        })
    }
}

// 根据Id获取document
exports.getDocumentById = function(req, res) {

    // Document.getDocumentById(function(err, documents) {



    // })

}

