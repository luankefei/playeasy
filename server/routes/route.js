
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

    app.get('/user/:id', user.getUser)

    // 测试接口
    app.get('/session', session.getCurrentUser)
    app.post('/session', session.doLogin)
    app.delete('/session', session.logout)

    /*
    app.get(/admin\/[^login]/, function(req, res, next) {

        // 先判断用户是否存在
       
        if (!req.session.user) {

            res.redirect('/')

        } else {

            next()
        }
       
    })

    app.post('/currentUser', user.doLogin)
    app.get('/logout', user.logout)

    app.get('/content', content.getContent)
    app.post('/content', content.addContent)

    app.get('/content/:id', content.getContentById)
    app.delete('/content', content.deleteContentById)


    app.post('/comment', comment.addComment)
    app.get('/comment/:id', comment.getCommentById)
    */

}	// end module.exports
