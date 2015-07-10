
'use strict'

/**
 * @name  user.js
 * @author sunken
 * @description user模块的model层
 * @date 2015.7.8
 */
var pool = require('../models/db.js')

exports.getUserByUserName = function(username, callback) {

    var sql = 'select * from pe_user where username = "' + username + '"' + ' limit 1'

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
    })  // end pool.acquire
}

