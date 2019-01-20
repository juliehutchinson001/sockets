const request = require('request');
const socket = io(); // eslint-disable-line no-undef
const input = document.querySelector('input');

socket.on('connect', () => {
  console.log('connected to server');
});

socket.on('newUserMessage', message => {
  const headerWelcome = document.querySelector('.app-alert');
  const welcomeText = message.text;
  setTimeout(() => {
    headerWelcome.innerText = welcomeText;
  }, 1500);
  console.log(message);
});

socket.on('newEmailToEveryoneBut', message => {
  const headerAlert = document.querySelector('.app-text');
  const welcomeText = message.text;
  console.log(message);
  setTimeout(() => {
    headerAlert.innerText = welcomeText;
  }, 1000);
  setTimeout(() => {
    headerAlert.innerText = 'Chat Room';
  }, 3500);
});

// the client sends a callback to ask the server confirmation about receiving a new message
socket.emit('createMessage', { sender: 'Julie', text: 'Hello from Julie' }, (sender, data) => {
  console.log(`${data} by ${sender}`);
});

const sendToServer = newMessage => {
  socket.emit(
    'newMessage',
    { sender: 'User', text: newMessage, createdAt: new Date() },
    (sender, data) => {
      console.log(`${data} by ${sender}`);
    }
  );

  console.log(newMessage);
};

input.addEventListener('input', event => {
  const inputValue = event.target.value;
  sendToServer(inputValue);
});

socket.on('newMessage', message => {
  console.log('new Message: ', message);
});

socket.on('disconnect', () => {
  console.log('disconnected from the server');
});
