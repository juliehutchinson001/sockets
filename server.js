const app = require('./app');
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, './public');
app.use(express.static(publicPath));
console.log(publicPath);

const server = http.createServer(app)
const io = socketIO(server);
const port = process.env.PORT || 3000;

//server talking to client
io.on('connection', socket => {
  console.log('client connected!');

  // setInterval(() => socket.emit('newMessage', 'Message from server'), 3000);

  //server losing connection of the client
  socket.on('disconnect', () => console.log('client disconnected'));

  socket.on('newblah', newMessage => {
    console.log(newMessage);
    io.emit('newMessage', {
      from: newMessage.from,
      text: newMessage.text,
      createdAt: new Date(),
    });
  });
});

socket.on('createEmail', newMessage => {
  console.log(newMessage);
});

server.listen(port, () => console.log(`Server listening on port ${port}`));
