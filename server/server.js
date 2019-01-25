const socketIO = require('socket.io');
const server = require('./app');
const { generateMessage } = require('./utils/generate_message');

const io = socketIO(server);
const port = process.env.PORT || 3000;

// server talking to client
io.on('connection', socket => {
  console.log('client connected!');

  // server emitting a message to a specific client
  io.emit('newUserMessage', generateMessage('Admin', 'Welcome to the chat app!'));

  // server transmitting a message to all clients except the one who caused this action
  socket.broadcast.emit(
    'newEmailToEveryoneBut',
    generateMessage('Admin', 'New user has signed in')
  );

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage ', message);
    io.emit('newMessage', generateMessage(message.sender, message.text));

    // this is the cb that assures the client that the server got the message
    callback(message.sender, 'Server got the message sent');
  });

  socket.on('createLocationMessage', (message, callback) => {
    console.log('createLocationMessage: ', message);
    callback(message.sender, 'Server got the location request sent');
  });

  // server losing connection of the client
  socket.on('disconnect', () => console.log('client disconnected'));
});

server.listen(port, () => console.log(`Server listening on port ${port}`));
