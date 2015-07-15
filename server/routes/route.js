
'use strict'

/**
 * @name  route.js
 * @author sunken
 * @description node路由入口
 * @date 2015.7.7
 */
var user = require('./user'),
    session = require('./session'),
    template = require('./template'),
    file = require('./file')

// 登录是创建currentUser
// 注册是创建user
module.exports = function(app) {

	app.get('/', function(req, res) {

        res.redirect('/')
	})

    // 注册
    // app.post('/user', user.register)

    // 用户管理
    // app.get('/user/:id', user.getUser)
    app.get('/session', session.getCurrentUser)
    app.post('/session', session.login)
    app.delete('/session', session.logout)

    app.get('/template', template.getTemplate)

    // 上传
    app.post('/file', file.upload)


    // 404
    app.get('*', function(req, res) {

        res.redirect('/')
    })
}	// end module.exports

/**
 * 2015.7.13
 * 在最后增加了404配置
 * 修改了首页的加载路径，从/index.html改为/
 */
