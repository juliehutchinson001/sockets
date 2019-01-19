const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const app = require('./app');

const publicPath = path.join(__dirname, './public');
app.use(express.static(publicPath));
console.log(publicPath);

const server = http.createServer(app)
const io = socketIO(server);
const port = process.env.PORT || 3000;

// server talking to client
io.on('connection', socket => {
  console.log('client connected!');

  // server emitting a message to an specific client
  io.emit('newUserMessage', {
    from: 'Admin',
    text: 'Welcome to the chat app!',
    createdAt: new Date(),
  });

  // server transmitting a message to all clients except the one who caused this action
  socket.broadcast.emit('newEmailToEveryoneBut', {
    from: 'Admin',
    text: 'New user has signed in',
    createdAt: new Date(),
  });

  // server losing connection of the client
  socket.on('disconnect', () => console.log('client disconnected'));
});

server.listen(port, () => console.log(`Server listening on port ${port}`));
