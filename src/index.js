
'use strict'

/**
 * @name  index.js
 * @description  首页的入口js
 * @author  sunken
 * @date 2015.7.8
 */
define(function(require, exports) {

    var login = function(username, password, callback) {

        $.ajax({
            url: '/session?t=' + Math.random(),
            type: 'post',
            param: {
                username: username,
                password: password
            },
            success: function(d) {
                
                callback.call(null, d)
            }
        })
    }

    exports.init = function() {

        $('#password').on('keypress', function(e) {

            if (e.keyCode === 13) {

                var username = $('#username').val(),
                    password = $('#password').val()

                login(username, password, function(d) {

                    // 似乎只需要data.code，不需要data
                    if (d.code === 0) {

                        location.hash = '!/list'
                    }
                })
            }   // end if
        })
    }
})


/**
 * 2015.7.13
 * 增加了模块的init函数
 */