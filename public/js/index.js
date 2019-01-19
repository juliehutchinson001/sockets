const socket = io();

socket.on('connect', function() {
  console.log('connected to server');
});

socket.on('newUserMessage', function(message) {
  const headerWelcome = document.querySelector('.app-alert');
  const welcomeText = message.text;
  setTimeout(() => { headerWelcome.innerText = welcomeText }, 1500);
  console.log(message);
});

socket.on('newEmailToEveryoneBut', function(message) {
  const headerAlert = document.querySelector('.app-text');
  const welcomeText = message.text;
  console.log(message);
  setTimeout(() => { headerAlert.innerText = welcomeText }, 1000);
  setTimeout(() => { headerAlert.innerText = 'Chat Room' }, 3500);
});

const sendToServer = () => {
  socket.on('createMessageTo', () => {
    const newMessage = event.target.value;
    socket.broadcast.emit('newMessage', {
      from: 'User',
      text: newMessage,
      createdAt: new Date(),
    });

    console.log(newMessage);
  });
};

socket.on('disconnect', function() {
  console.log('disconnected from the server');
});
