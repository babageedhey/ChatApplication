$(function(){
    var socket = io.connect('http://localhost:3000')

    //buttons and inputs
    var message         = $("#message")
    var username        = $("#username")
    var send_message    = $("#send_message")
    var send_username   = $("#send_username")
    var chatroom        = $("#chatroom")
    var feedback        = $("#feedback")

    //Emit Message
    send_message.click(function(){
        socket.emit('new_message', {message: message.val()})
    })

    //Listen for New message
    socket.on("new_message", (data) =>{
        console.log(data);
        feedback.html('');
        message.val('');
        chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>")
    })


    //Emit Username
    send_username.click(function() {
        console.log(username.val())
        socket.emit('change_username', {username: username.val()})
    })

    //Emit Typing
    message.bind("keypress", () =>{
        socket.emit('typing')
    })

    //Listening on Typing
    socket.on('typing', (data) =>{
        feedback.html("<p><i>" + data.username + " is typing a message..." + "</i></p>")
    })
});