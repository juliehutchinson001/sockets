const socketIO = require('socket.io');
const server = require('./app');
const { generateMessage } = require('./utils/generate_message');
const {
  generateLocationMessage,
} = require('./utils/generate_location_message');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');

const io = socketIO(server);
const port = process.env.PORT || 3000;
const users = new Users();

// server talking to client
io.on('connection', socket => {
  console.log('client connected!');

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required.');
    }

    socket.join(params.room);
    users.addUser(socket.id, params.name, params.room);

    setTimeout(
      () => io.emit('updateUserList', users.getUserList(params.room)),

      1000
    );

    socket.broadcast
      .to(params.room)
      .emit(
        'newMessage',
        generateMessage('Admin', `${params.name} has joined.`)
      );

    callback(users.getUser(socket.id));
  });

  // server emitting a message to a specific client
  io.emit(
    'newUserMessage',
    generateMessage('Admin', 'Welcome to the chat app!')
  );

  // server transmitting a message to all clients except the one who caused this action
  socket.broadcast.emit(
    'newEmailToEveryoneBut',
    generateMessage('Admin', 'New user has signed in')
  );

  socket.on('createMessage', (message, callback) => {
    const user = users.getUser(socket.id);
    console.log('createMessage ', message);
    io.emit('newMessage', generateMessage(message.sender, message.text));

    if (user && isRealString(message.text)) {
      io.to(user.room).emit(
        'newMessage',
        generateMessage(user.name, message.text)
      );
    }

    // this is the cb that assures the client that the server got the message
    callback(message.name, 'Server got the message sent');
  });

  socket.on('createLocationMessage', (coords, callback) => {
    const user = users.getUser(socket.id);

    if (user) {
      io.to(user.room).emit(
        'newLocationMessage',
        generateLocationMessage(user.name, coords.latitude, coords.longitude)
      );
    }
    socket.emit(
      'newLocationMessage',
      generateLocationMessage('Admin', coords.latitude, coords.longitude)
    );
    callback('Server got the location request sent');
  });

  // server losing connection of the client
  socket.on('disconnect', () => {
    const user = users.removeUser(socket.id);
    console.log('client disconnected');
    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit(
        'newMessage',
        generateMessage('Admin', `${user.name} has left.`)
      );
    }
  });
});

server.listen(process.env.PORT, () =>
  console.log(`Server listening on port ${port}`)
);
