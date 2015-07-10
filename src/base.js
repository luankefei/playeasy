
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

    // 从session中获取当前用户
    // 如果session中不存在用户，并且当前用户不在首页，跳回首页
    pe.getCurrentUser = function() {

        $.get('/session', function(d) {

            if (d.code == 0) {

                window.currentUser = d.data

            } else if (window.location.hash !== '') {

                window.location.href = '/'
            }

            // 初始化用户菜单
            initUserMenu()
        })
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

