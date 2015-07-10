'use strict'

/**
 * @name  template.js
 * @author sunken
 * @description template模块的model层
 * @date 2015.7.9
 */

exports.getContent = function(start, end, callback) {

    var sql = null

    if (start !== null) {

        sql = 'select * from content limit ' + start + ', ' + end

    } else {

        sql = 'select * from content'

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

