
'use strict'

/**
 * @name  template.js
 * @author sunken
 * @description template模块的model层
 * @date 2015.7.9
 */

var pool = require('../models/db.js')

// 获取模板，预留分页功能
exports.getTemplate = function(callback, start, end) {

    var sql = null

    if (start !== undefined) {

        sql = 'select * from pe_template limit ' + start + ', ' + end

    } else {

        sql = 'select * from pe_template'
    }

    pool.acquire(function(err, client) {
            
        if (err) {
            
            return callback(err)
            
        } else {
            
            client.query(sql, [], function(err, rows, fields) {
                // return object back to pool
                pool.release(client)

                callback(err, rows)
            })
        }
    })
}

