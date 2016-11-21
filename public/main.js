$(document).ready(function() {
    var socket = io();
    var input = $('input');
    var messages = $('#messages');
    var typing = $('.typing');
    var numOfUsers = $('.connected-users');
    
    var addMessage = function(message) {
        messages.append('<div>' + message + '</div>');
    };
    
    var userTyping = function(typingbool) {
        if(typingbool) {
            typing.html('User is typing...');
        }
        else {
            typing.html('');
        }
    };
    
    var connectMessage = function(user) {
        messages.append('<div>New User Connected</div>');    
    };
    
    var disconnectMessage = function() {
        messages.append('<div>A User has disconnected</div>');
    };
    
    var connectedUsers = function(users) {
        numOfUsers.html('Connected Users: ' +users);
    };

    input.on('keydown', function(event) {
    if (event.keyCode != 13 && event.keyCode != 8) {
            socket.emit('typing', true);
        }
    if (event.keyCode == 13) {
        var message = input.val();
        addMessage(message);
        socket.emit('typing', false);
        socket.emit('message', message);
        input.val('');
    }
    if (event.keyCode == 8) {
        socket.emit('typing', false);
    }
}); 
    socket.on('typing', userTyping);
    socket.on('counter', connectedUsers);
    socket.on('connection', connectMessage);
    socket.on('message', addMessage);
    socket.on('disconnect', disconnectMessage);
});