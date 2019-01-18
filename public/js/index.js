
const socket = io();
let newMessage = document.querySelector('h1');
let count = 0;

socket.on('connect', function() {
  console.log('connected to server');
});

socket.on('newMessage', function(message) {
  console.log(message);
});

socket.on('disconnect', function() {
  console.log('disconnected from the server');
});
