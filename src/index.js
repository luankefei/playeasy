
'use strict'

/**
 * @name  index.js
 * @description  首页的入口js
 * @author  sunken
 * @date 2015.7.8
 */

define(function(require) {

    var login = function(username, password, callback) {

        $.ajax({
            url: '/session?t=' + Math.random(),
            type: 'post',
            param: {
                email: username,
                password: password
            },
            success: function(d) {
                
                callback.call(null, d)
            }
        })
    }

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




})




/*
function testRegister() {

    $.ajax({
        url: '/user',
        type: 'post',
        data: {
            email: 'sunken@admin.com',
            nikename: 'sunken',
            password: '123456',
            group: 'admin'
        },
        success: function(data) {

            console.log('ajax success')
            console.log(data)
        },
        error: function(err) {

            console.log('ajax error')
            console.log(err)
        }
    })
}

function testLogin() {
    
    $.ajax({
        url: '/session',
        type: 'post',
        data: {
            email: 'sunken@admin.com',
            password: '123456'
        },
        success: function(data) {

            console.log('ajax success')
            console.log(data)
        },
        error: function(err) {

            console.log('ajax error')
            console.log(err)
        }
    })
}

testLogin()
*/
