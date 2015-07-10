
'use strict'

/**
 * @name  session.js
 * @author sunken
 * @description user模块的入口
 * @date 2015.7.8
 */

var User = require('../models/user')

exports.doLogin = function(req, res) {

    User.getUserByUserName(req.body.username, function(err, users) {

        // default: failure
        var code = -1,
            message = '用户名或密码错误'

        console.log('------------------------------')
        console.log(users)

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


/**
 * 2015.7.10
 * 修改doLogin，不再使用假数据
 */