$(document).ready(function() {
    var socket = io();
    var input = $('input');
    var messages = $('#messages');
    var typing = $('.typing');
    var numOfUsers = $('.connected-users');
    
    var addMessage = function(message) {
        messages.append('<div>' + message + '</div>');
        typing.html('');
    };
    
    var userTyping = function(user) {
        typing.html('User is typing...');
    }
    
    var connectMessage = function(user) {
        messages.append('<div>New User Connected</div>');    
    }
    
    var disconnectMessage = function() {
        messages.append('<div>A User has disconnected</div>');
    }
    
    var connectedUsers = function(users) {
        numOfUsers.html('Connected Users: ' +users);
    }

    input.on('keydown', function(event) {
    if (event.keyCode != 13) {
        socket.emit('typing', null);
    }
    if (event.keyCode == 13) {
    
    var message = input.val();
    addMessage(message);
    socket.emit('message', message);
    input.val('');
    }
}); 
    socket.on('typing', userTyping);
    socket.on('counter', connectedUsers)
    socket.on('connection', connectMessage);
    socket.on('message', addMessage);
    socket.on('disconnect', disconnectMessage);
});