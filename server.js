const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io').listen(server)
const path = require('path')

let users = []
let connections = []

app.use(express.static(__dirname + '/public'))

server.listen(process.env.PORT || 3000, () => console.log('Server running...'))

io.sockets.on('connection', socket => {
  connections.push(socket)
  console.log('Connected: %s sockets connected', connections.length)

  // Disconnect
  socket.on('disconnect', data => {
    users.splice(users.indexOf(socket.username), 1)
    updateUsernames()
    connections.splice(connections.indexOf(socket), 1)
    console.log('Disconnected: %s sockets connected', connections.length)
  })

  // Send messages
  socket.on('send message', data => {
    console.log(data)
    io.sockets.emit('new message', {msg: data, user: socket.username})
  })

  // New user
  socket.on('new user', (data, callback) => {
    callback(true)
    socket.username = data
    users.push(socket.username)
    updateUsernames()
  })

  function updateUsernames () {
    io.sockets.emit('get users', users)
  }
})
