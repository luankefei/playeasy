
/**
 * @name  base.js
 * @description  全站通用模块
 * @author  sunken
 * @date  2015.7.10
 */

var PE = (function() {

    var pe = {}

    // 从session中获取当前用户
    pe.getCurrentUser = function() {

        $.get('/session', function(user) {

            console.log(user)
        })
    }

    return pe

} ())
