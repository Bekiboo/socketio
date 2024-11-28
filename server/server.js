const { createServer } = require('http')
const { Server } = require('socket.io')

const httpServer = createServer()
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173',
  },
})

let currentUsers = []

io.on('connection', (socket) => {
  console.log('User Connected:', socket.id)
  currentUsers.push(socket.id)

  // handle current users
  socket.emit('userId', { id: socket.id })
  socket.emit('usersConnected', currentUsers)

  socket.broadcast.emit('usersConnected', currentUsers)

  socket.on('disconnect', () => {
    console.log('User Disconnected:', socket.id)
    currentUsers = currentUsers.filter((user) => user !== socket.id)

    socket.broadcast.emit('userDisconnected', { id: socket.id })
  })

  socket.on('mouseMove', (data) => {
    socket.broadcast.emit('mouseMove', { ...data, id: socket.id })
  })
})

httpServer.listen(3000, () => {
  // console.log('Server Connected')
})
