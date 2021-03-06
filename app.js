
/**
 * Module dependencies.
 */

var express    = require('express');
var stylus     = require('stylus');
var RedisStore = require('connect-redis')(express);
var routes     = require('./routes');

var app = module.exports = express.createServer();
var io  = require('socket.io').listen(app);

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({secret:"ASecretKey", store:new RedisStore}));
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(stylus.middleware({
    src      : __dirname + "/public",
    compress : true
  }));
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

io.sockets.on('connection', function(socket) {

    socket.on('set nickname', function(name) {
        socket.set('nickname', name, function() {
            socket.emit('logged in', name);
            console.log(name + ' just joined the conversation');
            io.sockets.emit('joined', name);

            socket.on('disconnect', function() {
                socket.get('nickname', function(err, name) {
                    console.log(name + ' just left the conversation');
                    io.sockets.emit('left', name);
                });
            });
        });
    });

    socket.on('message', function(msg, callback) {
        socket.get('nickname', function(err, name) {
            console.log('Chat message received from ', name);
            io.sockets.emit('message', {
                username : name,
                message  : msg
            });
            callback('received');
        });
    });
});
