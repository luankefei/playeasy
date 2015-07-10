
'use strict'

/**
 * @name  session.js
 * @author sunken
 * @description user模块的入口
 * @date 2015.7.8
 */

var User = require('../models/user')

exports.doLogin = function(req, res) {

    var fakeUser = {},
        code = -1

    // 根据username查找用户
    if (req.body.email === 'sunken@admin.com' && req.body.password === '123456') {

        // code = 0

        // fakeUser = {

        //     id: 1,
        //     nickname: 'sunken',
        //     email: 'sunken@admin.com',
        //     password: '123456',
        //     group: 'admin'
        // }
    }

    req.session.user = fakeUser
    res.send({

        code: code,
        data: fakeUser
    })
}

exports.getCurrentUser = function(req, res) {

    res.send({

        code: 0,
        data: req.session.user
    })
}

exports.getUser = function(req, res) {

    var fakeUser = {
        id: 2,
        nickname: 'dagou',
        email: 'dagou@admin.com',
        password: '654321',
        group: 'user'
    }

    if (req.params.id == 1) {

        fakeUser = {
            id: 1,
            nickname: 'sunken',
            email: 'sunken@admin.com',
            password: '123456',
            group: 'admin'
        }
    }

    res.send({

        code: 0,
        data: fakeUser
    })
}

exports.logout = function(req, res) {



}
