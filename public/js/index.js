
const socket = io();
let newMessage = document.querySelector('h1');
let count = 0;

socket.on('connect', function() {
  console.log('connected to server');
});

const sendToServer = () => {
  const msg = document.querySelector('input').value;
  socket.emit('createEmail', { msg });
};
/*
socket.on('newMessage', function(message) {
  // setInterval(() => document.title = `New message!`, 2000)
  // setInterval(() => document.title = `Sockets chat app`, 4000)
  console.log(message);
});
*/
socket.on('disconnect', function() {
  console.log('disconnected from the server');
});

// document.querySelector('button').addEventListener('click', () => console.log('first'));
// document.querySelector('button').onclick = () => console.log('fourth');