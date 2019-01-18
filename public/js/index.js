
const socket = io();
let newMessage = document.querySelector('h1');
let count = 0;

socket.on('connect', function() {
  console.log('connected to server');
});

socket.on('newUserMessage', function(message) {
  const headerWelcome = document.querySelector('.app-alert');
  const welcomeText = message.text;
  setTimeout(() => { headerWelcome.innerText = welcomeText }, 1500);
  console.log(message);
});

socket.on('connection', function(message) {
  const headerAlert = document.querySelector('.app-text');
  const welcomeText = message.text;
  console.log(message);
  setTimeout(() => { headerAlert.innerText = welcomeText }, 1000);
  setTimeout(() => { headerAlert.innerText = 'Chat Room' }, 3500);
});

socket.on('disconnect', function() {
  console.log('disconnected from the server');
});
