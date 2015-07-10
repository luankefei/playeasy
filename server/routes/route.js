
'use strict'

/**
 * @name  route.js
 * @author sunken
 * @description node路由入口
 * @date 2015.7.7
 */
var user = require('./user'),
    session = require('./session'),
    template = require('./template')

// 登录是创建currentUser
// 注册是创建user
module.exports = function(app) {

	app.get('/', function(req, res) {

        res.redirect('/index.html')
	})

    // app.get('/user/:id', user.getUser)
    // 测试接口
    app.get('/session', session.getCurrentUser)
    app.post('/session', session.doLogin)
    app.delete('/session', session.logout)

    app.get('/template', template.getTemplate)

}	// end module.exports
