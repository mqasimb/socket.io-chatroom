var express = require('express');
var socket_io = require('socket.io');
var http = require('http');

var app = express();
var server = http.Server(app);
var io = socket_io(server);

app.use(express.static('public'));

var connectedUsers = 0;

io.on('connection', function(socket) {
   console.log('Connection Started');
   console.log(socket.id);
   connectedUsers++;
   socket.broadcast.emit('connection');
   io.emit('counter', connectedUsers);
   
   socket.on('message', function(message) {
     socket.broadcast.emit('message', message);
   });
   
   socket.on('typing', function(typingbool) {
      socket.broadcast.emit('typing', typingbool);
   });
   
   socket.on('disconnect', function() {
      console.log('User disconnected');
      connectedUsers--;
      console.log(socket.id);
      io.emit('disconnect', null);
   });
});

server.listen(process.env.PORT || 8080);