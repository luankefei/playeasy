
'use strict'
/**
 * @name  base.js
 * @description  全站通用模块
 * @author  sunken
 * @date  2015.7.10
 */
var PE = (function() {

    var pe = {}

    // 初始化用户列表
    var initUserMenu = function() {

        var user = window.currentUser

        if (user !== undefined) {

            // TODO: 这个id没必要
            var name = $('#user-name')
            var accountList = $('#account')

            name.html(user.username)
            accountList.show()
        }
    }

    // 验证用户是否已经登录
    var validateUser = function() {

        var user = window.currentUser

        // 如果用户没有登录，user应该是undefined
        if (location.hash === '' && user) {

            location.hash = '!/list'
        }
    }

    // 从session中获取当前用户
    // 如果session中不存在用户，并且当前用户不在首页，跳回首页
    pe.getCurrentUser = function() {

        $.get('/session', function(d) {

            if (d.code == 0) {

                window.currentUser = d.data
            }

            validateUser()

            // 初始化用户菜单
            initUserMenu()
        })
    }

    // 显示遮罩层
    pe.toggleShadow = function() {

        var body = document.getElementsByTagName('body')[0]
        var layer = document.getElementById('you_cant_see_me')
        var state = layer.style.display

        if (state === 'none' || state ==='') {
            
            // layer.style.height = document.documentElement.scrollHeight + 'px'
            layer.style.height = screen.availHeight + 'px'
            layer.style.top = body.scrollTop
            layer.style.display = 'block'

            body.setAttribute('class', 'is_overflow_box')

        } else {

            body.setAttribute('class', 'body_normal')
            layer.style.display = 'none'
        }
    }

    return pe

} ())

// 导航事件
$(document).ready(function() {

    $('#account').live('mouseover', function() {

        $('#account-menu-list').show()
    })

    $('#account').live('mouseout', function() {

        $('#account-menu-list').hide()
    })

    // 登出并返回首页
    $('#logout').on('click', function(e) {

        $.ajax({
            url: '/session?t=' + Math.random(),
            type: 'delete',
            success: function(d) {
                
                window.location.href = '/'
            }
        })

        e.preventDefault()
        e.stopPropagation()
    })
})

