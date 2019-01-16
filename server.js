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

  // socket.on('asdfadsfsadfsadfasdffdasdfasdfasfasd', newEmail => {
  //   console.log(newEmail);
  // });



  setInterval(() => {
    socket.emit('newMessage', 'Message from server');
  }, 3000);













  //server creating custom event
  //the data is being sent from the server to the client
  // socket.emit('newEmail', {
  //   from: 'julie.hutchinson001@outlook.com',
  //   text: 'this is a new email',
  //   createAt: new Date,
  // });

  // socket.emit('createMessage', {
  //   from: 'julie.hutchinson001@outlook.com',
  //   text: 'new message sent!',
  //   createAt: new Date,
  // });



  // socket.emit('newMessage', {
  //   from: 'Julie',
  //   text: 'see you then!',
  //   createAt: new Date,
  // });

  //server losing connection of the client
  socket.on('disconnect', () => {
    console.log('client disconnected');
  });

  // socket.on('createMessage', newMessage => {
  //   console.log(newMessage);
  // });
});


server.listen(port, () => console.log(`Server listening on port ${port}`));
