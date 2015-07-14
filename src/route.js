
'use strict'

/**
 * @name  route.js
 * @description  前端路由
 * @author  sunken
 * @date 2015.7.8
 */
$.route()
    // .when(['', '/', '/index'], {
    .when('', {

        template: '/view/index.html',
        js: '/src/index.js',
        css: '/public/css/index.css',
    })
    .when('/list', {

        template: '/view/list.html',
        js: '/src/list.js',
        css: '/public/css/list.css'
    })
    .when('/detail', {

        template: '/view/detail.html',
        js: '/src/detail.js',
        css: [
            '/public/css/detail.css',
            '/public/css/detail-chartbar.css',
            '/public/css/detail-data.css',
            '/public/css/detail-toolbar.css',
            '/public/css/detail-addbar.css',
            '/public/css/detail-blockbar.css'
        ]
    })
    .when('/user', {

        template: '/view/user.html',
        js: '/src/detail.js',
        css: '/public/css/user.css'
    })
    .otherwise('/')
    .enter(function(name) {

        // 调用currentUser
        PE.getCurrentUser()

        // 调用模块的初始化
        seajs.use(name, function(m) {

            m.init && m.init()
        })
    })
    .leave(function(name) {

        // console.log('module leave: ' + name)
    })
    .scan()

/**
 * 2015.7.10
 * 增加了enter和leave方法，但没有实际使用
 * 2015.7.13
 * 修改了首页的路由配置，将其他的情况交给otherwise处理
 */
