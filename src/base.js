
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
    pe.getCurrentUser = function() {

        $.get('/session', function(d) {

            if (d.code == 0)

            window.currentUser = d.data

            // 初始化用户菜单
            initUserMenu()
        })
    }

    return pe

} ())

