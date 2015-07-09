
'use strict'

/**
 * @name  route.js
 * @author sunken
 * @description node路由入口
 * @date 2015.7.7
 */
var user = require('./user'),
    session = require('./session')

// 登录是创建currentUser
// 注册是创建user
module.exports = function(app) {

	app.get('/', function(req, res) {

        res.redirect('/index.html')

	})	// end index

    // app.get('/user/:id', user.getUser)

    // 测试接口
    // app.get('/session', session.getCurrentUser)
    app.post('/session', session.doLogin)
    // app.delete('/session', session.logout)


}	// end module.exports
