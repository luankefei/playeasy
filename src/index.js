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


function login(username, password) {
    
    $.ajax({
        url: '/session',
        type: 'post',
        data: {
            email: username,
            password: password
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

$('#password').on('keypress', function(e) {

    if (e.keyCode === 13) {

        var username = $('#username').val(),
            password = $('#password').val()

        login(username, password)
    }
})