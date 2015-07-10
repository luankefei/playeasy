
'use strict'
/**
 * @name  route.js
 * @description  前端路由
 * @author  sunken
 * @date 2015.7.8
 */

$.route()
    .when(['', '/', '/index'], {

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
            '/public/css/chartbar.css',
        ]
    })
    .otherwise('/')
    .enter(function(name) {

        // 调用currentUser
        PE.getCurrentUser()
    })
    .leave(function(name) {

        // console.log('module leave: ' + name)
    })
    .scan()

/**
 * 2015.7.10
 * 增加了enter和leave方法，但没有实际使用
 */
