/**
 * Module dependencies.
 */
var express = require('express')
var http = require('http')
var path = require('path')

var compression = require('compression')
var serveStatic = require('serve-static')
var bodyParser = require('body-parser')
var session = require('express-session')
var multer = require('multer')

var routes = require('./routes/route')

var app = express()

// all environments
// remove app.configre from 3.x to 4.x
// middleware
app.set('port', 3000)
// app.use(compression())
app.use(serveStatic(path.join(__dirname, '../')))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
// session
app.use(session({
    secret: 'tueasy'
}))
// multer
app.use(multer())

routes(app)
// development only
// if ('development' == app.get('env')) {
//  app.use(express.errorHandler())
// }

http.createServer(app)
    .listen(app.get('port'), function() {
       console.log('Express server listening on port ' + app.get('port'))
})