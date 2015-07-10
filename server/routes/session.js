
'use strict'

/**
 * @name  session.js
 * @author sunken
 * @description user模块的入口
 * @date 2015.7.8
 */
var User = require('../models/user')

exports.login = function(req, res) {

    User.getUserByUserName(req.body.username, function(err, users) {

        // default: failure
        var code = -1,
            message = '用户名或密码错误'

        // 有数据返回，进行密码比对
        if (users.length !== 0 && users[0].password === req.body.password) {

            code = 0 
            message = '登录成功'
        }

        // 确认用户名和密码都匹配后，存入session
        req.session.user = users[0]
        res.send({
            code: code,
            message: message
        })
    })
}

// 如果session中不存在用户，code为-1
exports.getCurrentUser = function(req, res) {

    var code = -1

    if (req.session.user !== undefined) {

        code = 0
    }

    res.send({

        code: code,
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

// 不经过数据库，直接清除session
exports.logout = function(req, res) {

    console.log('node logout')

    delete req.session.user

    res.send({
        code: 0,
        message: '删除成功'
    })
}

/**
 * 2015.7.10
 * 修改doLogin，不再使用假数据
 */