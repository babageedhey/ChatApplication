const express       = require('express');
const port          = process.env.PORT || 3000;
const app   = express();



//SEtting the template Engine
app.set('view engine', 'ejs')

//Middleware
app.use(express.static('public'))


//ROutes
app.get('/', (req, res) =>{
    res.render('index')
})



//Port Listening
server              = app.listen(port)
const io            = require('socket.io')(server)

//SocketIO Listens on every connection
io.on('connection', (socket) =>{
    console.log('New user connected')

    //default username
    socket.username = "Anonymous"

    //listen to change of username by User
    socket.on('change_username', (data) =>{
        socket.username = data.username
    })

    //Listen for new messages
    socket.on('new_message', (data) =>{
        io.sockets.emit('new_message', {message : data.message, username: socket.username});
    })

    //Listen on typing
    socket.on('typing', (data) =>{
        socket.broadcast.emit('typing', {username: socket.username})
    })
})