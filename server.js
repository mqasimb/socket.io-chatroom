var express = require('express');
var socket_io = require('socket.io');
var http = require('http');

var app = express();
var server = http.Server(app);
var io = socket_io(server);

app.use(express.static('public'));

io.on('connection', function(socket) {
   console.log('Connection Started');
   socket.broadcast.emit('connection', "New User Connected");
   
   socket.on('message', function(message) {
     console.log("Message received"); 
     socket.broadcast.emit('message', message);
   });
   
   socket.on('disconnect', function() {
      console.log('User disconnected');
      socket.broadcast.emit('disconnect', "A User Has Disconnected");
   });
});

server.listen(process.env.PORT || 8080);