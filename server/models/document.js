
'use strict'

/**
 * @name  document.js
 * @author sunken
 * @description document模块的model层
 * @date 2015.8.6
 */

var pool = require('../models/db.js')

// 根据Id获取document

// 写入document


exports.getDocumentsByUserId = function(userId, callback) {

    var testData = {

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

    callback.call(null, null, testData)
}

exports.createDocument = function(param, callback) {

    var testData = {

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

    callback.call(null, null, testData)
}





// // 获取模板，预留分页功能
// exports.getTemplate = function(callback, start, end) {

//     var sql = null

//     if (start !== undefined) {

//         sql = 'select * from pe_template limit ' + start + ', ' + end

//     } else {

//         sql = 'select * from pe_template'
//     }

//     pool.acquire(function(err, client) {
            
//         if (err) {
            
//             return callback(err)
            
//         } else {
            
//             client.query(sql, [], function(err, rows, fields) {
//                 // return object back to pool
//                 pool.release(client)

//                 callback(err, rows)
//             })
//         }
//     })
// }

