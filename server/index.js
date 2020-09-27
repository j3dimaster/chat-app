// create socket io instance using express server
const app = require('express')() // import and run express app
const server = require('http').createServer(app)
const io = require('socket.io')(server, {}) // optionnal options 2nd param

const router = require('./router') // import express router
// import user controller
const {
  addUser, getUser, removeUser
} = require('./users.js')

const PORT = process.env.PORT || 5000

// listen for socket io connection
io.on('connection', (socket) => {
  // catch the emited event sent by client
  socket.on('join', ({ name, room }, callback) => {
    // on join event, add a new user in room
    const { error, newUser } = addUser({ id: socket.id, room, name })
    // if error occurs stop function execution
    if (error) return callback(error)

    // send essage to client when user is successfully added
    socket.emit('message', {
      user: 'admin',
      text: `${newUser.name}, welcome to the room`,
    })

    // sending to all clients in new user room except sender
    socket.broadcast
      .to(newUser.room)
      .emit('message', { user: 'admin', text: `${newUser.name} has joined` })

    // subscribe the socket to new user room
    socket.join(newUser.room)
    callback()
  })

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id)

    if (!user) {
      return callback({ error: `No user found with id ${socket.id}` })
    }
    io.to(user.room).emit('message', { user: user.name, text: message })
    console.log('send message')
    callback()
  })

  socket.on('disconnect', () => {
    const user = removeUser(socket.id)

    if (user) {
      io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.` })
    }
  })
})

app.use(router)

server.listen(PORT, () => {
  console.log('server has started on PORT:', PORT)
})
