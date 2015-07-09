$.route()
    .when(['', '/', '/index'], {

        template: '/view/index.html',
        js: '/src/index.js',
        css: '/public/css/index.css',
        // callback: callback
    })
    .when('/list', {

        template: '/view/list.html',
        js: '/src/list.js',
        css: '/public/css/list.css'
    })
    .otherwise('/')
    .scan()